import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import data from "../data";
import Rating from "../elements/Rating";

export default function ProductScreen(props) {
  const { id } = useParams();
  const product = data.products.find((x) => x._id === id);

  if (!product) {
    return <div>Product Not Found</div>;
  }
  return (
    <>
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
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </li>
            <li className="product-screen__list">
              <span className="product-screen__sub-header">Price:</span>
              <p className="product-screen__field">
                <span className="product-screen__price">${product.price}</span>
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
                <span> ${product.price}</span>
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
                    <span class="product-screen__stock--error">Unavaible</span>
                  )}
                </span>
              </li>
            </div>
            <div className="product-screen__row-quality">
              <li className="product-screen__price-list-quality">
                <span>Quantity</span>
              </li>
              <li className="product-screen__quantity">
                <select className="product-screen__select-quantity">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </li>
            </div>
            <li className="product-screen__button">
              <button className="product-screen__btn btn">Add to cart</button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}