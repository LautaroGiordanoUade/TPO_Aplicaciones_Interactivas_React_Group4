import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../services/CategoryService";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        const response = await getCategories();
        setCategories(response);
      } catch (error) {}
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
                <Link className="dropdown-item" to={"/category/" + category.id}>
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
