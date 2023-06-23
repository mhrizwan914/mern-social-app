import User from "../models/user.js";

// Get User
const getUser = async (request, response) => {
    try {
        const { id } = request.params.id;
        const user = await User.findById(id);
        response.status(200).json(user);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}
// Get User Friends
const getUserFriends = async (request, response) => {
    try {
        const { id } = request.params.id;
        const user = await User.findById(id);
        const friends = await Promise.all(
            user.friends.map((id) => {
                User.findById(id);
            })
        );
        const formattedFriends = friends.map(({ _id, firstName, lastName, occupation, location, picture }) => {
            return { _id, firstName, lastName, occupation, location, picture };
        });
        response.status(200).json(formattedFriends);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}
// Update User Add & Remove
const addRemoveFriend = async (request, response) => {
    try {
        const { id, friendId } = request.params.id;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            user.friend = friend.friends.filter((id) => id !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();
        const friends = await Promise.all(
            user.friends.map((id) => {
                User.findById(id);
            })
        );
        const formattedFriends = friends.map(({ _id, firstName, lastName, occupation, location, picture }) => {
            return { _id, firstName, lastName, occupation, location, picture };
        });
        response.status(200).json(formattedFriends);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

export { getUser, getUserFriends, addRemoveFriend };