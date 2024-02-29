import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function GetEmployeeTimes() {
  const [employeeId, setEmployeeId] = useState("");
  const [status, setStatus] = useState("typing");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const form_data = { employeeId: employeeId };

    setStatus("sending");

    const options = {
      method: "POST",
      body: JSON.stringify(form_data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(
      //"https://attendance-manager-backend.vercel.app/api/v1/admin/employee_times",
      "https://attendance-manager-back-i4so-4u3ylam7c-pokoh-ufuomas-projects.vercel.app/api/v1/admin/employee_times",
      options,
    );
    const data = await response.json();

    if (data.success === false) {
      navigate("/error", { state: { message: data.message } });
      window.history.replaceState(null, "", "/error");
    } else {
      const name = data.message[1].name;
      const timeIns = data.message[0].timeIn;
      const employeeId = data.message[0].employeeId;

      navigate("/time_in_page", {
        state: { timeIns: timeIns, name: name, employeeId: employeeId },
      });
      window.history.replaceState(null, "", "/time_in_page");
    }
  }

  const isSending = status === "sending";

  return (
    <>
      <div className="mt-20 text-center">
        <span className="text-3xl font-bold text-blue-500">
          Get Employee TimeIn Data
        </span>
      </div>
      <div className="flex h-screen items-center justify-center">
        <form
          onSubmit={handleSubmit}
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
              required={true}
              disabled={isSending}
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="Enter Employee ID"
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              id="checkID"
              disabled={isSending}
              type="submit"
              className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            >
              Check ID
            </button>
            {isSending && (
              <div className="ml-4 flex items-center">
                <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-r-2 border-t-2 border-blue-500 "></div>
                <p className="ml-2 text-blue-500">Checking...</p>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default GetEmployeeTimes;
