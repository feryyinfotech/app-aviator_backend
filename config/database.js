const mongoose = require("mongoose");
require("dotenv").config();
const dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB connection successful"))
    .catch((e) => {
      console.log("Db connection me kuch issue hai bha");
      console.log(e);
      process.exit(1);
    });
};

module.exports = dbConnect;
