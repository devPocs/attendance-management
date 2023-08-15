import React from "react";

function CreateEmployee() {
  return (
    <>
      <form id="newEmployee">
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" name="name" />
        <br />
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" name="email" />
        <br />
        <label htmlFor="department">Department:</label>
        <input id="department" type="text" name="department" />
        <br />
        <label htmlFor="role">Role:</label>
        <input id="role" type="text" name="role" />
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
        <button id="createEmployee" type="submit">
          Create
        </button>
      </form>
    </>
  );
}

export default CreateEmployee;
