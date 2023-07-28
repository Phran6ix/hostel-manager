class Config {
  //
  public static HASH_SALT = 12;
  //  FOR MONGODB
  public static MONGO_URL = process.env.MONGO_URI;
  public static MONGO_HOST = process.env.MONGO_HOST || "mongo";
  public static MONGO_PORT = process.env.MONGO_PORT || 27017;
  //  FOR MYSQL
  public static MYSQL_USER = process.env.MYSQL_USER || "root";
  public static MYSQL_DATABASE = process.env.MYSQL_DATABASE;
  public static MYSQL_HOST = process.env.MYSQL_HOST || "mysql";
  public static MYSQL_PORT = process.env.MYSQL_PORT || "3306";
  public static MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
  //   FOR POSTGRES
  public static POSTGRES_USER = process.env.POSTGRES_USER || "postgres";
  public static POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
  public static POSTGRES_DB = process.env.POSTGRES_DB || "postgres";
  public static POSTGRES_HOST = process.env.POSTGRES_HOST || "postgresdb";
  public static POSTGRES_PORT = process.env.POSTGRES_PORT || 5432;
  //   REDIS
  public static REDIS_HOST = process.env.REDIS_HOST || "redis";
  public static REDIS_PORT = process.env.REDIS_PORT || 6379;
  // APPLICATION
  public static PORT = process.env.PORT || 3002;
  public static NODE_ENV = process.env.NODE_ENV;
  public static JWT_SECRET = process.env.JWT_SECRET || "q5u3u2o4";
  // SMTP
  public static SMTP_USER = process.env.SMTP_USER || "";
  public static SMTP_PASS = process.env.SMTP_PASS || "";
  public static SMTP_HOST = process.env.SMTP_HOST || "";
  public static SMTP_PORT = process.env.SMTP_PORT || 3000;
  // SMS
  public static TWILIO_SSID = process.env.TWILIO_SSID;
  public static TWILIO_TOKEN = process.env.TWILIO_TOKEN;
}

export default Config;
