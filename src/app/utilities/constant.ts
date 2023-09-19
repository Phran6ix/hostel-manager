class Constants {
  public static NODE_ENVIRONMENT = {
    DEVELOPMENT: "development",
    PRODUCTION: "production",
  };

  public static USER_ROLES = {
    STUDENT: "STUDENT",
    AGENT: "AGENT",
  };

  public static AGENT_ROLE = {
    LANDLORD: "LANDLORD"
  } as const
  public static MAIL_SUBJECT = {
    SIGN_UP: "One Time Password for Account Verification",
    FORGOT_PASSWORD: "Your reset password token",
    RESEND_OTP: "One Time Password",
  };

  public static HOSTEL_TYPE = {
    SINGLE: "Single room",
    SELF_CON: "Self con",
    ROOM_PALOUR: "Room and Palour",
    TWO_BEDROOM: "Two bedroom flat",
  } as const;

  public static PAGINATION_LIMIT = 10;
}

export default Constants;
