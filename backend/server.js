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
// const Redis = require("ioredis");
// const RedisStore = require("connect-redis").default;
// const redisClient = new Redis();

// CORS policy
const cors = require("cors");
app.use(
  cors({
    origin: ["https://libraryims.onrender.com"],
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
  multipleStatements: true,
});

// Sessions
app.use(
  session({
    // store: new RedisStore({client: redisClient}),
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
const dashboardRoute = require("./routes/dashboardAPI")(connection, mysql);
app.use("/api", dashboardRoute);
const membersRoute = require("./routes/membersApi")(connection, mysql);
app.use("/api", membersRoute);
const booksRoute = require("./routes/booksApi")(connection, mysql);
app.use("/api", booksRoute);
const transactionsRoute = require("./routes/transactionsApi")(
  connection,
  mysql
);
app.use("/api", transactionsRoute);
const employeesRoute = require("./routes/employeesAPI")(connection, mysql);
app.use("/api", employeesRoute);
