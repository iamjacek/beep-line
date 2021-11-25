import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../elements/Product";
import Loading from "../elements/Loading";
import MessageBox from "../elements/MessageBox";

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/products`);
        setLoading(false);
        setProducts(data);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };
    fetchProducts();
  }, []);
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
