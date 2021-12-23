import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../elements/CheckoutSteps";

export default function ShippingAddressScreen() {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [address2, setAddress2] = useState(shippingAddress.address2);
  const [city, setCity] = useState(shippingAddress.city);
  const [postCode, setPostCode] = useState(shippingAddress.postCode);
  const [country, setCountry] = useState(
    shippingAddress.country || "United Kingdom"
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        fullName,
        address,
        address2,
        city,
        postCode,
        country,
      })
    );
    navigate("/payment");
  };

  return (
    <div className="shipping">
      <CheckoutSteps step1 step2 />
      <div className="shipping-form">
        <form className="form" onSubmit={submitHandler}>
          <div className="form__header">
            <h1 className="title form__title">Shipping Address</h1>
          </div>
          <div className="form__row">
            <label className="label" htmlFor="fullName">
              Full Name
            </label>
            <input
              className="input"
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            ></input>
          </div>
          <div className="form__row">
            <label className="label" htmlFor="address">
              Address Line 1
            </label>
            <input
              className="input"
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></input>
          </div>
          <div className="form__row">
            <label className="label" htmlFor="address2">
              Address Line 2 (Optional)
            </label>
            <input
              className="input"
              type="text"
              id="address2"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
            ></input>
          </div>
          <div className="form__row">
            <label className="label" htmlFor="city">
              Town/City
            </label>
            <input
              className="input"
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            ></input>
          </div>
          <div className="form__row">
            <label className="label" htmlFor="postCode">
              Post Code
            </label>
            <input
              className="input"
              type="text"
              id="postalCode"
              value={postCode}
              onChange={(e) => setPostCode(e.target.value)}
              required
            ></input>
          </div>
          <div className="form__row">
            <label className="label" htmlFor="country">
              Country
            </label>
            <input
              className="input"
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            ></input>
          </div>
          <div className="form__row">
            <label className="label" />
            <button className="btn shipping__btn" type="submit">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
