import React from "react";
import {Triangle} from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Triangle
        height="80"
        width="80"
        color="rgb(37 99 235)"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default Spinner;
