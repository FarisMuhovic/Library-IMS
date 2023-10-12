const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
// .env secret variables
require("dotenv").config();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`The Express server is running on port ${PORT}`);
});
app.use(cookieParser());
app.use(express.json());

// REDIS
const Redis = require("ioredis");
const RedisStore = require("connect-redis").default;
const redisClient = new Redis();

// CORS policy
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  })
);

// MySQL connection
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: process.env.SQLHOST,
  user: process.env.SQLUSER,
  password: process.env.SQLPASSWORD,
  database: process.env.SQLDATABASE,
});

// Sessions
app.use(
  session({
    store: new RedisStore({client: redisClient}),
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: false,
    name: "sid",
    cookie: {
      secure: false,
      httpOnly: false,
      sameSite: false,
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 1000 * 3, // 3 hour in milliseconds
    },
  })
);

// Routers & Routes
const authRoute = require("./routes/auth.js")(connection, mysql);
app.use("/auth", authRoute);
