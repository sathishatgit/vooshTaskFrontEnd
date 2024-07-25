import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { LoaderContext, UserContext } from "./userContext";
import { ConfigProvider, Layout } from "antd";
import Task from "./pages/Task";
import Navbar from "./components/NavBar";
import Error from "./pages/Error";
import Loader from "./components/Loader";

const App = () => {
  const { user } = useContext(UserContext);
  const { loader } = useContext(LoaderContext);

  console.log(user ? user : "No data");
  return (
    <Router>
      <ConfigProvider>
        <Layout>
          {loader ? (
            <>
              <Navbar /> <Loader />
            </>
          ) : (
            <>
              <Navbar />
              <Routes>
                {!user ? (
                  <>
                    <Route path="/" element={<Login />} />
                    <Route path="/signUp" element={<SignUp />} />
                    <Route path="*" element={<Error />} />
                  </>
                ) : (
                  <>
                    <Route path="/" element={<Task />} />
                    <Route path="*" element={<Error />} />
                  </>
                )}
              </Routes>
            </>
          )}
        </Layout>
      </ConfigProvider>
    </Router>
  );
};

export default App;
