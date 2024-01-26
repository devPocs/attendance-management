import React from "react";
import { Link } from "react-router-dom";

function Admin() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <Link
          to="/admin/create_employee"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Create New Employee
        </Link>
        <Link
          to="/admin/edit_employee"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Edit Employee
        </Link>
      </div>
    </div>
  );
}

export default Admin;
