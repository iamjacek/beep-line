import React from "react";
import Loader from "@bit/joshk.react-spinners-css.facebook";

export default function Loading() {
  return (
    <div className="loading">
      <Loader color="#805ad5" size={50} />
    </div>
  );
}
