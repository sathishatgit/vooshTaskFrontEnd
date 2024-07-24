import React, { useContext, useState } from "react";
import { Button, Modal, Form, Select, Input, notification } from "antd";
import axios from "axios";
import { TaskContext, UserContext } from "../userContext";
import "../App.css";

const { Option } = Select;

const AddTask = () => {
  const [open, setOpen] = useState(false);
  const { setTasks } = useContext(TaskContext);
  const { user } = useContext(UserContext);
  const [form] = Form.useForm();

  const showModal = () => setOpen(true);

  const handleOk = async (values) => {
    const updatedValues = { ...values, emailId: user.emailId };
    try {
      await axios.post(
        `${process.env.REACT_APP_API}task/create`,
        updatedValues
      );
      notification.success({
        message: "Task Created Successfully",
        description: "The new task has been created and saved.",
      });
      setTasks((prev) => !prev); // Toggle tasks to refresh
      setOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Error creating task:", error);
      notification.error({
        message: "Task Creation Failed",
        description: "Please try again.",
      });
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button className="add-task-button" type="primary" onClick={showModal}>
        Add Task
      </Button>
      <Modal
        title="Add New Task"
        visible={open}
        onCancel={handleCancel}
        footer={null}
        className="add-task-modal"
      >
        <Form form={form} onFinish={handleOk} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select the status!" }]}
          >
            <Select>
              <Option value="Not-Started">Not Started</Option>
              <Option value="In-Progress">In Progress</Option>
              <Option value="Done">Done</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddTask;
