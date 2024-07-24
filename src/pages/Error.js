import React from "react";
import { useNavigate } from "react-router-dom";
import { Result, Button } from "antd";

const Error = () => {
  const navigate = useNavigate();
  return (
    <Result
      style={{ marginTop: "40px" }}
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Back Home
        </Button>
      }
    />
  );
};

export default Error;
