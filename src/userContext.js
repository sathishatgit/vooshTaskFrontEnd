import React, { createContext, useState } from "react";

export const UserContext = createContext();
export const TaskContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <TaskContext.Provider value={{ tasks, setTasks }}>
        {children}
      </TaskContext.Provider>
    </UserContext.Provider>
  );
};
