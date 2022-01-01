import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser } from "../actions/userActions";
import Loading from "../elements/Loading";
import MessageBox from "../elements/MessageBox";

export default function ProfileScreen() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsUser(userInfo._id));
  }, [dispatch, userInfo._id]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
  };
  return (
    <div className="user-profile">
      <form className="form" onSubmit={submitHandler}>
        <div className="form__header">
          <h1 className="title form__title">User Profile</h1>
        </div>
        {loading ? (
          <div className="form__row">
            <Loading />
          </div>
        ) : error ? (
          <div className="form__row form__error">
            <MessageBox variant="error">{error}</MessageBox>
          </div>
        ) : (
          <>
            <div className="form__row">
              <label className="label" htmlFor="name">
                Name
              </label>
              <input
                className="input"
                id="name"
                type="text"
                placeholder="Enter name"
                value={user.name}
              ></input>
            </div>
            <div className="form__row">
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                className="input"
                id="email"
                type="email"
                placeholder="Enter email"
                value={user.email}
              ></input>
            </div>
            <div className="form__row">
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                className="input"
                id="password"
                type="password"
                placeholder="Enter password"
              ></input>
            </div>
            <div className="form__row">
              <label className="label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className="input"
                id="confirmPassword"
                type="password"
                placeholder="Enter confirm password"
              ></input>
            </div>
            <div className="form__row">
              <label className="label" />
              <button className="btn user-profile__btn" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
