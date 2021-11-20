import React from "react";
import Rating from "./Rating";

export default function Product({ product }) {
  return (
    <div className="product__card">
      <a href={`/product/${product._id}`}>
        <div className="product__picture-box">
          <img
            className="product__img"
            src={product.image}
            alt={product.name}
          />
        </div>
      </a>
      <div className="product__card-body">
        <a className="product__link" href={`/product/${product._id}`}>
          <h2 className="product__title">{product.name}</h2>
        </a>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <i className="fa fa-star-o"></i>
        <div className="product__price">${product.price}</div>
        <button className="product__btn btn">Add to cart</button>
      </div>
    </div>
  );
}
