import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import line from "./assets/logo-line.svg";
import cartIcon from "./assets/shopping-cart.svg";
import CartScreen from "./screens/CartScreen";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [cartItemsTotal, setCartItemsTotal] = useState(0);

  useEffect(() => {
    document
      .querySelector(".navbar-right__cart-ico-qty")
      .classList.toggle("navbar-right__cart-ico-qty--active");
  }, [cartItemsTotal]);

  useEffect(() => {
    setCartItemsTotal(cartItems.reduce((a, c) => a + c.qty, 0));
  }, [cartItems]);
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="navbar">
          <div className="navbar-left">
            <Link to="/" className="navbar-left__logo-link">
              <div className="navbar-left__logo-container">
                <img
                  src={line}
                  alt="logo Beep-Line"
                  className="navbar-left__logo-line"
                />
                <div className="navbar-left__logo-title">
                  <span className="navbar-left__logo-text1">beep</span>
                  <span className="navbar-left__logo-text2">line</span>
                </div>
                <p className="navbar-left__logo-description">
                  Selected phone accessories™
                </p>
              </div>
            </Link>
          </div>
          <div className="navbar-right">
            <Link className="navbar-right__button-cart" to="/cart">
              <button className="navbar-right__button">
                <img
                  src={cartIcon}
                  alt="cart icon"
                  className="navbar-right__cart-icon"
                />
                {cartItemsTotal >= 0 && (
                  <span className="navbar-right__cart-ico-qty">
                    {cartItemsTotal}
                  </span>
                )}
              </button>
            </Link>
            <Link to="#">
              <button className="navbar__btn btn btn-secondary">Log In</button>
            </Link>
            <Link to="#">
              <button className="navbar__btn btn">Sign Up</button>
            </Link>
          </div>
        </header>
        <main className="main">
          <Routes>
            <Route path="/cart/" element={<CartScreen />} exact />
            <Route path="/cart/:id" element={<CartScreen />} exact />
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/products/:id" element={<ProductScreen />} exact />
          </Routes>
        </main>
        <footer className="footer">
          <div className="footer__container">
            <div className="footer__links">
              <div className="footer__links-box">
                <Link to="/" className="footer__logo-link">
                  <div className="footer__logo-container">
                    <img
                      src={line}
                      alt="logo Beep-Line"
                      className="footer__logo-line"
                    />
                    <div className="footer__logo-title">
                      <span className="footer__logo-text1">beep</span>
                      <span className="footer__logo-text2">line</span>
                    </div>
                    <p className="footer__logo-description">
                      Selected Phone Accessories™
                    </p>
                  </div>
                </Link>
              </div>
              <div className="footer__links-box">
                <h4 className="footer__header">Important</h4>
                <ul className="footer__link-container">
                  <li className="footer__link">
                    <Link className="footer__hyperlink" to="#">
                      Page 1
                    </Link>
                  </li>
                  <li className="footer__link">
                    <Link className="footer__hyperlink" to="#">
                      Page 2
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="footer__links-box">
                <h4 className="footer__header">Info</h4>
                <ul className="footer__link-container">
                  <li className="footer__link">
                    <Link className="footer__hyperlink" to="#">
                      Page 1
                    </Link>
                  </li>
                  <li className="footer__link">
                    <Link className="footer__hyperlink" to="#">
                      Page 2
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="footer__links-box">
                <h4 className="footer__header">Products</h4>
                <ul className="footer__link-container">
                  <li className="footer__link">
                    <Link className="footer__hyperlink" to="#">
                      Page 1
                    </Link>
                  </li>
                  <li className="footer__link">
                    <Link className="footer__hyperlink" to="#">
                      Page 2
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer__policy">
              <ul className="footer__link-container footer__link-container-horizontal">
                <li className="footer__link">
                  <Link className="footer__hyperlink" to="#">
                    Disclamer
                  </Link>
                </li>
                <li className="footer__link">
                  <Link className="footer__hyperlink" to="#">
                    Cookie Policy
                  </Link>
                </li>
                <li className="footer__link">
                  <Link className="footer__hyperlink" to="#">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
