// Toast.js
import React, { useEffect } from "react";

const Toast = ({ id, message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Toast will disappear after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  // Define styles based on the toast type
  const getToastStyle = () => {
    switch (type) {
      case "success":
        return "bg-green-500 text-white"; // Green for success
      case "error":
        return "bg-red-500 text-white"; // Red for errors
      case "info":
        return "bg-blue-500 text-white"; // Blue for info
      default:
        return "bg-gray-500 text-white"; // Default color
    }
  };

  return (
    <div
      className={`px-4 py-2 rounded shadow-lg ${getToastStyle()} flex items-center justify-between`}
      role="alert"
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 bg-transparent border-0 text-white focus:outline-none"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;
