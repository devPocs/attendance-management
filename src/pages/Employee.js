import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import Webcam from "react-webcam";

function Employee() {
  const location = useLocation();
  const { name } = location.state;

  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const signIn = async () => {
    try {
      const response = await fetch();
    } catch (error) {}
  };
  const captureImage = async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    // Send the captured image to the backend
    try {
      const response = await fetch("http://localhost:5000/compare_images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ capturedImage: imageSrc }),
      });

      const data = await response.json();

      // Handle the response from the server, e.g., show a message based on the comparison result
      if (data.isMatch) {
        alert("Image matched!");
      } else {
        alert("Image did not match!");
      }
    } catch (error) {
      console.error("Error sending captured image to server:", error);
    }

    setCapturedImage(imageSrc);
  };

  return (
    <div>
      <h1 className="text-2xl text-blue-700">Welcome, {name}!</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="mt-4"
      />
      <button>Sign In</button>
      <button
        onClick={captureImage}
        className="mt-2 bg-blue-500 p-2 text-white"
      >
        Capture Image
      </button>
      {capturedImage && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Captured Image:</h2>
          <img src={capturedImage} alt="Captured" className="mt-2" />
          {/* Add logic here to compare capturedImage with Cloudinary image */}
        </div>
      )}
    </div>
  );
}

export default Employee;
