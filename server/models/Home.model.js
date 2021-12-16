const { Schema, model } = require("mongoose");

const homeSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true
        },

        // owner: {
        //     type: Schema.Types.ObjectId,
        //     ref: 'User'
        // },

        owner: {
            type: String,
            required: true
        },

        usersArr: [{
            type: String,
            required: true
        }]
    },
    {
        // `createdAt` and `updatedAt`
        timestamps: true,
    }
);

module.exports = model("Home", homeSchema);