import { BrowserRouter, Route, Routes } from "react-router-dom";
import __LoginScreen from "../Screens/Login";
import __RegisterScreen from "../Screens/Register";
import __HomeScreen from "../Screens/Home";
import __ProfileScreen from "../Screens/Profile";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<__LoginScreen />} />
                <Route path="/register" element={<__RegisterScreen />} />
                <Route path="/home" element={<__HomeScreen />} />
                <Route path="/profile/:userId" element={<__ProfileScreen />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;