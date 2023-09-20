const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mail: {
      type: String,
      required: true,
    },
    pass: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("UserModel", userSchema);
module.exports = UserModel;
