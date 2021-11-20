import React from "react";
import Product from "../elements/Product";
import data from "../data";

export default function HomeScreen() {
  return (
    <>
      <div className="home__container">
        {data.products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}
