//login the admin
const login = async (email, password) => {
	try {
		const result = await axios({
			method: "POST",
			url: "http://localhost:3000/app/v1/admin/login",
			data: { email, password }
		});
		if ((result.data.status = "success")) {
			alert("logged in successfully");
			window.setTimeout(() => {
				location.assign("/admin");
			}, 1500);
		}
	} catch (err) {
		console.log(err.response.data);

		document.write(err.response.data);
	}
};

document.querySelector("#login").addEventListener("submit", (e) => {
	e.preventDefault();
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	login(email, password);
});
