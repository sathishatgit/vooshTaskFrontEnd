import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { UserContext } from "./userContext";
import { ConfigProvider, Layout } from "antd";
import Task from "./pages/Task";
import Navbar from "./components/NavBar";
import Error from "./pages/Error";

const App = () => {
  const { user } = useContext(UserContext);

  console.log(user ? user : "No data");
  return (
    <Router>
      <ConfigProvider>
        <Layout>
          <Navbar />
          {!user ? (
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="*" element={<Error />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Task />} />
              <Route path="*" element={<Error />} />
            </Routes>
          )}
        </Layout>
      </ConfigProvider>
    </Router>
  );
};

export default App;
