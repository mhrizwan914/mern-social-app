import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 3,
            max: 10
        },
        lastName: {
            type: String,
            required: true,
            min: 3,
            max: 10
        },
        email: {
            type: String,
            required: true,
            max: 30,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 8,
            max: 30
        },
        picture: {
            type: String,
            default: ""
        },
        friends: {
            type: Array,
            default: []
        },
        location: {
            type: String
        },
        occupation: {
            type: String
        },
        views: {
            type: Number
        },
        impressions: {
            type: Number
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("user", UserSchema);

export default User;