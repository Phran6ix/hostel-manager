"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Constants {
}
Constants.NODE_ENVIRONMENT = {
    DEVELOPMENT: "development",
    PRODUCTION: "production",
};
Constants.USER_ROLES = {
    STUDENT: "STUDENT",
    AGENT: "AGENT",
};
Constants.AGENT_ROLE = {
    LANDLORD: "Landlord",
    AGENT: "Agent"
};
Constants.MAIL_SUBJECT = {
    SIGN_UP: "One Time Password for Account Verification",
    FORGOT_PASSWORD: "Your reset password token",
    RESEND_OTP: "One Time Password",
};
Constants.HOSTEL_TYPE = {
    SINGLE: "Single room",
    SELF_CON: "Self con",
    ROOM_PALOUR: "Room and Palour",
    TWO_BEDROOM: "Two bedroom flat",
};
Constants.PAGINATION_LIMIT = 10;
exports.default = Constants;
