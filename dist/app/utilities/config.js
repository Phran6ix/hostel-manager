"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
}
//
Config.HASH_SALT = 12;
//  FOR MONGODB
Config.MONGO_URI = process.env.MONGO_URI;
Config.MONGO_HOST = process.env.MONGO_HOST || "mongo";
Config.MONGO_PORT = process.env.MONGO_PORT || 27017;
//  FOR MYSQL
Config.MYSQL_USER = process.env.MYSQL_USER || "root";
Config.MYSQL_DATABASE = process.env.MYSQL_DATABASE;
Config.MYSQL_HOST = process.env.MYSQL_HOST || "mysql";
Config.MYSQL_PORT = process.env.MYSQL_PORT || "3306";
Config.MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
//   FOR POSTGRES
Config.POSTGRES_USER = process.env.POSTGRES_USER || "postgres";
Config.POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
Config.POSTGRES_DB = process.env.POSTGRES_DB || "postgres";
Config.POSTGRES_HOST = process.env.POSTGRES_HOST || "postgresdb";
Config.POSTGRES_PORT = process.env.POSTGRES_PORT || 5432;
//   REDIS
Config.REDIS_HOST = process.env.REDIS_HOST || "redis";
Config.REDIS_PORT = process.env.REDIS_PORT || 6379;
Config.REDIS_URL = process.env.REDIS_URL;
// APPLICATION
Config.PORT = process.env.PORT || 3002;
Config.NODE_ENV = process.env.NODE_ENV;
Config.JWT_SECRET = process.env.JWT_SECRET || "q5u3u2o4";
// SMTP
Config.SMTP_USER = process.env.SMTP_USER || "";
Config.SMTP_PASS = process.env.SMTP_PASS || "";
Config.SMTP_HOST = process.env.SMTP_HOST || "";
Config.SMTP_PORT = process.env.SMTP_PORT || 3000;
Config.SMTP_EMAIL = process.env.SMTP_EMAIL;
Config.SMTP_PASSWORD = process.env.SMTP_PASSWORD;
// SMS
Config.TWILIO_SSID = process.env.TWILIO_SSID;
Config.TWILIO_TOKEN = process.env.TWILIO_TOKEN;
exports.default = Config;
