const mongoose = require("mongoose");

const traineeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
    },
    age: {
        type: Number,
        required: [true, "Age is required"]
    },
    city: {
      type: String,
      required: [true, "Phone number is required"]
    }
  },
  {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model("User", traineeSchema);
