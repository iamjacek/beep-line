import React, { useEffect } from "react";
import Product from "../elements/Product";
import Loading from "../elements/Loading";
import MessageBox from "../elements/MessageBox";
import { listProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <div className="home__container">
          {" "}
          <Loading />
        </div>
      ) : error ? (
        <MessageBox variant="error">{error}</MessageBox>
      ) : (
        <div className="home__container">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
