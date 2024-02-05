import React from "react";
import { Link } from "react-router-dom";

function Admin() {
  return (
    <>
      <div className="mt-20 text-center">
        <span className="text-3xl font-bold text-blue-500">Admin</span>
      </div>
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Link
            to="/admin/create_employee"
            className="mr-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Create New Employee
          </Link>
          <Link
            to="/admin/edit_employee"
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Edit Employee
          </Link>
          <Link
            to="/admin/get_employee_times"
            className="ml-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Get Employee TimeIns
          </Link>
        </div>
      </div>
    </>
  );
}

export default Admin;
