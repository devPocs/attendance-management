import React, { useState, useEffect, useCallback, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Webcam from "react-webcam";

function CreateEmployee() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [departments, setDepartments] = useState([]);
  const [image, setImage] = useState(null);

  const webcamRef = useRef(null);

  const [status, setStatus] = useState("typing");

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

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

  const fetchDepartments = useCallback(async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/app/v1/departments/all_departments",
      );
      const data = await response.json();

      setDepartments(data.departments);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  }, []);

  useEffect(() => {
    // Fetch departments only if it's empty
    if (departments.length === 0) {
      fetchDepartments();
    }
  }, []); // Include 'departments' and 'fetchDepartments' in the dependency array

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("department", department);
      formData.append("role", role);
      formData.append("gender", gender);

      setStatus("sending");

      // If a picture is captured, append it to the form data
      if (image) {
        const base64Image = image.split(",")[1];
        const blob = await fetch(`data:image/jpeg;base64,${base64Image}`).then(
          (res) => res.blob(),
        );
        formData.append("image", blob, "employee_picture.jpeg");
      }

      const response = await fetch(
        "http://localhost:5000/app/v1/admin/create_new_employee",
        {
          method: "POST",
          body: formData,
        },
      );

      if (response.ok) {
        notify("Employee added successfully!");
        setStatus("typing");
        setName("");
        setEmail("");
        setDepartment("");
        setRole("");
        setGender("");
        setImage(null);
      } else {
        notify("Error creating employee:", response.error);
      }
    } catch (error) {
      notify("Error during form submission:", error);
    }
  };

  const isSending = status === "sending";

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        encType="multipart/form-data"
        id="newEmployee"
        onSubmit={handleSubmit}
        className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Name:
          </label>
          <input
            id="name"
            type="text"
            name="name"
            required={true}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Email:
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="department"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Department:
          </label>
          <select
            id="department"
            name="department"
            required={true}
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept.department}>
                {dept.department}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="role"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Role:
          </label>
          <input
            id="role"
            type="text"
            name="role"
            required={true}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Enter Role"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Gender:
          </label>
          <div>
            <label className="mr-6 inline-flex items-center">
              <input
                type="radio"
                name="gender"
                required={true}
                value="male"
                onChange={() => setGender("male")}
              />
              Male
            </label>
            <label className="mr-6 inline-flex items-center">
              <input
                type="radio"
                name="gender"
                required={true}
                value="female"
                onChange={() => setGender("female")}
              />
              Female
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                required={true}
                value="other"
                onChange={() => setGender("other")}
              />
              Other
            </label>
          </div>
        </div>
        <input
          type="hidden"
          id="image"
          name="image" // Ensure this matches the field expected by Multer
          value={image ? image.split(",")[1] : ""}
        />
        <div className="flex items-center justify-between">
          <button
            id="createEmployee"
            disabled={isSending}
            type="submit"
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            Create
          </button>
          {isSending && (
            <div className="ml-4 flex items-center">
              <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-r-2 border-t-2 border-blue-500 "></div>
              <p className="ml-2 text-blue-500">Please Wait...</p>
            </div>
          )}
        </div>
      </form>
      <div className="mb-4">
        <label
          htmlFor="webcam"
          className="mb-2 block text-sm font-bold text-gray-700"
        >
          Activate Webcam:
        </label>
        <div className="relative">
          <Webcam
            id="webcam"
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="webcam"
          />
          <button onClick={capture} className="capture-button" type="button">
            Capture Picture
          </button>
          {image && (
            <div className="captured-image">
              <img src={image} alt="Captured" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateEmployee;
