import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

const BasicLayout = () => {
  const { storageItem, setStorageItem } = useAuthContext();
  const navigate = useNavigate();
  return (
    <div className="layout-main center-content">
      <div className="header-section">
        <div className="pro-name">
          <h2> Student Record</h2>
        </div>
        <div className="nav-bar">
          <nav>
            <ul>
              <li>
                <Button variant="outlined" onClick={() => navigate("")}>
                  {" "}
                  Add Student
                </Button>
              </li>
              <li>
                <Button variant="outlined" onClick={() => navigate("/list")}>
                  Records
                </Button>
              </li>
              <li>
                <Button
                  variant="outlined"
                  onClick={() => {
                    localStorage.setItem("authentication", "");
                    setStorageItem(false);
                  }}
                >
                  Logout
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default BasicLayout;
