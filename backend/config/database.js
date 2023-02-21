const mongoose = require("mongoose");
const { MONGODB_URL } = process.env;

mongoose.set("strictQuery", true);
exports.connect = () =>
  mongoose
    .connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("DB connect Successfully"))
    .catch((err) => {
      console.log("DB connection failed");
      console.log(err);
      process.exit(1);
    });
