import React, { useEffect, useState } from "react";
import Axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deliverOrder, detailsOrder, payOrder } from "../actions/orderActions";
import Loading from "../elements/Loading";
import MessageBox from "../elements/MessageBox";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";

export default function OrderScreen() {
  const { id: orderId } = useParams();
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order, orderId, sdkReady, successPay, successDeliver]);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  return loading ? (
    <div className="order-screen__info">
      <Loading />
    </div>
  ) : error ? (
    <div className="order-screen__info">
      {" "}
      <MessageBox>{error}</MessageBox>
    </div>
  ) : (
    <div className="summary">
      <MessageBox>📦 Order no. {order._id}</MessageBox>

      <div className="summary__data">
        <div className="summary__details">
          <div className="summary__area">
            <h2 className="title form__title">Shipping</h2>
            <p className="summary__text">
              <strong>Name:</strong> {order.shippingAddress.fullName} <br />
              <strong>Address: </strong> {order.shippingAddress.address},
              {order.shippingAddress.address2
                ? ` ${order.shippingAddress.address2}, `
                : " "}
              {order.shippingAddress.city}, {order.shippingAddress.postCode},
              {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <div className="summary__message">
                <MessageBox>Delivered at {order.deliveredAt}</MessageBox>
              </div>
            ) : (
              <div className="summary__message">
                <MessageBox variant="error">Not Delivered</MessageBox>
              </div>
            )}
            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <div className="order-screen__info">
                  {loadingDeliver && (
                    <div className="order-screen__info-loading">
                      <Loading />
                    </div>
                  )}
                  {errorDeliver && (
                    <div className="order-screen__info-loading">
                      <MessageBox variant="error">{errorDeliver}</MessageBox>
                    </div>
                  )}
                  <button
                    type="button"
                    className="btn summary__btn"
                    onClick={deliverHandler}
                  >
                    Deliver Order
                  </button>
                </div>
              )}
          </div>

          <div className="summary__area">
            <h2 className="title form__title">Payment</h2>
            <p className="summary__text">
              <strong>Method:</strong> {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <div className="summary__message">
                <MessageBox>Paid at {order.paidAt}</MessageBox>
              </div>
            ) : (
              <div className="summary__message">
                <MessageBox variant="error">Not Paid</MessageBox>
              </div>
            )}
          </div>

          <div className="summary__area">
            <h2 className="title form__title">Order Items</h2>
            <ul className="summary__list">
              {order.orderItems.map((item) => (
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
              <div>${order.itemsPrice.toFixed(2)}</div>
            </div>

            <div className="summary__price-data">
              <div>Shipping</div>
              <div>${order.shippingPrice.toFixed(2)}</div>
            </div>

            <div className="summary__price-data">
              <div>Tax</div>
              <div>${order.taxPrice.toFixed(2)}</div>
            </div>
            <hr></hr>
            <div className="summary__price-data">
              <div>
                <strong> Order Total</strong>
              </div>
              <div>
                <strong>${order.totalPrice.toFixed(2)}</strong>
              </div>
            </div>
            {!order.isPaid && (
              <div className="summary__price-data">
                {!sdkReady ? (
                  <div className="order-screen__info-loading">
                    {" "}
                    <Loading />
                  </div>
                ) : (
                  <>
                    <div className="order-screen__info">
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                    </div>
                  </>
                )}
              </div>
            )}
            {errorPay && (
              <div className="order-screen__info-loading">
                <MessageBox variant="error">{errorPay}</MessageBox>
              </div>
            )}
            {loadingPay && (
              <div className="order-screen__info-loading">
                <Loading />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
