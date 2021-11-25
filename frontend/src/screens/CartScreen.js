import React from "react";
import { useParams, useLocation } from "react-router";

export default function CartScreen() {
  const { id } = useParams();
  const { search } = useLocation();
  const qty = search ? Number(search.split("=")[1]) : 1;
  return (
    <div>
      <h1>Cart Screen</h1>
      <p>
        add to cart: id: {id} qty: {qty}
      </p>
    </div>
  );
}
