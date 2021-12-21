import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../elements/MessageBox";

export default function CartScreen() {
  const { id } = useParams();
  const { search } = useLocation();
  const navigate = useNavigate();
  const qty = search ? Number(search.split("=")[1]) : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };
  return (
    <div className="cart">
      <div className="cart__header">
        <h1 className="title cart__title">Shopping Cart</h1>
      </div>
      <div className="cart__products">
        {error && <MessageBox variant="error">{error}</MessageBox>}
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul className="cart__product-list">
            {cartItems.map((item) => (
              <li key={item.product} className="cart__product">
                <div className="cart__row">
                  <div className="cart__img-box">
                    <Link to={`/products/${item.product}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="cart__img"
                      ></img>
                    </Link>
                  </div>
                  <div className="cart__item">
                    <Link
                      className="cart__item-link"
                      to={`/products/${item.product}`}
                    >
                      {item.name}
                    </Link>
                  </div>
                  <div className="cart__select-box">
                    <select
                      className="cart__select-quantity"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="cart__price">${item.price.toFixed(2)}</div>
                  <div className="cart__button-box">
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="cart__summary">
        <ul className="cart__summary-list">
          <li>
            <h2 className="cart__subtotal">
              Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)}{" "}
              {cartItems.reduce((a, c) => a + c.qty, 0) === 1
                ? "item"
                : "items"}
              ):{" "}
              <strong>
                ${cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)}
              </strong>
            </h2>
          </li>
          <li>
            <button
              type="button"
              onClick={checkoutHandler}
              className="cart__summary-btn btn"
              disabled={cartItems.length === 0}
            >
              To Checkout
            </button>
            {cartItems.length > 0 && (
              <div className="cart__info">
                <i className="fas fa-info-circle"></i> You can review your cart
                before purchase
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
