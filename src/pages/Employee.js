import React, { useState, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
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

function Employee() {
  const location = useLocation();
  const { name, employeeId } = location.state;

  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

  const [imageCompared, setImageCompared] = useState(false);

  const capture = useCallback(
    (imageKey) => {
      const imageSrc = webcamRef.current.getScreenshot();
      if (!image) {
        setImage(imageSrc);
        notify("Image captured!");
      }
    },
    [webcamRef, image],
  );

  const handleCapture = async () => {
    try {
      const formData = new FormData();
      if (!image) {
        notify("Please capture image.");

        return;
      }
      formData.append("employeeId", employeeId);
      formData.append("image", dataURItoBlob(image), "image.jpeg");

      let response = await fetch(
        "http://localhost:8080/api/v1/employees/compare_image",
        {
          method: "POST",
          body: formData,
        },
      );
      response = await response.json();
      if (response.statusCode === 400) {
        console.log(response.statusCode);
        notify("Error! Picture not clear enough or no match! ");
      }
      if (response.statusCode === 200) {
        console.log(response);
        setImageCompared(true);
        notify("matched!");
      }
    } catch (error) {
      notify("Technical fault:", error);
    }
  };

  function handleSignIn() {}

  return (
    <div>
      <h1 className="text-2xl text-blue-700">
        Welcome, {name}. EmployeeID: {employeeId}
      </h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="mt-4"
      />
      <button
        onClick={() => capture("image")}
        className="mt-2 bg-blue-500 p-2 text-white"
      >
        Capture Image
      </button>
      {image && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Captured Image:</h2>
          <img src={image} alt="Captured" className="mt-2" />
        </div>
      )}
      {image && (
        <button
          onClick={() => {
            handleCapture();
          }}
          className="mt-2 bg-blue-500 p-2 text-white"
        >
          Compare
        </button>
      )}

      {imageCompared && (
        <button
          onClick={() => {
            handleSignIn();
          }}
          className="mt-2 bg-blue-500 p-2 text-white"
        >
          Sign In
        </button>
      )}
    </div>
  );
}

export default Employee;
