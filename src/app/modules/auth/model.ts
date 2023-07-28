import { Schema, model } from "mongoose";
import { IUserType } from "./types";
import Constants from "../../utilities/constant";

const userSchema = new Schema<IUserType>(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: [...Object.values(Constants.USER_ROLES)],
      defalut: Constants.USER_ROLES.STUDENT,
    },
    otpVerified: {
      type: Boolean,
      default: false,
      select: false,
    },
  },
  {
    timestamps: true,
    virtuals: true,
    versionKey: false,
    toObject: {
      transform: function (doc, ret) {
        return {
          userId: ret._id,
          email: ret.email,
          fullmame: ret.fullname,
          role: ret.role,
          phone_number: ret.phone,
          isVerified: ret.isVerified,
        };
      },
    },
  }
);

export default model("user", userSchema);
