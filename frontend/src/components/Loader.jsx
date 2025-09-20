import React from "react";
import { FourSquare } from "react-loading-indicators";

const Loader = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <FourSquare color="#ffa726" size="medium" text="" textColor="" />
    </div>
  );
};

export default Loader;
