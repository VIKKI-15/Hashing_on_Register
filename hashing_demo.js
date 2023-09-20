const bcrypt = require("bcrypt");
const mongose = require("mongoose");
const saltrounds = 10;
const password = "Admin@123";

// Hashing Password
bcrypt
  .genSalt(saltrounds)
  .then((salt) => {
    console.log("Salt:", salt);

    return bcrypt.hash(password, salt);
  })
  .then((hash) => {
    console.log("Hash: ", hash);
  })
  .catch((err) => console.error(err.message));
