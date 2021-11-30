import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../actions/userActions";
import { useLocation, useNavigate } from "react-router";
import Loading from "../elements/Loading";
import MessageBox from "../elements/MessageBox";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  const { search } = useLocation();
  const redirect = search ? `/${search.split("=")[1]}` : "/";

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate(`${redirect}`);
    }
  }, [navigate, userInfo, redirect]);
  return (
    <div className="login">
      <form className="login__form" onSubmit={submitHandler}>
        <div className="login__header">
          <h1 className="title login__title">Sign In</h1>
        </div>
        {loading && (
          <div className="login__row">
            <Loading />
          </div>
        )}
        {error && (
          <div className="login__row login__error">
            <MessageBox variant="error">{error}</MessageBox>
          </div>
        )}
        <div className="login__row">
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
        <div className="login__row">
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
        <div className="login__row">
          <label className="label" />
          <button className="login__btn btn" type="submit">
            Log In
          </button>
        </div>
        <div className="login__row">
          <label className="label" />
          <div className="login__new-customer">
            <Link className="hyperlink" to={`/register`}>
              New customer? Create your account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
