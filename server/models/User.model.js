const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      unique: true,
      required: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ['USER','ADMIN'],
      default: 'USER'
    }
  },
  {
    // `createdAt` and `updatedAt`
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
