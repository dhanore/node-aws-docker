require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const postRouter = require("./routes/postRoutes");
const authRouter = require("./routes/authRoutes");

// const rateLimit = require("express-rate-limit");
// const session = require("express-session");
const cors = require("cors");

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOST,
  MONGO_PORT,
  PORT
  //SESSION_SECRET,
} = require("./config/config");

const app = express();
const mongourl = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/?authSource=admin`;
const connectWithRetry = () => {
  mongoose
    .connect(mongourl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("successfully connected to database"))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 3000);
    });
};

connectWithRetry();

// //enable CORS (for testing only -remove in production/deployment)
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Authorization, Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// Set up rate limiter middleware
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per windowMs
// });

// // Set secure flags for cookies in a production environment
// if (app.get("env") === "production") {
//   app.set("trust proxy", 1); // Trust the first proxy
//   session.cookie.secure = true; // Serve secure cookies
// }

// // Express session configuration
// app.use(
//   session({
//     secret: SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//   })
// );

//app.use(morgan('dev'));
//app.set('view engine', 'ejs');
// Implement secure headers
//app.use(helmet());

//// Apply rate limiter middleware
//app.use(limiter);

// Passport.js configuration
//passportConfig(passport);

// app.use(passport.initialize());
// app.use(passport.session());
// // View engine setup
// app.set("view engine", "ejs");
app.enable("trust proxy");
app.use(cors({}));
app.use(express.json());

app.get("/api/v1", (req, res) => {
  res.send(`<h2>Hi There</h2>`);
  console.log("yeah it ran");
});

// Routes
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/profile", profileRouter);

// Global error handler
app.use((err, req, res, next) => {
  // Log the error
  console.error(err);
  // Customize the error response based on the error type
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).render("error", { status, message });
});

app.listen(PORT, () => console.log(`listing to port ${PORT}`));
