import { createClient, RedisClientType } from "redis";
import Config from "../utilities/config";

let redisClient = createClient({
  socket: { host: Config.REDIS_HOST, port: +Config.REDIS_PORT },
});

(async () => {
  redisClient.on("connect", () => {
    console.log(`Redis connected Successfully`);
  });
  redisClient.on("error", (error: any) => {
    console.log(`Redis connection failed -- ${error}`);
  });

  await redisClient.connect();
})();

export { redisClient };
