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

  const [isSending, setIsSending] = useState(false);

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

  const handleSignIn = async () => {
    const data = { employeeId: employeeId };
    try {
      let response = await fetch(
        "http://localhost:8080/api/v1/employees/signIn",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      response = await response.json();

      if (response.status === "fail") {
        notify(response.message);
      }
    } catch (error) {}
  };

  const handleCapture = async () => {
    try {
      setIsSending(true);
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
        notify("Error! Picture not clear enough or no match! ");
        setIsSending(false);
      }
      if (response.statusCode === 200) {
        let label = response.label;

        notify(`matched: ${label}`);
        await handleSignIn();
        setIsSending(false);
      }
    } catch (error) {
      setIsSending(false);
      notify(`Technical fault: ${error}`);
    }
  };

  return (
    <div className="relative flex">
      <div className="mb-10 ml-4 text-center">
        <h1 className="mt-3 text-2xl text-blue-700">
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
      </div>
      <div className="fixed left-2/3 top-56 flex items-center">
        {isSending && (
          <div className=" ml-4 flex items-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-r-2 border-t-2 border-blue-500 "></div>
            <p className="ml-2 text-2xl text-blue-500">Processing...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Employee;
