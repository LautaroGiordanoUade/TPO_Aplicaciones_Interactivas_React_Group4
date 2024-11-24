import FavoriteProducts from "../components/product/FavoriteProducts.jsx";
import FeaturedProducts from "../components/product/FeaturedProducts.jsx";
import ViewedProducts from "../components/product/ViewedProducts.jsx";

const Home = () => {
  return (
    <div className="container-fluid">
      <FeaturedProducts />
      <FavoriteProducts />
      <ViewedProducts />
    </div>
  );
};

export default Home;
