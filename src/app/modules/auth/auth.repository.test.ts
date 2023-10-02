import UserRepository from "./repository";
import User from "./model";
import { HelperFunctions } from "../../utilities/helper";

jest.mock("../../utilities/helper", () => ({
  hashString: jest.fn(),
  sendOTPToEmail: jest.fn(),
}));

jest.mock("../auth/repository.ts", () => ({
  save: jest.fn(),
}));
// let userData: Partial<IUserType> = {
//   userId: "1",
//   fullname: "Test Test",
//   email: "test@gmail.com",
//   password: "testpassword",
// };

let userRepo: UserRepository;
beforeEach(() => {
  userRepo = new UserRepository();
});

describe("Authentication unit tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("it should sign a user up", async () => {
    let user = {
      email: "myemail@gmail.com",
      fullname: "test name",
      phone: "+23499999",
      password: "my_password",
      userId: "THIS IS A UUID",
    };

    let hashPassword = "my_password";
    (HelperFunctions.hashString as jest.Mock).mockResolvedValueOnce(
      hashPassword,
    );

    let otp = "12345";
    (HelperFunctions.sendOTPToEmail as jest.Mock).mockResolvedValue(otp);
    await userRepo.sign_up(user);

    expect(HelperFunctions.sendOTPToEmail).toHaveBeenCalled();
    expect(HelperFunctions.sendOTPToEmail).toHaveBeenCalledTimes(1);
    expect(HelperFunctions.hashString).toHaveBeenCalledWith("my_password");
    expect(HelperFunctions.hashString).toHaveReturnedTimes(1);
    let created_user = await User.findOne({ email: user.email });
    // expect(created_user?.email).toEqual(user.email)
    // expect(user.save) .toHaveBeenCalledWith(user)
  });
});
