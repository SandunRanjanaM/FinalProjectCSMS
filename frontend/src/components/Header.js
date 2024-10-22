import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; 

function Header() {
  return (
    <div className="nav-container">
      <ul className="nav nav-pills">
      <li className="nav-item">
          <Link to="/" className="nav-link">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link to="/home" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/add">Add Package</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/view">View Form</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/select" aria-disabled="true">Package Counts</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/uploads" aria-disabled="true">Receipts</a>
        </li>
      </ul>
    </div>
  );
}

export default Header;
