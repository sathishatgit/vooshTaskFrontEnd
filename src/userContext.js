import React, { createContext, useState } from "react";

export const UserContext = createContext();
export const TaskContext = createContext();
export const LoaderContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState(false);
  const [loader, setLoader] = useState(true);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <LoaderContext.Provider value={{ loader, setLoader }}>
        <TaskContext.Provider value={{ tasks, setTasks }}>
          {children}
        </TaskContext.Provider>
      </LoaderContext.Provider>
    </UserContext.Provider>
  );
};
