import React, { useEffect, useState } from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";

export default function Product({ product }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [itemInCart, setItemInCart] = useState(false);

  const removeFromCartHandler = () => {
    dispatch(removeFromCart(product._id));
  };
  const addToCartHandler = () => {
    dispatch(addToCart(product._id, 1));
  };

  useEffect(() => {
    const thisItem = cartItems.filter((item) => item.product === product._id);
    setItemInCart(thisItem.length > 0);
  }, [cartItems, product._id]);

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
        {itemInCart && (
          <button
            className="product__btn btn btn-secondary"
            onClick={removeFromCartHandler}
          >
            Remove from cart
          </button>
        )}
        {!itemInCart && (
          <button className="product__btn btn" onClick={addToCartHandler}>
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}
