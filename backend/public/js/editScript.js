function displayGenderValue() {
	var ele = document.getElementsByName("gender");

	for (i = 0; i < ele.length; i++) {
		if (ele[i].checked) {
			const gender = ele[i].value;
			return gender;
		}
	}
	return;
}

//1. editing employee details
const editEmployee = async (data) => {
	const options = {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data)
	};
	const resource = await fetch(
		"http://localhost:3000/app/v1/admin/edit_employee",
		options
	)
		.then((response) => {
			if (response.status == 400) {
				alert("You have not completed the form. Please try again!");
				location.reload();
			} else if (response.status == 200) {
				alert("employee details edited successfully!");
				location.reload();
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

document.querySelector("#editEmployee").addEventListener("submit", (e) => {
	e.preventDefault();
	const employeeId = document.getElementById("editEmployeeId").value;
	const name = document.getElementById("editName").value;
	const email = document.getElementById("editEmail").value;
	const department = document.getElementById("editDepartment").value;
	const role = document.getElementById("editRole").value;
	const gender = displayGenderValue();

	const data = { employeeId, name, email, department, role, gender };

	editEmployee(data);
});
