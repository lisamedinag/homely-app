const { Schema, model } = require("mongoose");

const tokenSchema = new Schema(
  {
    token_key: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ['AVAILABLE','CLAIMED', 'EXPIRED'],
      default: 'AVAILABLE'
    },

    home: {
      type: Schema.Types.ObjectId,
      ref: 'Home'
    }
  },
  {
    // `createdAt` and `updatedAt`
    timestamps: true,
  }
);

module.exports = model("Token", tokenSchema);

