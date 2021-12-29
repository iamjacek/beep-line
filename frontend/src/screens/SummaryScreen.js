import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import CheckoutSteps from "../elements/CheckoutSteps";
import Loading from "../elements/Loading";
import MessageBox from "../elements/MessageBox";

export default function SummaryScreen(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, success, order, navigate]);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, navigate]);

  return (
    <div className="summary">
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="summary__data">
        <div className="summary__details">
          <div className="summary__area">
            <h2 className="title form__title">Shipping</h2>
            <p className="summary__text">
              <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
            </p>
            <p className="summary__text">
              <strong>Address: </strong> {cart.shippingAddress.address},
              {cart.shippingAddress.address2
                ? ` ${cart.shippingAddress.address2}, `
                : " "}
              {cart.shippingAddress.city}, {cart.shippingAddress.postCode},
              {cart.shippingAddress.country}
            </p>
          </div>

          <div className="summary__area">
            <h2 className="title form__title">Payment</h2>
            <p className="summary__text">
              <strong>Method:</strong> {cart.paymentMethod}
            </p>
          </div>

          <div className="summary__area">
            <h2 className="title form__title">Order Items</h2>
            <ul className="summary__list">
              {cart.cartItems.map((item) => (
                <li key={item.product} className="summary__element">
                  <div className="summary__img-box">
                    <img
                      className="summary__img"
                      src={item.image}
                      alt={item.name}
                    ></img>
                  </div>
                  <div className="summary__info">
                    <div className="summary__item-name">
                      <Link
                        to={`/product/${item.product}`}
                        className="summary__item"
                      >
                        {item.name}
                      </Link>
                    </div>

                    <div className="summary__item-price">
                      {item.qty} x ${item.price.toFixed(2)} ={" "}
                      <strong>${(item.qty * item.price).toFixed(2)}</strong>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="summary__price">
          <div className="summary__area">
            <h2 className="title summary__price-title">Order Summary</h2>

            <div className="summary__price-data">
              <div>Items</div>
              <div>${cart.itemsPrice.toFixed(2)}</div>
            </div>

            <div className="summary__price-data">
              <div>Shipping</div>
              <div>${cart.shippingPrice.toFixed(2)}</div>
            </div>

            <div className="summary__price-data">
              <div>Tax</div>
              <div>${cart.taxPrice.toFixed(2)}</div>
            </div>
            <hr></hr>
            <div className="summary__price-data">
              <div>
                <strong> Order Total</strong>
              </div>
              <div>
                <strong>${cart.totalPrice.toFixed(2)}</strong>
              </div>
            </div>

            <button
              type="button"
              className="btn summary__btn"
              onClick={placeOrderHandler}
              disabled={cart.cartItems.length === 0}
            >
              Place Order
            </button>
            {loading && (
              <div className="summary__info">
                <Loading />
              </div>
            )}
            {error && (
              <div className="summary__info">
                <MessageBox variant="error">{error}</MessageBox>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
