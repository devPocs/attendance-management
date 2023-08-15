import React from "react";
import { useLocation } from "react-router-dom";

function Employee() {
  const location = useLocation();
  const { name } = location.state;

  return (
    <div>
      <h1>Welcome, {name}.</h1>
    </div>
  );
}

export default Employee;
