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
//1. adding a new employee
const newEmployee = async (data) => {
	const options = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data)
	};
	const resource = await fetch(
		"http://localhost:3000/app/v1/admin/create_new_employee",
		options
	)
		.then((response) => {
			if (response.status == 400) {
				alert(
					"Either you have not completed the form or email already exists!"
				);
				location.reload();
			} else if (response.status == 200) {
				alert("User added successfully!");
				location.assign("/");
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

document.querySelector("#newEmployee").addEventListener("submit", (e) => {
	e.preventDefault();
	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value;
	const department = document.getElementById("department").value;
	const role = document.getElementById("role").value;
	const gender = displayGenderValue();

	const data = { name, email, department, role, gender };

	newEmployee(data);
});
