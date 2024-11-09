import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Header from "../components/Header.jsx";
import Cart from "../pages/Cart.jsx";
import UserLogin from "../pages/UserLogin.jsx";
import Checkout from "../pages/Checkout.jsx";
import ProductDetail from "../pages/ProductDetail/ProductDetail.jsx";
import AllProducts from "../pages/AllProducts.jsx";
import Category from "../pages/Category.jsx";
import Admin from "../pages/Admin.jsx";

const AppRoutes = () => {
  return (
    <>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/userLogin" element={<UserLogin />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
    </>
  );
};

export default AppRoutes;
