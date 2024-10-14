import React from "react";
import Loading from '../../../assets/10001.gif'

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "350px",
      }}
    >
      <img src={Loading} alt="" />
    </div>
  );
};

export default Loader;
