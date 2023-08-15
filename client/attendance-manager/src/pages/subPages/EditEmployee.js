import React from "react";

function EditEmployee() {
  return (
    <>
      <form action="http://localhost:3000/check_employee" method="GET">
        <label htmlFor="employeeId">Enter Employee Id: </label>
        <input id="employeeId" type="text" name="employeeId" />
        <button id="checkID" type="submit">
          Check ID
        </button>
      </form>
      <form id="editEmployee">
        <label htmlFor="name">Name:</label>
        <input id="editName" type="text" name="name" defaultValue="" />
        <br />
        <label htmlFor="email">Email:</label>
        <input id="editEmail" type="email" name="email" defaultValue="" />
        <br />
        <label htmlFor="department">Department:</label>
        <input
          id="editDepartment"
          type="text"
          name=""
          defaultValue=""
          readOnly="readonly"
        />
        <br />
        <label htmlFor="employeeID">EmployeeID:</label>
        <input
          id="editEmployeeId"
          type="text"
          name="editEmployeeId"
          defaultValue=""
          readOnly="readonly"
        />
        <br />
        <label htmlFor="role">Role:</label>
        <input id="editRole" type="text" name="role" defaultValue="" />
        <br />
        <label>Gender:</label>
        <label>
          <input type="radio" name="gender" defaultValue="male" />
          Male
        </label>
        <label>
          <input type="radio" name="gender" defaultValue="female" />
          Female
        </label>
        <label>
          <input type="radio" name="gender" defaultValue="other" />
          Other
        </label>
        <br />
        <button type="submit">Make Changes </button>
      </form>
    </>
  );
}

export default EditEmployee;
