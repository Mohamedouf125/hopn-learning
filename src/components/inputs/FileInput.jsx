import React, { useState } from "react";
import server from "../../assets/axios/server";
import { useSelector } from "react-redux";
import img from "../../assets/images/gifts/balanceBg.jpg";

function FileInput() {
  const [file, setFile] = useState(null);
  const { user, token } = useSelector((state) => state.user);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (file) {
      // Make the request using FormData
      server
        .post("/update-profile-api", {cv: file, name:"hema2", photo:file, phone: 1010101010, email:"heam2@test.com"}, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          console.log("File uploaded successfully");
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div className="p-4 w-full">
      <form
        onSubmit={handleSubmit}
        className="flex w-full items-center justify-center flex-col gap-5"
      >
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        {file ? (
          <div className="flex gap-5">
            <span>{file.name}</span>
            <span
              onClick={() => {
                setFile(null);
              }}
              className="flex items-center justify-center cursor-pointer rounded-full"
            >
              <i className="fas fa-times"></i>
            </span>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleButtonClick}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Upload CV
          </button>
        )}

        {file && (
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Upload
          </button>
        )}
      </form>
    </div>
  );
}

export default FileInput;
