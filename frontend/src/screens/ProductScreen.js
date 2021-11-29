import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { detailsProduct } from "../actions/productActions";
import Loading from "../elements/Loading";
import MessageBox from "../elements/MessageBox";
import Rating from "../elements/Rating";

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(detailsProduct(id));
  }, [id, dispatch]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };
  return (
    <>
      {loading ? (
        // render as home if data not ready
        <div className="home__container">
          {" "}
          <Loading />
        </div>
      ) : error ? (
        <div className="home__container">
          <MessageBox variant="error">{error}</MessageBox>
        </div>
      ) : (
        <div className="product-screen__container">
          <div className="product-screen__back-to-results">
            <Link to="/">Back to results</Link>
          </div>
          <div className="product-screen__img-box">
            <img
              src={product.image}
              alt={product.name}
              className="product-screen__img"
            />
          </div>
          <div className="product-screen__info">
            <ul className="product-screen__info-container">
              <li className="product-screen__head">
                <h1 className="product-screen__title">{product.name}</h1>
              </li>
              <li className="product-screen__rating">
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
              </li>
              <li className="product-screen__list">
                <span className="product-screen__sub-header">Price:</span>
                <p className="product-screen__field">
                  <span className="product-screen__price">
                    ${product.price.toFixed(2)}
                  </span>
                </p>
              </li>
              <li className="product-screen__list">
                <span className="product-screen__sub-header">Brand:</span>
                <p className="product-screen__field">{product.brand}</p>
              </li>

              <li className="product-screen__list">
                <span className="product-screen__sub-header">Description:</span>
                <p className="product-screen__field">{product.description}</p>
              </li>
              <li className="product-screen__list">
                {product.keywords.length >= 0 && (
                  <div>
                    <span className="product-screen__features-box">
                      Features:
                    </span>
                    <ul className="product-screen__field">
                      {product.keywords.map((x) => (
                        <li key={x} className="product-screen__feature">
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </div>
          <div className="product-screen__add-to-cart">
            <ul className="product-screen__cart-box">
              <div className="product-screen__row">
                <li className="product-screen__price-list">
                  <span>Price:</span>
                </li>
                <li className="product-screen__price-list">
                  <span> ${product.price.toFixed(2)}</span>
                </li>
              </div>
              <div className="product-screen__row">
                <li className="product-screen__price-list">Status:</li>
                <li className="product-screen__price-list">
                  <span>
                    {product.countInStock > 0 ? (
                      <span className="product-screen__stock--success">
                        In Stock ({product.countInStock})
                      </span>
                    ) : (
                      <span class="product-screen__stock--error">
                        Unavaible
                      </span>
                    )}
                  </span>
                </li>
              </div>

              {product.countInStock > 0 && (
                <>
                  <div className="product-screen__row-quantity">
                    <li className="product-screen__price-list-quantity">
                      <span>Quantity</span>
                    </li>
                    <li className="product-screen__quantity">
                      <select
                        className="product-screen__select-quantity"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </li>
                  </div>
                  <li className="product-screen__button">
                    <button
                      className="product-screen__btn btn"
                      onClick={addToCartHandler}
                    >
                      Add to cart
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
