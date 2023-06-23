import jwt from "jsonwebtoken";

// Verify Token
const verifyToken = async (request, response, next) => {
    try {
        let token = request.headers.Authorization || request.headers.authorization;
        if (!token) {
            return response.status(403).json({ error: "Access Denied" });
        }
        if (token && token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }
        const verified = jwt.verify(token, process.env.SECRET_TOKEN);
        request.user = verified;
        next();
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

export default verifyToken;