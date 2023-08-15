import React from "react";
import { useLocation } from "react-router-dom";

function Error() {
  const location = useLocation();
  const { message } = location.state;

  return (
    <div>
      <h1>Oops! {message}.</h1>
    </div>
  );
}

export default Error;
