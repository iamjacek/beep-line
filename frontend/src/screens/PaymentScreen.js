import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../elements/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";

export default function PaymentScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    setRedirect(true);
  };

  //need to be logged in otherwise navigate to login screen
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  //if address does not exist navigate to shipping screen
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress.address, navigate]);

  useEffect(() => {
    if (redirect) {
      navigate("/summary");
    }
  }, [redirect, navigate]);

  return (
    <div className="payment">
      <CheckoutSteps step1 step2 step3 />
      <div className="payment-form">
        <form className="form" onSubmit={submitHandler}>
          <div className="form__header">
            <h1 className="title form__title">Payment Method</h1>
          </div>
          <div className="form__column">
            <input
              className="payment__radio"
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label className="label payment__label" htmlFor="paypal">
              PayPal
            </label>
          </div>
          <div className="form__column">
            <input
              className="payment__radio"
              type="radio"
              id="stripe"
              value="Stripe"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label className="label payment__label" htmlFor="stripe">
              Stripe
            </label>
          </div>
          <div className="form__row">
            <label className="label" />
            <button className="btn shipping__btn" type="submit">
              Continue to payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
