// TaskProvider.js
import React, { createContext, useContext, useState } from "react";
import Toast from "./components/Toaster.js";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info") => {
    setToasts((prevToasts) => [
      ...prevToasts,
      { id: Date.now(), message, type },
    ]);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <TaskContext.Provider value={{ addToast }}>
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
