import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import Loading from "../elements/Loading";
import MessageBox from "../elements/MessageBox";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { search } = useLocation();
  const redirect = search ? `/${search.split("=")[1]}` : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and confirm password are not the same");
    } else {
      dispatch(register(name, email, password));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(`${redirect}`);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div className="register">
      <form className="form" onSubmit={submitHandler}>
        <div className="form__header">
          <h1 className="title form__title">Create Account</h1>
        </div>
        {loading && (
          <div className="form__row">
            <Loading />
          </div>
        )}
        {error && (
          <div className="form__row form__error">
            <MessageBox variant="error">{error}</MessageBox>
          </div>
        )}
        <div className="form__row">
          <label className="label" htmlFor="name">
            Name
          </label>
          <input
            className="input"
            type="text"
            id="name"
            placeholder="Enter name"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="form__row">
          <label className="label" htmlFor="email">
            Email address
          </label>
          <input
            className="input"
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="form__row">
          <label className="label" htmlFor="password">
            Confirm Password
          </label>
          <input
            className="input"
            type="password"
            id="confirmPassword"
            placeholder="Confirm password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <div className="form__row">
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            className="input"
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className="form__row">
          <label className="label" />
          <button className="login__btn btn" type="submit">
            Create account
          </button>
        </div>
        <div className="form__row">
          <label className="label" />
          <div className="form__alternative-link">
            <Link className="hyperlink" to={`/login?redirect=${redirect}`}>
              Already have an account? Log In.
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
