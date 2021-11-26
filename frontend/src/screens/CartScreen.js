import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { addToCart } from "../actions/cartActions";
import MessageBox from "../elements/MessageBox";

export default function CartScreen() {
  const { id } = useParams();
  const { search } = useLocation();
  const qty = search ? Number(search.split("=")[1]) : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = () => {};

  const checkoutHandler = () => {};
  return (
    <div className="cart">
      <div className="cart__products">
        <h1 className="cart__title">Shopping Cart</h1>
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
                    <Link to={`/product/${item.product}`}>
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
                      to={`/product/${item.product}`}
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
                  <div className="cart__price">${item.price}</div>
                  <div className="cart__button-box">
                    <button
                      className="cart__button btn btn-secondary"
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
          <li className="cart__summary-list">
            <h2 className="cart__subtotal">
              Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
              {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
            </h2>
          </li>
          <li>
            <button
              type="button"
              onClick={checkoutHandler}
              className="primary block"
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
