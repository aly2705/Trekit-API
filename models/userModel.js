const mongoose = require("mongoose");
const validator = require("validator");
const bycrpt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email address"],
    unique: true,
    lowercase: true,
    validate: {
      validator: (input) => validator.isEmail(input),
      message: "Please provide a valid email address",
    },
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator: function (input) {
        return input === this.password;
      },
      message: "Password confirm must be the same as password",
    },
  },
});

// PRE_SAVE MIDDLEWARE: PASSWORD ENCRYPTION
userSchema.pre("save", async function (next) {
  // Password not modified, we do not encrypt (this middleware will run after user creation and password update)
  if (!this.isModified("password")) return next();

  this.password = await bycrpt.hash(this.password, 12);
  this.passwordConfirm = undefined; //don't need to store it in the DB
});

// INSTANCE METHOD:  CHECK IF PASSWORD IS CORRECT
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bycrpt.compare(candidatePassword, userPassword);
};
// eslint-disable-next-line new-cap
const User = new mongoose.model("User", userSchema);

module.exports = User;
