import React, { useContext, useEffect, useState } from "react";
import { Layout, Button, message, Popover } from "antd";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";
import { CalendarOutlined } from "@ant-design/icons";
import axios from "axios";
import "../App.css";

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = () => {
    setOpen(true);
  };

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        if (localStorage.getItem("mongoToken")) {
          const mongoRequest = await axios.post(
            `${process.env.REACT_APP_API}user/auth`,
            {
              auth: localStorage.getItem("mongoToken"),
            }
          );
          setUser(mongoRequest.data.userAuth);
          navigate("/");
        } else if (localStorage.getItem("googleToken")) {
          const response = await axios.get(
            "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("googleToken")}`,
              },
            }
          );
          setUser({ emailId: response.data.email, name: response.data.name });
          message.success("Login Successfully");
          navigate("/");
        }
      } catch (error) {
        console.error("Error during authentication request:", error);
        message.error("Authentication failed. Please try again.");
      }
    };

    fetchAuth();
  }, [navigate, setUser]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("googleToken");
    localStorage.removeItem("mongoToken");
    navigate("/");
  };

  const content = (
    <div>
      <p>Name: {user ? user.name : ""}</p>
      <p>Email: {user ? user.emailId : ""}</p>
      <a onClick={hide}>Close</a>
    </div>
  );
  return (
    <Header className="header">
      <div className="logo-container">
        <CalendarOutlined className="calendar-icon" />
        <h2>Task Application</h2>
      </div>
      <div className="nav-buttons">
        {user ? (
          <>
            <Popover
              className="user-name"
              open={open}
              onOpenChange={handleOpenChange}
              content={content}
              title="User Details"
            >
              <Button type="primary">Profile</Button>
            </Popover>
            <Button className="logout-button" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button className="login-button" onClick={() => navigate("/")}>
              Login
            </Button>
            <Button
              className="signup-button"
              type="primary"
              onClick={() => navigate("/signup")}
            >
              Signup
            </Button>
          </>
        )}
      </div>
    </Header>
  );
};

export default Navbar;
