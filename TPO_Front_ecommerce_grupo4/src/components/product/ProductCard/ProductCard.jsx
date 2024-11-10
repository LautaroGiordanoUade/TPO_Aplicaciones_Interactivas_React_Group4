import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { images, name, price } = product;
  return (
    <Card className="card d-flex flex-column">
      <Link to={"/product/" + product.id}>
        <Card.Img variant="top" src={images? images[0]?.imageBase64 : ""} />
        <Card.Body className="d-flex flex-column justify-content-end align-items-center">
          <Card.Title>{name}</Card.Title>
          <Card.Text>${price}</Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default ProductCard;
