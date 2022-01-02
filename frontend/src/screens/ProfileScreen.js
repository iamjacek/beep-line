import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import Loading from "../elements/Loading";
import MessageBox from "../elements/MessageBox";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const dispatch = useDispatch();

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and Confirm Password Are Not Matched");
    } else {
      dispatch(updateUserProfile({ userId: user._id, name, email, password }));
    }
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
            {loadingUpdate && (
              <div className="form__row">
                <Loading />
              </div>
            )}
            {errorUpdate && (
              <div className="form__row form__error">
                <MessageBox variant="error">{error}</MessageBox>
              </div>
            )}
            {successUpdate && (
              <div className="form__row form__error">
                <MessageBox>Profile Updated Successfully</MessageBox>
              </div>
            )}
            <div className="form__row">
              <label className="label" htmlFor="name">
                Name
              </label>
              <input
                className="input"
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
                onChange={(e) => setConfirmPassword(e.target.value)}
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
