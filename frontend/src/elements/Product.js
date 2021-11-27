import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";

export default function Product({ product }) {
  return (
    <div className="product__card">
      <Link to={`/products/${product._id}`}>
        <div className="product__picture-box">
          <img
            className="product__img"
            src={product.image}
            alt={product.name}
          />
        </div>
      </Link>
      <div className="product__card-body">
        <Link className="product__link" to={`/products/${product._id}`}>
          <h2 className="product__title">{product.name}</h2>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <div className="product__price">${product.price.toFixed(2)}</div>
        <button className="product__btn btn">Add to cart</button>
      </div>
    </div>
  );
}
