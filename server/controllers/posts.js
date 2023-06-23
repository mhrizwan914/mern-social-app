import Post from "../models/post.js";
import User from "../models/user.js";

// Create Post
const create = async (request, response) => {
    try {
        const { userId, description, picture } = request.body;
        const user = await User.findById(userId);
        const newPost = await Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicture: user.picture,
            picture,
            likes: {},
            comments: []
        });
        await newPost.save();
        const post = await Post.find();
        response.status(201).json(post);
    } catch (error) {
        response.status(409).json({ error: error.message });
    }
}
// Get Post
const getFeedPosts = async (request, response) => {
    try {
        const post = await Post.find();
        response.status(200).json(post);
    } catch (error) {
        response.status(404).json({ error: error.message });
    }
}
// Get User Post
const getUserPosts = async (request, response) => {
    try {
        const { id } = request.params;
        const post = await Post.find(id);
        response.status(200).json(post);
    } catch (error) {
        response.status(404).json({ error: error.message });
    }
}
// Get User Post
const likePost = async (request, response) => {
    try {
        const { id } = request.params;
        const { userId } = request.body;
        const post = await Post.findById(id);
        const isLike = post.likes.get(userId);
        if (isLike) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatePost = await findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );
        response.status(200).json(updatePost);
    } catch (error) {
        response.status(404).json({ error: error.message });
    }
}

export { create, getFeedPosts, getUserPosts, likePost };