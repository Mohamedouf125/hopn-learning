import React, { useState } from "react";
import server from "../../assets/axios/server";
import { useDispatch, useSelector } from "react-redux";
import { ar, en } from "../../assets/langs/translation";
import { editUser, rememberEditedUser } from "../../store/slices/user/userSlice";

function FileInput() {
  const [file, setFile] = useState(null);
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch()

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
        .post(
          "/update-profile-api",
          { cv: file },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log("File uploaded successfully");
          dispatch(editUser({ user: res.data.data.user }));
          dispatch(rememberEditedUser({ user: res.data.data.user }));
          setFile(null)
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    } else {
      console.log("No file selected");
    }
  };

  
  // to set lang
  const { lang } = useSelector((state) => state.settings);
  const currentLang = lang == "en" ? en : ar;

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
            {currentLang.save}
          </button>
        )}
      </form>
    </div>
  );
}

export default FileInput;
