import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">CoreCraft</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarScroll">
                        <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ '--bs-scroll-height': '100px' }}>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#">Productos</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categorías
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="#">Electrónica</Link></li>
                                    <li><Link className="dropdown-item" to="#">Ropa</Link></li>
                                    <li><Link className="dropdown-item" to="#">Hogar</Link></li>
                                    <li><Link className="dropdown-item" to="#">Juguetes</Link></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><Link className="dropdown-item" to="#">Más categorías</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Cart">Carrito</Link>
                            </li>
                        </ul>
                        
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;