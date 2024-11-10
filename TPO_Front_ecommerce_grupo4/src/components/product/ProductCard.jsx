import React from "react";
import { Link } from "react-router-dom";
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { image, name, price } = product;

  return (
    <Link
      to={"/product/" + product.id}
    >
      <div className="card">
        <img
          src={product.images[0]?.imageBase64}
          className="card-img-top max-image"
          alt={name}
        />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">${product.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
