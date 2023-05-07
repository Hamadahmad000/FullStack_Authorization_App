const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const verificationSchema = new mongoose.Schema({
  own: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 3600,
    default: Date.now,
  },
});

// Generating Hashed Password

verificationSchema.pre("save", async function (next) {
  try {
    if (this.isModified("token")) {
      const hash = await bcrypt.hash(this.token, 10);
      this.token = hash;
      next();
    }
  } catch (error) {
    console.log(error.message);
  }
});

// Comparing Password With Methods
verificationSchema.methods.compareToken = async function (token) {
  const result = await bcrypt.compare(token, this.token);

  return result;
};

const verificationToken = mongoose.model(
  "verificatinToken",
  verificationSchema
);

module.exports = verificationToken;
