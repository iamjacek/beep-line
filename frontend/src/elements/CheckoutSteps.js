import React from "react";

export default function CheckoutSteps(props) {
  return (
    <div className="checkout-steps">
      <div
        className={
          props.step1
            ? "checkout-steps__step step--active"
            : "checkout-steps__step"
        }
      >
        <i className={props.step1 ? "fas fa-circle" : "far fa-circle"}></i>{" "}
        Sign-In
      </div>
      <div className="checkout-steps__arrow checkout-steps__arrow--active">
        <i className="fas fa-arrow-down"></i>
      </div>
      <div
        className={
          props.step2
            ? "checkout-steps__step step--active"
            : "checkout-steps__step"
        }
      >
        <i className={props.step2 ? "fas fa-circle" : "far fa-circle"}></i>{" "}
        Shipping
      </div>
      <div
        className={
          props.step2
            ? "checkout-steps__arrow checkout-steps__arrow--active"
            : "checkout-steps__arrow"
        }
      >
        <i className="fas fa-arrow-down"></i>
      </div>
      <div
        className={
          props.step3
            ? "checkout-steps__step step--active"
            : "checkout-steps__step"
        }
      >
        <i className={props.step3 ? "fas fa-circle" : "far fa-circle"}></i>{" "}
        Payment
      </div>
      <div
        className={
          props.step3
            ? "checkout-steps__arrow checkout-steps__arrow--active"
            : "checkout-steps__arrow"
        }
      >
        <i className="fas fa-arrow-down"></i>
      </div>
      <div
        className={
          props.step4
            ? "checkout-steps__step step--active"
            : "checkout-steps__step"
        }
      >
        <i className={props.step4 ? "fas fa-circle" : "far fa-circle"}></i>{" "}
        Place Order
      </div>
    </div>
  );
}
