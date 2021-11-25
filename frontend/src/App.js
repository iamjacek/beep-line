import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import line from "./assets/logo-line.svg";
import cart from "./assets/shopping-cart.svg";

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="navbar">
          <div className="navbar-left">
            <a href="/" className="navbar-left__logo-link">
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
            </a>
          </div>
          <div className="navbar-right">
            <button className="navbar-right__button-cart">
              <a href="#">
                <img
                  src={cart}
                  alt="cart icon"
                  className="navbar-right__cart-icon"
                />
              </a>
            </button>
            <a href="#">
              <button className="navbar__btn btn btn-secondary ">Log In</button>
            </a>
            <a href="#">
              <button className="btn">Sign Up</button>
            </a>
          </div>
        </header>
        <main className="main">
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/products/:id" element={<ProductScreen />} exact />
          </Routes>
        </main>
        <footer className="footer">
          <div className="footer__container">
            <div className="footer__links">
              <div className="footer__links-box">
                <a href="index.html" className="footer__logo-link">
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
                </a>
              </div>
              <div className="footer__links-box">
                <h4 className="footer__header">Important</h4>
                <ul className="footer__link-container">
                  <li className="footer__link">
                    <a className="footer__hyperlink" href="#">
                      Page 1
                    </a>
                  </li>
                  <li className="footer__link">
                    <a className="footer__hyperlink" href="#">
                      Page 2
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer__links-box">
                <h4 className="footer__header">Info</h4>
                <ul className="footer__link-container">
                  <li className="footer__link">
                    <a className="footer__hyperlink" href="#">
                      Page 1
                    </a>
                  </li>
                  <li className="footer__link">
                    <a className="footer__hyperlink" href="#">
                      Page 2
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer__links-box">
                <h4 className="footer__header">Products</h4>
                <ul className="footer__link-container">
                  <li className="footer__link">
                    <a className="footer__hyperlink" href="#">
                      Page 1
                    </a>
                  </li>
                  <li className="footer__link">
                    <a className="footer__hyperlink" href="#">
                      Page 2
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer__policy">
              <ul className="footer__link-container footer__link-container-horizontal">
                <li className="footer__link">
                  <a className="footer__hyperlink" href="#">
                    Disclamer
                  </a>
                </li>
                <li className="footer__link">
                  <a className="footer__hyperlink" href="#">
                    Cookie Policy
                  </a>
                </li>
                <li className="footer__link">
                  <a className="footer__hyperlink" href="#">
                    Privacy
                  </a>
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
