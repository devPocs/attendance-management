import React from "react";
import { Link } from "react-router-dom";

function Admin() {
  return (
    <>
      <ul className="tabs">
        <li>
          <Link to="/admin/create_employee">Create New Employee.</Link>
        </li>
        <li>
          <Link to="/admin/edit_employee">Edit Employee</Link>
        </li>
      </ul>
    </>
  );
}

export default Admin;
