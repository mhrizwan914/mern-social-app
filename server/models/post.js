import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
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
        location: {
            type: String
        },
        description: {
            type: String,
        },
        picture: {
            type: String,
            default: ""
        },
        userPicture: {
            type: String,
            default: ""
        },
        likes: {
            type: Map,
            of: Boolean
        },
        comments: {
            type: Array,
            default: []
        }
    },
    {
        timestamps: true
    }
);

const Post = mongoose.model("post", PostSchema);

export default Post;