import React from "react";
import { useEffect, useState } from "react";
import { getCategories } from "../services/productService";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        const response = await getCategories();
        setCategories(response);
      } catch (error) {
        setFavoriteProductHasError;
        setHasError(true);
        setErrorMessage("Ocurrió un error.");
      }
    };
    init();
  }, []);

  return (
    <>
      {categories ? (
        <li className="nav-item dropdown">
          <Link
            className="nav-link dropdown-toggle"
            to="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Categorías
          </Link>
          <ul className="dropdown-menu">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  className="dropdown-item"
                  reloadDocument
                  to={"/category/" + category.id}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ) : null}
    </>
  );
};

export default Categories;
