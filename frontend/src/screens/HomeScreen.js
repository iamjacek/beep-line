import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../elements/Product";
import Loading from "../elements/Loading";

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(false);
        const { data } = await axios.get(`/api/products`);
        setProducts(data);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <>
      <div>
        {loading ? (
          <Loading />
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div className="home__container">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
