import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Header from "../components/Header.jsx";
import Cart from "../pages/Cart.jsx";
import UserLogin from "../pages/UserLogin.jsx";

const AppRoutes = () => {
    return (
        <>
            <Header />
            <div>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/cart" element={<Cart/>} />
                    <Route path="/userLogin" element={<UserLogin/>} />
                </Routes>
            </div>
        </>
    );
};

export default AppRoutes;