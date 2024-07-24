import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const { Title, Text, Link } = Typography;

const SignUp = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    const { password, confirmPassword } = values;
    if (password === confirmPassword) {
      try {
        await axios.post(`${process.env.REACT_APP_API}user/signup`, values);
        message.success("User signed up successfully!");
        setTimeout(() => navigate("/"), 2000);
      } catch (error) {
        console.error("Sign up error:", error);
        message.error("Sign up failed. Please try again.");
      }
    } else {
      message.warning("Passwords do not match");
    }
  };

  return (
    <div className="sign-up-container">
      <Title level={2}>Sign Up</Title>
      <Form
        className="form-size"
        form={form}
        name="signup"
        onFinish={handleFinish}
        layout="vertical"
      >
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input placeholder="Last Name" />
        </Form.Item>
        <Form.Item
          name="emailId"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[{ required: true, message: "Please confirm your password!" }]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Sign Up
          </Button>
        </Form.Item>
        <Text className="align-center">
          Already have an account?{" "}
          <Link onClick={() => navigate("/")}>Sign In</Link>
        </Text>
      </Form>
    </div>
  );
};

export default SignUp;
