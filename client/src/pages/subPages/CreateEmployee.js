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
        "http://localhost:5000/app/v1/departments/all_departments"
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

      // If a picture is captured, append it to the form data
      if (image) {
        const base64Image = image.split(",")[1];
        const blob = await fetch(`data:image/jpeg;base64,${base64Image}`).then(
          (res) => res.blob()
        );
        formData.append("image", blob, "employee_picture.jpeg");
      }
      console.log(formData);
      // Replace this with an actual API endpoint for creating employees
      const response = await fetch(
        "http://localhost:5000/app/v1/admin/create_new_employee",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        notify("Employee added successfully!");
        setName("");
        setEmail("");
        setDepartment("");
        setRole("");
        setGender("");
        setImage(null);
      } else {
        notify("Error creating employee:", response.statusText);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        encType="multipart/form-data"
        id="newEmployee"
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name:
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email:
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="department"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Department:
          </label>
          <select
            id="department"
            name="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Role:
          </label>
          <input
            id="role"
            type="text"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Enter Role"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Gender:
          </label>
          <div>
            <label className="inline-flex items-center mr-6">
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={() => setGender("male")}
              />
              Male
            </label>
            <label className="inline-flex items-center mr-6">
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={() => setGender("female")}
              />
              Female
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
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
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create
          </button>
        </div>
      </form>
      <div className="mb-4">
        <label
          htmlFor="webcam"
          className="block text-gray-700 text-sm font-bold mb-2"
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
