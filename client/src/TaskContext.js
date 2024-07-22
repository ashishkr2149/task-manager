// TaskProvider.js
import React, { createContext, useContext, useEffect, useState } from "react";
import Toast from "./components/Toaster.js";
import axios from "axios";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  const addToast = (message, type = "info") => {
    setToasts((prevToasts) => [
      ...prevToasts,
      { id: Date.now(), message, type },
    ]);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  //Default axios header
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsedData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parsedData.user,
        token: parsedData.token,
      });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <TaskContext.Provider value={{ addToast, auth, setAuth }}>
      {children}
      <div className="fixed bottom-0 left-0 right-0 p-4 flex flex-col items-center space-y-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </TaskContext.Provider>
  );
};

export const TaskState = () => {
  return useContext(TaskContext);
};
