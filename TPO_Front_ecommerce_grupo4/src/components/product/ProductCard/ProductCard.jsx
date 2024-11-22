import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "./ProductCard.css";
import placeholderImage from "/public/placeholder.png";

const ProductCard = ({ product }) => {
  const { images, name, price } = product;
  return (
    <Card className="card">
      <Link to={"/product/" + product.id}>
        <Card.Img
          className="image"
          variant="top"
          src={
            images && images.length > 0
              ? images[0]?.imageBase64
              : placeholderImage
          }
        />
        <Card.Body className="d-flex flex-column justify-content-end align-items-center">
          <Card.Title className="title">{name}</Card.Title>
          <Card.Text className="price">${product.price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default ProductCard;
