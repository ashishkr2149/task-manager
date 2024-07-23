// TaskProvider.js
import React, { createContext, useContext, useEffect, useState } from "react";
import Toast from "./components/Toaster.js";
import axios from "axios";
import TaskModal from "./components/TaskModal.js";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [modalType, setModalType] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
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

  const openModal = (type, task = null) => {
    setModalType(type);
    setSelectedTask(task);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedTask(null);
  };

  const taskUrl = `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_TASKS_PREFIX}`;

  const handleAddTask = async (data) => {
    try {
      if (data.dueDate !== "") data.dueDate = data.dueDate.toISOString();
      else data.dueDate = null;
      const result = await axios.post(`${taskUrl}/add-tasks`, data);
      addToast(result.data.message, "success");
    } catch (err) {
      console.log("Error while creating task", err);
      addToast("Error while creating task", "error");
    }
  };

  const handleUpdateTask = async (data) => {
    try {
      if (data.dueDate !== "") data.dueDate = data.dueDate.toISOString();
      console.log(data);
      const result = await axios.put(
        `${taskUrl}/task/${selectedTask.uId}/update`,
        data
      );
      addToast("Task updated successfully", "success");
    } catch (err) {
      console.log("Error while updating task", err);
      addToast("Error while updating task", "error");
    }
  };

  const handleSubmit = (formData) => {
    // Handle add or edit task logic here
    console.log("Form data:", formData);
    if (modalType === "add") {
      handleAddTask(formData);
    }
    if (modalType === "edit") {
      handleUpdateTask(formData);
    }
    closeModal();
  };

  return (
    <TaskContext.Provider
      value={{ addToast, auth, setAuth, openModal, closeModal }}
    >
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
      {modalType && (
        <TaskModal
          type={modalType}
          task={selectedTask}
          onClose={closeModal}
          onSubmit={handleSubmit}
        />
      )}
    </TaskContext.Provider>
  );
};

export const TaskState = () => {
  return useContext(TaskContext);
};
