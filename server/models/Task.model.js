const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    
    points: {
      type: Number,
      required: true
    },

    description: String,

    // TODO user who created ??

    status: {
      type: String,
      enum: ['AVAILABLE','ASSIGNED', 'COMPLETED'],
      default: 'AVAILABLE'
    },

    assignedUser: String,

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

module.exports = model("Task", taskSchema);