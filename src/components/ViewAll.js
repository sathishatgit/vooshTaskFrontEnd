import React, { useContext, useState } from "react";
import {
  Card,
  Button,
  List,
  notification,
  Modal,
  Form,
  Select,
  Input,
} from "antd";
import axios from "axios";
import { TaskContext } from "../userContext";
import "../App.css";

const { Option } = Select;

const ViewAll = ({ title, task }) => {
  const { setTasks } = useContext(TaskContext);
  const [form] = Form.useForm();
  const [modalData, setModalData] = useState({});
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API}task/delete/${id}`);
      notification.success({
        message: "Task Deleted Successfully",
        description: "The task has been deleted.",
      });
      setTasks((prevTasks) => !prevTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
      notification.error({
        message: "Task Deletion Failed",
        description: "Please try again.",
      });
    }
  };

  const fetchTaskData = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}task/view/${id}`
      );
      return data;
    } catch (error) {
      console.error("Error fetching task data:", error);
    }
  };

  const viewTask = async (id) => {
    setModalData(await fetchTaskData(id));
    setViewModal(true);
  };

  const editTask = async (id) => {
    const taskData = await fetchTaskData(id);
    setModalData(taskData);
    form.setFieldsValue(taskData);
    setEditModal(true);
  };

  const handleSubmit = async (values) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API}task/update/${modalData._id}`,
        values
      );
      notification.success({
        message: "Task Updated Successfully",
        description: "The task has been updated.",
      });
      setTasks((prevTasks) => !prevTasks);
      setEditModal(false);
    } catch (error) {
      console.error("Error updating task:", error);
      notification.error({
        message: "Task Update Failed",
        description: "Please try again.",
      });
    }
  };

  const truncateDescription = (description, maxLength) => {
    return description.length > maxLength
      ? description.slice(0, maxLength) + "..."
      : description;
  };

  return (
    <div className="view-all-container">
      <Modal
        title="View Task"
        visible={viewModal}
        onCancel={() => setViewModal(false)}
        footer={
          <Button type="primary" onClick={() => setViewModal(false)}>
            Close
          </Button>
        }
      >
        <h3>{modalData.title}</h3>
        <p>{modalData.description}</p>
        <p>Created at: {new Date(modalData.createdAt).toLocaleString()}</p>
      </Modal>

      <Modal
        title="Edit Task"
        visible={editModal}
        onCancel={() => setEditModal(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
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
      <h2 className="view-all-title">{title}</h2>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={task}
        renderItem={(taskItem) => (
          <List.Item>
            <Card className="task-card">
              <h3>{taskItem.title}</h3>
              <p>{truncateDescription(taskItem.description, 50)}</p>
              <p>Created at: {new Date(taskItem.createdAt).toLocaleString()}</p>
              <Button
                onClick={() => deleteTask(taskItem._id)}
                type="primary"
                danger
              >
                Delete
              </Button>
              <Button
                onClick={() => editTask(taskItem._id)}
                className="edit-button"
              >
                Edit
              </Button>
              <Button
                onClick={() => viewTask(taskItem._id)}
                type="primary"
                className="view-details-button"
              >
                View Details
              </Button>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ViewAll;
