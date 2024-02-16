import React, { useState, useEffect, useCallback, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Webcam from "react-webcam";

function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
}

const notify = (message) => {
  toast.info(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000,
    hideProgressBar: true,
    closeButton: false,
    style: {
      background: "white",
      color: "blue",
      borderRadius: "8px",
    },
  });
};

function CreateEmployee() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [label, setLabel] = useState("");
  const [departments, setDepartments] = useState([]);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);

  const webcamRef = useRef(null);

  const [status, setStatus] = useState("typing");

  const capture = useCallback(
    (imageKey) => {
      const imageSrc = webcamRef.current.getScreenshot();
      if (!image1) {
        setImage1(imageSrc);
        notify("Image 1 captured!");
      } else if (!image2) {
        setImage2(imageSrc);
        notify("Image 2 captured!");
      } else if (!image3) {
        setImage3(imageSrc);
        notify("Image 3 captured!");
      }
    },
    [webcamRef, image1, image2, image3],
  );

  const fetchDepartments = useCallback(async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/departments/all_departments",
      );
      const data = await response.json();

      setDepartments(data.departments);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  }, []);

  useEffect(() => {
    if (departments.length === 0) {
      fetchDepartments();
    }
  }, [departments, fetchDepartments]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("department", department);
      formData.append("role", role);
      formData.append("gender", gender);
      formData.append("label", label);

      setStatus("sending");

      if (!image1 || !image2 || !image3) {
        notify("Please capture all three images before submitting.");
        setStatus("typing");
        return;
      }

      formData.append("image1", dataURItoBlob(image1), "image1.jpeg");
      formData.append("image2", dataURItoBlob(image2), "image2.jpeg");
      formData.append("image3", dataURItoBlob(image3), "image3.jpeg");

      const response = await fetch(
        "http://localhost:8080/api/v1/admin/create_new_employee",
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
        setLabel("");
        setImage1(null);
        setImage2(null);
        setImage3(null);
      } else {
        notify("Error creating employee:", response.error);
      }
    } catch (error) {
      notify("Error during form submission:", error);
      console.log(error);
    }
  };

  const isSending = status === "sending";

  return (
    <div className="container mx-auto p-4">
      <div className="mt-20 text-center">
        <span className="text-3xl font-bold text-blue-500">
          Add New Employee
        </span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <form
          encType="multipart/form-data"
          id="newEmployee"
          onSubmit={handleSubmit}
          className="w-full max-w-screen-md rounded bg-white px-8 pb-8 pt-6 shadow-md"
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
            <label
              htmlFor="label"
              className="mb-2 block text-sm font-bold text-gray-700"
            >
              Label:
            </label>
            <input
              id="label"
              type="text"
              name="label"
              required={true}
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Enter Label (same as name)"
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

          <div className="mb-4">
            <label
              htmlFor="webcam1"
              className="mb-2 block text-sm font-bold text-gray-700"
            >
              Capture Image 1:
            </label>
            <div className="relative">
              <Webcam
                id="webcam1"
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="webcam"
              />
              <button
                onClick={() => capture("image1")}
                className="capture-button"
                type="button"
              >
                Capture Image 1
              </button>
              {image1 && (
                <div className="captured-image">
                  <img src={image1} alt="Captured 1" />
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="webcam2"
              className="mb-2 block text-sm font-bold text-gray-700"
            >
              Capture Image 2:
            </label>
            <div className="relative">
              <Webcam
                id="webcam2"
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="webcam"
              />
              <button
                onClick={() => capture("image2")}
                className="capture-button"
                type="button"
              >
                Capture Image 2
              </button>
              {image2 && (
                <div className="captured-image">
                  <img src={image2} alt="Captured 2" />
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="webcam3"
              className="mb-2 block text-sm font-bold text-gray-700"
            >
              Capture Image 3:
            </label>
            <div className="relative">
              <Webcam
                id="webcam3"
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="webcam"
              />
              <button
                onClick={() => capture("image3")}
                className="capture-button"
                type="button"
              >
                Capture Image 3
              </button>
              {image3 && (
                <div className="captured-image">
                  <img src={image3} alt="Captured 3" />
                </div>
              )}
            </div>
          </div>

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
      </div>
    </div>
  );
}

export default CreateEmployee;
