import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
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
      "http://localhost:5000/app/v1/employees/search_employee",
      options
    );
    const data = await response.json();
    console.log(data);

    if (data.success === "false") {
      navigate("/error", { state: { message: data.message } });
      window.history.replaceState(null, "", "/");
    } else {
      navigate("/employee", { state: { name: data.name } });
      window.history.replaceState(null, "", "/");
    }
  }

  const isSending = status === "sending";

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
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
            required={true}
            disabled={isSending}
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            placeholder="Enter Employee ID"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            id="checkID"
            disabled={isSending}
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Check ID
          </button>
          {isSending && (
            <div className="ml-4 flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-blue-500 border-r-2 border-b-2 "></div>
              <p className="text-blue-500 ml-2">Checking...</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default Home;
