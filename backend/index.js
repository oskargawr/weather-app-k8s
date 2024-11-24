import dotenv from "dotenv";
import express from "express";
import redis from "redis";
import cors from "cors";

import documents from "./routes/documents.js";
import authenticate from "./routes/authenticate.js";
import weather from "./routes/weather.js";
import citylist from "./routes/citylist.js";
import history from "./routes/history.js";

dotenv.config();

const { PORT, REDIS_HOST, REDIS_PORT } = process.env;
console.log(PORT, REDIS_HOST, REDIS_PORT);
if (!PORT || !REDIS_HOST || !REDIS_PORT) {
  throw new Error(
    "Environment variables are not defined properly in .env file"
  );
}

let redisClient;

(async () => {
  redisClient = redis.createClient({
    // host: REDIS_HOST,
    // port: REDIS_PORT,
    // retry_strategy: () => 1000,
    socket: {
      port: 6379,
      host: REDIS_HOST,
    },
  });

  redisClient.on("error", (err) => {
    console.log(REDIS_HOST, REDIS_PORT);
    console.error(`Redis error: ${err.message}`);
  });

  await redisClient.connect();
})();

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

const attachRedisClient = (req, res, next) => {
  req.redisClient = redisClient;
  next();
};

const app = express();

app.use(express.json());
app.use(cors());
app.use(attachRedisClient);
app.use("/api/documents", authenticate, documents);
app.use("/api/weather", authenticate, weather);
app.use("/api/citylist", authenticate, citylist);
app.use("/api/history", authenticate, history);

const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

server.on("error", (err) => {
  console.error(`Failed to start server: ${err.message}`);
});
