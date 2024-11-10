import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "./ProductCard.css";
import placeholderImage from '/public/placeholder.png';

const ProductCard = ({ product }) => {
  const { images, name, price } = product;
  console.log(images);
  console.log(images.length);
  return (
    <Card className="card d-flex flex-column">
      <Link to={"/product/" + product.id}>
        <Card.Img className="image" variant="top" src={images && images.length > 0? images[0]?.imageBase64 : placeholderImage} />
        <Card.Body className="d-flex flex-column justify-content-end align-items-center">
          <Card.Title className="title">{name}</Card.Title>
          <Card.Text className="price">${price}</Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default ProductCard;
