const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();

const PORT = 5000; // .env ??
app.listen(PORT, () => {
  console.log(`The Express server is running on port ${PORT}`);
});

// CORS policy
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:6379"], // .env ??
    credentials: true, // .env ??
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"], // .env ??
  })
);
app.use(cookieParser());
app.use(express.json());
// Sessions
app.use(
  session({
    secret: "your-secret-key", // put in .ENV
    resave: false,
    saveUninitialized: false,
    // store: new RedisStore({client: redisClient}), // this means where to store sessions. store on redis.
    cookie: {
      maxAge: 60 * 60 * 1000, // 1 hour in milliseconds / hopefully able to change because of remember me.
    },
  })
);

// MySQL connection
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost", // .env ??
  user: "root", // .env ??
  password: "faris123", // .env ??
  database: "librarydb", // .env ??
});

// Routers & Routes
const authRoute = require("./routes/auth.js")(connection, mysql);
app.use("/auth", authRoute);
