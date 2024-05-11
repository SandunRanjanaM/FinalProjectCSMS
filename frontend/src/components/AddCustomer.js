import React, { useState } from "react";
import axios from "axios";
import "./AddCustomer.css";
import Navbar from "./Navbar";

export default function AddCustomer() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("Customer");
  const [drivingExperience, setDrivingExperience] = useState("");
  const [licenseYear, setLicenseYear] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleProfileImageChange = (event) => {
    setProfileImage(event.target.files[0]);
  };

  function sendData(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    formData.append("type", type);
    formData.append("address", address);
    formData.append("password", password);
    formData.append("drivingExperience", drivingExperience);
    formData.append("licenseYear", licenseYear);
    formData.append("profileImage", profileImage);

    axios
      .post("http://localhost:8070/Customer/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("Customer Added");
      })
      .catch((err) => {
        alert(err);
      });

    console.log("Form submitted");
    alert("Form submitted");
  }

  return (
    <div>
      <Navbar />
      <div className="center-container">
        <form onSubmit={sendData} className="form-container">
          <div>
            <label htmlFor="nameInput">Name</label>
            <input
              type="text"
              id="nameInput"
              className="input-field"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="ageInput">Age</label>
            <input
              type="number"
              id="ageInput"
              className="input-field"
              placeholder="Enter age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="emailInput">Email Address</label>
            <input
              type="email"
              id="emailInput"
              className="input-field"
              placeholder="Enter email"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="passwordInput">Password</label>
            <input
              type="password"
              id="passwordInput"
              className="input-field"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="typeSelect">Type</label>
            <select
              id="typeSelect"
              value={type}
              onChange={handleTypeChange}
              className="input-field"
            >
              <option value="Customer">Customer</option>
              <option value="Driver">Driver</option>
            </select>
          </div>
          {type === "Driver" && (
            <div>
              <div>
                <label htmlFor="drivingExperienceInput">Driving Experience</label>
                <textarea
                  id="drivingExperienceInput"
                  className="input-field"
                  placeholder="Type your driving experience"
                  value={drivingExperience}
                  onChange={(e) => setDrivingExperience(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="licenseYearInput">Year of License</label>
                <input
                  type="number"
                  id="licenseYearInput"
                  className="input-field"
                  placeholder="Enter license year"
                  value={licenseYear}
                  onChange={(e) => setLicenseYear(e.target.value)}
                />
              </div>
            </div>
          )}
          <div>
            <label htmlFor="profileImageInput">Profile Image</label>
            <input
              type="file"
              id="profileImageInput"
              className="input-field"
              onChange={handleProfileImageChange}
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
