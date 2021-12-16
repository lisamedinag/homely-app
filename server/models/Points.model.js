const { Schema, model } = require("mongoose");

const pointSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true
    },

    user: {
      type: String,
      required: true
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

module.exports = model("PointsObj", pointSchema);
