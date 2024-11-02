import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Header from "../components/Header.jsx";
import Cart from "../pages/Cart.jsx";
import Checkout from  "../pages/Checkout.jsx";
import ProductDetail from '../pages/ProductDetail.jsx';

const AppRoutes = () => {
    return (
        <>
            <Header />
            <div>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/cart" element={<Cart/>} />
                    <Route path="/checkout" element= {<Checkout/>}/>
                    <Route path="product/:id" element={<ProductDetail/>} />
                </Routes>
            </div>
        </>
    );
};

export default AppRoutes;