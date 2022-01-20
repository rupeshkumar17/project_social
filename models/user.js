const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: "String",
    trim: true,
    required: true,
  },
  email: {
    type: "String",
    trim: true,
    required: true,
  },
  hashed_password: {
    type: "String",

    required: true,
  },
  salt: String,
  created: {
    type: "Date",
    default: Date.now,
  },
  updated: Date,
});

//virtual field
userSchema
  .virtual("password")
  .set(function (password) {
    //create temparory variable for

    this._password = password;
    //generate a time stamp
    this.salt = uuidv4();
    //encryptpassword
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

//methods
userSchema.methods = {
  authenticate: function (plaintext) {
    return this.encryptPassword(plaintext) === this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
