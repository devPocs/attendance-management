import React, { useState } from "react";
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

const EditEmployee = () => {
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

  const [isSending, setIsSending] = useState(false);

  const handleChange = (field, value) => {
    setEmployeeDetails({
      ...employeeDetails,
      [field]: value,
    });
  };
  const handleCheckId = async () => {
    try {
      const response = await fetch(
        `https://attendance-manager-back-i4so-4u3ylam7c-pokoh-ufuomas-projects.vercel.app/api/v1/admin/search_employee?employeeId=${employeeDetails.employeeId}`,
      );
      const data = await response.json();

      console.log("Fetched Data:", data);

      if (data.success) {
        // Access the first item in the employee array
        const firstEmployee = data.employee[0];

        setEmployeeDetails((prevDetails) => ({
          ...prevDetails,
          ...firstEmployee,
        }));

        notify("Employee found!");
      } else {
        notify("Employee not found!");
      }
    } catch (error) {
      notify("Error checking employee ID:" + error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSending(true);

      let response = await fetch(
        "https://attendance-manager-back-i4so-4u3ylam7c-pokoh-ufuomas-projects.vercel.app/api/v1/admin/edit_employee",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employeeDetails),
        },
      );

      response = await response.json();

      if (response.message === "edited!") {
        setIsSending(false);

        notify("Employee details updated successfully");
      } else {
        setIsSending(false);

        notify("Failed to update employee details!");
      }
    } catch (error) {
      setIsSending(false);

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
        <form
          action="https://attendance-manager-back-i4so-4u3ylam7c-pokoh-ufuomas-projects.vercel.app/api/v1/employees/search_employees"
          method="POST"
          id="editEmployeeCheckId"
          className="mb-4 flex flex-col rounded bg-white px-8 pb-8 pt-6 shadow-md"
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
                  ...employeeDetails,
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
            className="focus:shadow-outline m-auto w-40 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            Check ID
          </button>
        </form>

        <div className="flex flex-col">
          <form
            id="editEmployeeForm"
            onSubmit={handleSubmit}
            className="mb-4 ml-10 mt-5 flex h-[42rem] w-96 flex-col rounded bg-white px-8 pb-9 pt-6 shadow-md"
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
                value={employeeDetails.name || ""}
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
                value={employeeDetails.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
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
                value={employeeDetails.department || ""}
                readOnly
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
                value={employeeDetails.employeeId || ""}
                readOnly
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
                value={employeeDetails.role || ""}
                onChange={(e) => handleChange("role", e.target.value)}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Gender:
              </label>
              <label className="mr-4">
                <RadioButton
                  name="gender"
                  value="male"
                  checked={employeeDetails.gender === "male"}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  label="Male"
                />
              </label>
              <label className="mr-4">
                <RadioButton
                  name="gender"
                  value="female"
                  checked={employeeDetails.gender === "female"}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  label="Female"
                />
              </label>
              <label>
                <RadioButton
                  name="gender"
                  value="other"
                  checked={employeeDetails.gender === "other"}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  label="Other"
                />
              </label>
            </div>

            <div className="m-auto mt-5 flex items-center">
              <button
                type="submit"
                className="focus:shadow-outline mr-1 w-40 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
              >
                Make Changes
              </button>
              <button
                onClick={clearFields}
                className="focus:shadow-outline ml-1 w-40 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 focus:outline-none"
              >
                Clear Fields
              </button>
            </div>
            {isSending && (
              <div className="m-auto mt-5 flex h-10 w-40 items-center justify-center p-2">
                <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-r-2 border-t-2 border-blue-500 "></div>
                <p className="ml-2 text-blue-500">Processing...</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

const RadioButton = ({ name, value, checked, onChange, label }) => (
  <label className="mr-4">
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
    />
    {label}
  </label>
);

export default EditEmployee;
