import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

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

function EditEmployee() {
  const [employeeDetails, setEmployeeDetails] = useState({
    name: "",
    email: "",
    department: "",
    employeeId: "",
    role: "",
    gender: "",
  });

  const clearFields = () => {
    setEmployeeDetails({
      name: "",
      email: "",
      department: "",
      employeeId: "",
      role: "",
      gender: "",
    });
  };

  const handleCheckId = async () => {
    try {
      const response = await fetch(
        `https://attendance-manager-backend.vercel.app/api/v1/admin/search_employee?employeeId=${employeeDetails.employeeId}`,
      );
      const data = await response.json();

      if (data.success) {
        // Update all fields with the received data
        setEmployeeDetails(data.employee);
        notify("Employee found!");
      } else {
        // Handle the case where the employee ID is not found
        notify("Employee not found!");
      }
    } catch (error) {
      notify("Error checking employee ID:", error);
    }
  };
  const handleChange = (field, value) => {
    setEmployeeDetails({
      ...employeeDetails,
      [field]: value,
    });
  };
  useEffect(() => {
    console.log("Updated Employee Details:", employeeDetails);
    console.log(employeeDetails[0]?.name);
  }, [employeeDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Perform the update using the details in employeeDetails state
      const response = await fetch(
        "https://attendance-manager-backend.vercel.app/api/v1/admin/edit_employee",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employeeDetails),
        },
      );

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
    <>
      <div className="mt-20 text-center">
        <span className="text-3xl font-bold text-blue-500">
          Edit Employee Details
        </span>
      </div>
      <div className="flex h-screen items-center justify-center">
        {/* Check ID Form */}
        <form
          action="https://attendance-manager-backend.vercel.app/api/v1/employees/search_employees"
          method="POST"
          id="editEmployeeCheckId"
          className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
        >
          <div className="mb-4">
            <label
              htmlFor="employeeId"
              className="mb-2 block text-sm font-bold text-gray-700"
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
                  employeeId: e.target.value,
                })
              }
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            />
          </div>
          <button
            id="checkID"
            type="button"
            onClick={handleCheckId}
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            Check ID
          </button>
        </form>

        {/* Edit Employee Form */}
        <div>
          <form
            id="editEmployeeForm"
            onSubmit={handleSubmit}
            className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
          >
            <div className="mb-4">
              <label
                htmlFor="editName"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Name:
              </label>
              <input
                id="editName"
                type="text"
                name="name"
                value={employeeDetails[0]?.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="editEmail"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Email:
              </label>
              <input
                id="editEmail"
                type="email"
                name="email"
                value={employeeDetails[0]?.email || ""}
                onChange={(e) =>
                  setEmployeeDetails({
                    ...employeeDetails,
                    email: e.target.value,
                  })
                }
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="editDepartment"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Department:
              </label>
              <input
                id="editDepartment"
                type="text"
                name="department"
                value={employeeDetails[0]?.department || ""}
                onChange={(e) =>
                  setEmployeeDetails({
                    ...employeeDetails,
                    department: e.target.value,
                  })
                }
                readOnly="readonly"
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="editEmployeeId"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                EmployeeID:
              </label>
              <input
                id="editEmployeeId"
                type="text"
                name="editEmployeeId"
                value={employeeDetails[0]?.employeeId || ""}
                readOnly="readonly"
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="editRole"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Role:
              </label>
              <input
                id="editRole"
                type="text"
                name="role"
                value={employeeDetails[0]?.role || ""}
                onChange={(e) =>
                  setEmployeeDetails({
                    ...employeeDetails,
                    role: e.target.value,
                  })
                }
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Gender:
              </label>
              <label className="mr-4">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={employeeDetails[0]?.gender === "male"}
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
                  checked={employeeDetails[0]?.gender === "female"}
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
                  checked={employeeDetails[0]?.gender === "other"}
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
                className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
              >
                Make Changes
              </button>
            </div>
          </form>

          {/* Clear Fields Button */}
          <button
            onClick={clearFields}
            className="focus:shadow-outline mb-4 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 focus:outline-none"
          >
            Clear Fields
          </button>
        </div>
      </div>
    </>
  );
}

export default EditEmployee;
