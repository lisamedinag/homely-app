const { Schema, model } = require("mongoose");

const rewardSchema = new Schema(
  {
    name: {
      type: String,
      // unique: true, 
      required: true
    },

    pointsWorth: {
      type: Number,
      required: true
    }, 

    description: String,

    status: {
      type: String,
      enum: ['AVAILABLE','CLAIMED', 'COMPLETED'],
      default: 'AVAILABLE'
    },

    claimedByUser: String,

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

module.exports = model("Reward", rewardSchema);