import React, { useContext } from "react";
import { Form, Input, Button, Typography, message, notification } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { GoogleOutlined } from "@ant-design/icons";
import { UserContext } from "../userContext";
import "../App.css";

const { Title, Text, Link } = Typography;

const clientId =
  "20776665666-77q1fhj26qj4g34585lgfmlk215n1uc2.apps.googleusercontent.com";

const SignIn = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const onSuccess = async (credentialResponse) => {
    console.log("Login successful:", credentialResponse);
    const accessToken = credentialResponse.access_token;
    localStorage.setItem("googleToken", accessToken);
    try {
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("User data:", response.data);

      message.success("Login Successful");
      setUser({ emailId: response.data.email, name: response.data.name });
      navigate("/");
    } catch (error) {
      console.error("Google login error:", error);
      notification.error({
        message: "Google sign-in failed",
        description: "Please try again.",
      });
    }
  };

  const onError = (error) => {
    console.error("Google login error:", error);
    notification.error({
      message: "Google sign-in failed",
      description: "Please try again.",
    });
  };

  const login = useGoogleLogin({
    onSuccess,
    onError,
    clientId,
  });

  const userLogin = async (values) => {
    try {
      const { emailId, password } = values;
      const response = await axios.post(
        `${process.env.REACT_APP_API}user/signin`,
        { emailId, password }
      );
      message.success("Login Successful");
      setUser(response.data.userTokenData);
      localStorage.setItem("mongoToken", response.data.authToken);
      navigate("/");

      console.log(response.data);
    } catch (error) {
      console.error("Sign-in error:", error);
      notification.error({
        message: "Sign-in failed",
        description: "Please try again.",
      });
    }
  };

  return (
    <div className="sign-in-container">
      <Title level={2}>Login</Title>
      <Form
        className="form-size"
        form={form}
        name="signin"
        onFinish={userLogin}
        layout="vertical"
      >
        <Form.Item
          name="emailId"
          className="form-item"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          className="form-item"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
        <Text>
          Don't have an account?{" "}
          <Link onClick={() => navigate("/signup")}>Sign Up</Link>
        </Text>
        <Form.Item className="google-login-button">
          <Button
            type="primary"
            onClick={login}
            icon={<GoogleOutlined />}
            block
          >
            Login with Google
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const Login = () => (
  <GoogleOAuthProvider clientId={clientId}>
    <SignIn />
  </GoogleOAuthProvider>
);

export default Login;
