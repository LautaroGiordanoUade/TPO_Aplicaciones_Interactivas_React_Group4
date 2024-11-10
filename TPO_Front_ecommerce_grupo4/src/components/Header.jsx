import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "font-awesome/css/font-awesome.min.css";
import Categories from "./Categories";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { user } = useAuth(); // Usamos el contexto para obtener el usuario autenticado
  const navigate = useNavigate();

  const handlerLoginClick = () => {
    // Si el usuario está loggeado, redirige a su perfil
    // Si no está loggeado, redirige a la página de login
    if (user) {
      navigate("/profile");
    } else {
      navigate("/userLogin");
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            CoreCraft
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
              <li className="nav-item">
                <Link className="nav-link" to="/Cart">
                  Carrito
                </Link>
              </li>
              {user?.admin && (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    Admin
                  </Link>
                </li>
              )}
            </ul>

            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            <button
              className="btn btn-outline-success ms-2"
              onClick={handlerLoginClick}
            >
              <i
                className={`fa ${user ? "fa-user" : "fa-sign-in-alt"}`}
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
