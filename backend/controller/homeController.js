const bigPromise = require("../middleware/bigPromise");

exports.home = bigPromise((req, res) => {
  res.status(200).json({
    success: true,
    greeting: "Welcome from Flexiple Comment Project API",
  });
});
