import React from "react";
import { useLocation } from "react-router-dom";

function Error() {
  const location = useLocation();
  const { message } = location.state;

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className="text-6xl font-bold text-red-500 mb-4">Oops!</h1>
        <p className="text-2xl capitalize text-gray-400 border-none">
          {message}!
        </p>
      </div>
    </div>
  );
}

export default Error;
