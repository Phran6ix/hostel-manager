import { IUserRepo, IUserType } from "./types";
import { HelperFunctions } from "../../utilities/helper";

import User from "./model";
import {
  AccountStatusError,
  AuthorizedError,
  InvalidRequestError,
  InvalidTokenError,
  NotFoundError,
  VerificatioError,
} from "../../utilities/error";
import Constants from "../../utilities/constant";

class UserRepository implements IUserRepo<IUserType> {
  public async sendOTP(email: string): Promise<void> {
    try {
      const user = await User.findOne({ email }).lean();
      if (!user) {
        throw NotFoundError("Account with this email not found");
      }

      await HelperFunctions.sendOTPToEmail(email, Constants.MAIL_SUBJECT.RESEND_OTP);
      return;
    } catch (error) {
      throw error;
    }
  }
  public async update_password(props: {
    user: Partial<IUserType>;
    password: string;
    new_password: string;
  }): Promise<void> {
    try {
      const user = await User.findOne({ email: props.user["email"] });

      let verifyPassword = await HelperFunctions.comparePassword(user!.password, props.password);

      if (!verifyPassword) throw AuthorizedError("Your password is incorrect");
      if (!user?.isVerified) throw AccountStatusError("Your account is not verified");
      user!.password = await HelperFunctions.hashString(props.new_password);
      await user!.save();

      return;
    } catch (error) {
      throw error;
    }
  }

  public async sign_up(data: Partial<IUserType>): Promise<void> {
    try {
      const user = new User({
        email: data.email,
        fullname: data.fullname,
        phone: data.phone,
        password: await HelperFunctions.hashString("" + data.password),
      });

      await HelperFunctions.sendOTPToEmail(user.email, Constants.MAIL_SUBJECT.SIGN_UP);

      await user.save();

      return;
    } catch (error) {
      throw error;
    }
  }

  public async login(data: {
    email?: string | undefined;
    phone_number?: string | undefined;
    password: string;
  }): Promise<{
    token: string;
    user: Partial<IUserType>;
  }> {
    try {
      let user;
      if (!!data.email) user = await User.findOne({ email: data.email });

      if (!!data.phone_number) user = await User.findOne({ phone: data.phone_number });

      if (!user) {
        throw NotFoundError("Account not found");
      }

      if (!(await HelperFunctions.comparePassword(user.password, data.password))) {
        throw AuthorizedError("Invalid Password");
      }

      if (!user.isVerified) throw AccountStatusError("Your account is not verified");

      user = user.toObject();
      console.log(user);

      const token = await HelperFunctions.getToken(user);
      return {
        user,
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  public async verifyAccount(props: { email: string; otp: string }): Promise<void> {
    try {
      let user = await User.findOne({
        email: props.email,
      });

      if (!user) throw NotFoundError("Account not found");

      if (user.isVerified) throw AccountStatusError("Your account is already verified");

      const validOtp = await HelperFunctions.verifyOTP(props.email, props.otp);
      if (!validOtp) {
        throw InvalidTokenError("OTP is Invalid or Expired ");
      }

      user!.isVerified = true;
      await user!.save();

      return;
    } catch (error) {
      throw error;
    }
  }

  public async uploadProfilePhoto(props: { user: IUserType; avatar: string }): Promise<void> {
    try {
      const user = await User.findOne({ userId: props.user.userId });
      if (!user) throw NotFoundError("User Not Found");

      user.avatar = props["avatar"];
      await user.save();
      return;
    } catch (error) {
      throw error;
    }
  }

  public async verifyOTP(props: { email: string; otp: string }): Promise<void> {
    try {
      const validOtp = await HelperFunctions.verifyOTP(props.email, props.otp);
      if (validOtp) {
        throw InvalidTokenError("Token has expired or invalid");
      }
      let user = await User.findOneAndUpdate({ email: props["email"] }, { otpVerified: true });

      if (!user) throw NotFoundError("Account not found");
      return;
    } catch (error) {
      throw error;
    }
  }

    public async GetUserProfileSummary (data :{userId: string}): Promise<{user: IUserType}> {
        try {
           const user = await User.findOne({userId: data.userId}).lean().select("fullname phone email avatar")
            if(!user) {
                throw NotFoundError("User not found")
            }

            return {user}

        } catch (error) {
            throw error
        }
    }

  // FOR PHONE NUMBER VERIFICATION
  // public async sendOTPToPhone(props: { phone: string }): Promise<void> {
  //   try {
  //     console.log(props)
  //     const user = await User.findOne({ phone: props["phone"] });
  //     if (!user) throw NotFoundError("User not found");

  //     if (user.isVerified) throw AccountStatusError("Your Account is already verified");

  //     await HelperFunctions.SendOTPToPhone(user.phone);
  //     console.log("DONE");
  //     return;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // public async verifyPhoneOTP(props: { phone: string; otp: string }): Promise<void> {
  //   try {
  //     const user = await User.findOne({ phone: props["phone"] });
  //     if (!user) throw NotFoundError("User not found");

  //     const verified = await HelperFunctions.VerifyPhoneOtp(props["phone"], props["otp"]);
  //     if (!verified) throw VerificatioError("Invalid or Expired token");

  //     user.isVerified = true;
  //     await user.save();

  //     return;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  public async forgot_password(props: {
    email?: string | undefined;
    phone_number?: string | undefined;
  }): Promise<void> {
    try {
      let user;

      if (!!props.email) {
        user = await User.findOne({ email: props.email });
      }
      if (!!props.phone_number) {
        user = await User.findOne({ phone: props.phone_number });
      }

      if (!user) {
        throw NotFoundError("Account with this details not found");
      }

      await HelperFunctions.sendOTPToEmail(user.email, Constants.MAIL_SUBJECT.FORGOT_PASSWORD);
      return;
    } catch (error) {
      throw error;
    }
  }
  public async reset_password(data: { email: string; new_password: string }): Promise<void> {
    try {
      let user = await User.findOne({ email: data["email"] }).select("otpVerified");

      if (!user) throw NotFoundError("Account not found");

      if (!user.otpVerified) {
        throw InvalidRequestError(
          "Your account is not authorized for this action at the moment, please verify with otp"
        );
      }

      let hashed = await HelperFunctions.hashString(data.new_password);
      user.otpVerified = false;
      user.password = hashed;
      await user.save();
      return;
    } catch (error) {
      throw error;
    }
  }
  public async getCurrentUser(data: { user: Partial<IUserType> }): Promise<IUserType> {
    try {
            console.log(data)
      const user = await User.findOne({ email: data.user["email"] });
      if (!user) throw NotFoundError("Account Not found");
      return user.toJSON();
    } catch (error) {
      throw error;
    }
  }

  public async updateUserProfile(props: { user: Partial<IUserType>; data: any }): Promise<void> {
    try {
            console.log(props)
      const user = (await User.findOne({ userId: props.user.userId })) as IUserType;
      if (!user) throw NotFoundError("User not found");
      console.log(user);

      if (!!props.data.email) {
        throw AuthorizedError("Email cannot be updated after registration");
      }
    
            await User.updateOne({userId: props.user.userId}, { ...props.data})
                        
      console.log(user);
      // await user.save();
      return;
    } catch (error) {
      throw error;
    }
  }
}

export default UserRepository;
