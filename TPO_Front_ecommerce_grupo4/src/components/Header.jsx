import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import {UI_ACESS} from '../components/uiConstants' 
import Categories from "./Categories";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { user } = useAuth(); // Usamos el contexto para obtener el usuario autenticado
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const queryParams = new URLSearchParams(location.search);

  const handlerLoginClick = () => {
    // Si el usuario está loggeado, redirige a su perfil
    // Si no está loggeado, redirige a la página de login
    if (user) {
      navigate("/profile");
    } else {
      navigate("/userLogin");
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const searchText = searchInputRef.current.value;
    queryParams.set("search", searchText);
    navigate({
      pathname: "/products",
      search: `?${queryParams.toString()}`,
    });
  };

  const handlerHistoryClick = () => {
    if (user) {
      navigate("/purchase-history");
    } else {
      navigate("/userLogin");
    }
  };

  const handlerCartClick = () => {
    if (user) {
      navigate("/cart");
    } else {
      navigate("/userLogin");
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
          <img src="/src/assets/balls.png" width={100} alt="4 Deportes" />
            
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul
              className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
              style={{ "--bs-scroll-height": "100px" }}
            >
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Productos
                </Link>
              </li>
              <Categories />
              {user?.role == UI_ACESS.ADMIN && (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    Admin
                  </Link>
                </li>
              )}
            </ul>
            <div>
              <button
                className="nav-link"
                onClick={handlerCartClick}
                title="Carrito de compras"
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                <i
                  className="bi bi-cart"
                  style={{ fontSize: "30px", marginRight: "10px" }}
                ></i>
              </button>
            </div>
            <form
              className="d-flex align-items-center"
              role="search"
              onSubmit={handleSearch}
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                ref={searchInputRef}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            <button
              className="btn btn-outline-success ms-2"
              onClick={handlerHistoryClick}
              title="Historial carrito de compras"
            >
              <i className="bi bi-cart-fill" aria-hidden="true"></i>
            </button>
            <button
              className="btn btn-outline-success ms-2"
              onClick={handlerLoginClick}
              title="Iniciar Sesión"
            >
              <i
                className={`bi ${
                  user ? "bi-person-fill" : "bi-box-arrow-in-right"
                }`}
                aria-hidden="true"
              ></i>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
