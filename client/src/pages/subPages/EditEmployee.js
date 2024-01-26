import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function EditEmployee() {
  const [employeeDetails, setEmployeeDetails] = useState({
    name: "",
    email: "",
    department: "",
    employeeId: "",
    role: "",
    gender: "",
  });

  const notify = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      hideProgressBar: true,
      closeButton: false,
      style: {
        background: "white",
        color: "blue",
        borderRadius: "8px",
      },
    });
  };

  const handleCheckId = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/app/v1/admin/search_employee?employeeId=${employeeDetails.employeeId}`
      );
      const data = await response.json();

      if (data.success) {
        setEmployeeDetails(data.employee); // Update all fields with the received data
        console.log(employeeDetails.name);
        notify("Employee found!");
      } else {
        // Handle the case where the employee ID is not found
        notify("Employee not found!");
      }
    } catch (error) {
      notify("Error checking employee ID:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Perform the update using the details in employeeDetails state
      const response = await fetch("http://localhost:5000/update_employee", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeDetails),
      });

      const data = await response.json();

      if (data.success) {
        // Handle success
        console.log("Employee details updated successfully");
      } else {
        // Handle failure
        console.error("Failed to update employee details");
      }
    } catch (error) {
      console.error("Error updating employee details:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {/* Check ID Form */}
      <form
        action="http://localhost:5000/check_employee"
        method="POST"
        id="editEmployeeCheckId"
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="employeeId"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Enter Employee Id:
          </label>
          <input
            id="employeeId"
            type="text"
            name="employeeId"
            value={employeeDetails.employeeId || ""}
            onChange={(e) =>
              setEmployeeDetails({
                ...employeeDetails,
                employeeId: e.target.value,
              })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          id="checkID"
          type="button"
          onClick={handleCheckId}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Check ID
        </button>
      </form>

      {/* Edit Employee Form */}
      <form
        id="editEmployeeForm"
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="editName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name:
          </label>
          <input
            id="editName"
            type="text"
            name="name"
            value={employeeDetails.name || ""}
            onChange={(e) =>
              setEmployeeDetails({
                ...employeeDetails,
                name: e.target.value,
              })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="editEmail"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email:
          </label>
          <input
            id="editEmail"
            type="email"
            name="email"
            value={employeeDetails.email || ""}
            onChange={(e) =>
              setEmployeeDetails({
                ...employeeDetails,
                email: e.target.value,
              })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="editDepartment"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Department:
          </label>
          <input
            id="editDepartment"
            type="text"
            name="department"
            value={employeeDetails.department || ""}
            onChange={(e) =>
              setEmployeeDetails({
                ...employeeDetails,
                department: e.target.value,
              })
            }
            readOnly="readonly"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="editEmployeeId"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            EmployeeID:
          </label>
          <input
            id="editEmployeeId"
            type="text"
            name="editEmployeeId"
            value={employeeDetails.employeeId || ""}
            readOnly="readonly"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="editRole"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Role:
          </label>
          <input
            id="editRole"
            type="text"
            name="role"
            value={employeeDetails.role || ""}
            onChange={(e) =>
              setEmployeeDetails({
                ...employeeDetails,
                role: e.target.value,
              })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Gender:
          </label>
          <label className="mr-4">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={employeeDetails.gender === "male"}
              onChange={(e) =>
                setEmployeeDetails({
                  ...employeeDetails,
                  gender: e.target.value,
                })
              }
            />
            Male
          </label>
          <label className="mr-4">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={employeeDetails.gender === "female"}
              onChange={(e) =>
                setEmployeeDetails({
                  ...employeeDetails,
                  gender: e.target.value,
                })
              }
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="other"
              checked={employeeDetails.gender === "other"}
              onChange={(e) =>
                setEmployeeDetails({
                  ...employeeDetails,
                  gender: e.target.value,
                })
              }
            />
            Other
          </label>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Make Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditEmployee;
