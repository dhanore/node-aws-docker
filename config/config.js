require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3000,
  MONGO_HOST: process.env.MONGO_HOST || "mongo",
  MONGO_PORT: process.env.MONGO_PORT || "27017",
  MONGO_USERNAME: process.env.MONGO_USERNAME,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  SESSION_SECRET: process.env.SESSION_SECRET || "somerandomkeysecret",
  TENANTID: "f1f4f2c4-35ff-4083-928b-dced13291d9a",
  CLIENTID: "5da69d75-40d4-4ee9-9d10-d85fa1ef3f94",
  POLICYNAME: "B2C_1_Login", //B2C_1A_BBCLOGIN_SIGNIN
  POLICYURL: `https://bbcstudioscustomeridint.b2clogin.com/bbcstudioscustomeridint.onmicrosoft.com/B2C_1_Login`,
};
