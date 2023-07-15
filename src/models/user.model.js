const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, unique: false },
    lastName: { type: String, required: true, unique: false },
    password: { type: String, required: [true, "required field"] },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: { type: String, default: "user" },
  },
  { timestamps: false, versionKey: false }
);

module.exports = mongoose.model("user", userSchema);
