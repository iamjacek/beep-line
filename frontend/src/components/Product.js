import React from "react";
import Rating from "./Rating";

export default function Product({ product }) {
  return (
    <div className="main__card">
      <a href={`/products/${product._id}`}>
        <div className="main__picture-box">
          <img className="main__img" src={product.image} alt={product.name} />
        </div>
      </a>
      <div className="main__card-body">
        <a className="main__link" href={`/products/${product._id}`}>
          <h2 className="main__title">{product.name}</h2>
        </a>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <i className="fa fa-star-o"></i>
        <div className="main__price">${product.price}</div>
        <button className="main__btn btn">Add to cart</button>
      </div>
    </div>
  );
}
