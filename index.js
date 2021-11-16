const express = require("express");
const mongoose = require("mongoose");
const app = express();
const {
  MONGO_IP,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_PORT,
  REDIS_IP,
  REDIS_PORT,
  SESSION_SECRET,
} = require("./config/config.js");
const cors = require("cors");
const postsRoute = require("./routes/postsRoute.js");
const usersRoute = require("./routes/usersRoute.js");
const redis = require("redis");
const session = require("express-session");

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient({
  host: REDIS_IP,
  port: REDIS_PORT,
});

const connectWithRetry = () => {
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("successfull connecting database");
    })
    .catch((error) => {
      console.log("error connecting database", error);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();
app.enable("trust proxy");
app.use(cors());
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 30000,
    },
  })
);
app.use(express.json());
app.use("/api/v1/posts", postsRoute);
app.use("/api/v1/users", usersRoute);
app.get("/api", function (req, res) {
  console.log("object");
  res.send("<h1>d!!!!!</h1>");
});
app.listen(5000, () => {
  console.log("server is running");
});
