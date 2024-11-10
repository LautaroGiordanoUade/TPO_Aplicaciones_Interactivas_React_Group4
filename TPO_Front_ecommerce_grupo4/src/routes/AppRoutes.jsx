import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Header from "../components/Header.jsx";
import Cart from "../pages/Cart.jsx";
import Checkout from  "../pages/Checkout.jsx";
import UserLogin from "../pages/UserLogin.jsx";
import ProductDetail from '../pages/ProductDetail/ProductDetail.jsx';
import AllProducts from "../pages/AllProducts.jsx";
import Category from "../pages/Category.jsx";
import Profile from "../pages/Profile.jsx";
import PurchaseHistory from "../pages/PurchaseHistory/PurchaseHistory.jsx";

const AppRoutes = () => {
    return (
        <>
            <Header />
            <div>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/cart" element={<Cart/>} />
                    <Route path="/userLogin" element={<UserLogin/>} />
                    <Route path="/purchase-history" element={<PurchaseHistory/>} />
                    <Route path="/profile" element={<Profile />} /> 
                    <Route path="/checkout" element= {<Checkout/>}/>
                    <Route path="/userLogin" element={<UserLogin/>} />
                    <Route path="/products" element={<AllProducts/>} />
                    <Route path="/product/:id" element={<ProductDetail/>} />
                    <Route path="/category/:id" element={<Category/>} />
                </Routes>
            </div>
        </>
    );
};

export default AppRoutes;