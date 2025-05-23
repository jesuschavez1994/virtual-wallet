import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-wallet-purple"></div>
    </div>
  );
};

export default Spinner;