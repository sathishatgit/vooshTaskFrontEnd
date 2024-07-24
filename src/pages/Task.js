import React, { useContext, useEffect, useState } from "react";
import { TaskContext, UserContext } from "../userContext";
import AddTask from "../components/AddTask";
import ViewAll from "../components/ViewAll";
import axios from "axios";
import { Input, Select } from "antd";
import "../App.css";
import Loader from "../components/Loader";

const { Option } = Select;

const Task = () => {
  const [totalTask, setTotalTask] = useState({});
  const [sort, setSort] = useState("recent");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const { tasks } = useContext(TaskContext);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API}task/all`,
          {
            email: user.emailId,
            sort,
            keyword: search,
          }
        );
        setTotalTask(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [tasks, sort, search, user.emailId]);

  return (
    <div className="task-container">
      <AddTask />
      <div className="task-controls">
        <div className="search-container">
          <h3>Search:</h3>
          <Input
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search"
          />
        </div>
        <div className="sort-by-size">
          <h3>Sort By:</h3>
          <Select
            value={sort}
            onChange={(value) => setSort(value)}
            className="sort-select"
          >
            <Option value="recent">Recent</Option>
            <Option value="previous">Previous</Option>
            <Option value="asc">A to Z</Option>
            <Option value="desc">Z to A</Option>
          </Select>
        </div>
      </div>
      <div className="task-lists">
        {loading ? (
          <Loader />
        ) : (
          <>
            <ViewAll title="TODO" task={totalTask.NotStarted || []} />
            <ViewAll title="In-Progress" task={totalTask.InProgress || []} />
            <ViewAll title="Done" task={totalTask.Done || []} />
          </>
        )}
      </div>
    </div>
  );
};

export default Task;
