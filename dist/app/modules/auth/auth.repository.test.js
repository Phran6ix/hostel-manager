"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = __importDefault(require("./repository"));
const model_1 = __importDefault(require("./model"));
const helper_1 = require("../../utilities/helper");
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
let userRepo;
beforeEach(() => {
    userRepo = new repository_1.default();
});
describe("Authentication unit tests", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    test("it should sign a user up", () => __awaiter(void 0, void 0, void 0, function* () {
        let user = {
            email: "myemail@gmail.com",
            fullname: "test name",
            phone: "+23499999",
            password: "my_password",
            userId: "THIS IS A UUID",
        };
        let hashPassword = "my_password";
        helper_1.HelperFunctions.hashString.mockResolvedValueOnce(hashPassword);
        let otp = "12345";
        helper_1.HelperFunctions.sendOTPToEmail.mockResolvedValue(otp);
        yield userRepo.sign_up(user);
        expect(helper_1.HelperFunctions.sendOTPToEmail).toHaveBeenCalled();
        expect(helper_1.HelperFunctions.sendOTPToEmail).toHaveBeenCalledTimes(1);
        expect(helper_1.HelperFunctions.hashString).toHaveBeenCalledWith("my_password");
        expect(helper_1.HelperFunctions.hashString).toHaveReturnedTimes(1);
        let created_user = yield model_1.default.findOne({ email: user.email });
        // expect(created_user?.email).toEqual(user.email)
        // expect(user.save) .toHaveBeenCalledWith(user)
    }));
});
