import FavoriteProducts from "../components/product/FavoriteProducts.jsx";
import FeaturedProducts from "../components/product/FeaturedProducts.jsx";

const Home = () => {
  return (
    <div className="container-fluid">
      <h1>BIENVENIDO</h1>

      <FeaturedProducts />
      <FavoriteProducts />
    </div>
  );
};

export default Home;
