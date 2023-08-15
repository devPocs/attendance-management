import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory

function Home() {
  const [employeeId, setEmployeeId] = useState("");
  const navigate = useNavigate(); // Get the history object

  async function handleSubmit(e) {
    e.preventDefault();

    const form_data = { employeeId: employeeId };

    const options = {
      method: "POST",
      body: JSON.stringify(form_data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(
      "http://localhost:5000/init_employee",
      options
    );
    const data = await response.json();

    if (data.success === "false") {
      navigate("/error", { state: { message: data.message } });
      window.history.replaceState(null, "", "/");
    } else {
      // Navigate to the Employee component and pass the name as a prop
      navigate("/employee", { state: { name: data.name } });
      // Replace current history state to prevent back navigation
      window.history.replaceState(null, "", "/");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="employeeId">Enter Employee Id: </label>
        <input
          id="employeeId"
          type="text"
          name="employeeId"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          placeholder="Enter Employee ID"
        />
        <button id="checkID" type="submit">
          Check ID
        </button>
      </form>
    </div>
  );
}

export default Home;
