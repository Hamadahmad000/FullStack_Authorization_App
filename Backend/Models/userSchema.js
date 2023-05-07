const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Generating Hashed Password

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
      next();
    }
  } catch (error) {
    console.log(error.message);
  }
});

// Comparing Password With Methods
userSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);

  return result;
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
