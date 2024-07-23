import React from "react";

const TaskCard = ({ task, handleDragStart }) => {
  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };
  const getDueDateText = () => {
    if (!task.dueDate) return "No due date";

    const dueDate = new Date(task.dueDate);
    const currentDate = new Date();
    const timeDiff = dueDate - currentDate;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff <= 0) {
      return "Due today";
    } else if (daysDiff <= 1) {
      return "Due in 1 day";
    } else {
      return `Due in ${daysDiff} days`;
    }
  };

  const getDueDateColor = () => {
    if (!task.dueDate) return "text-[#77A6F7]";

    const dueDate = new Date(task.dueDate);
    const currentDate = new Date();
    const timeDiff = dueDate - currentDate;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff <= 7) {
      return "text-red-500";
    } else if (daysDiff <= 15) {
      return "text-orange-500";
    } else {
      return "text-green-500";
    }
  };

  return (
    <div
      draggable
      className=" p-4 bg-[#f3f4f6] shadow rounded-lg flex flex-col gap-2"
      onDragStart={(e) => handleDragStart(e, task)}
    >
      <div>
        <p className="text-2xl font-[500]">{task.title}</p>
      </div>
      <div className="h-24">
        <p className="h-full text-lg font-[300]">{task.description}</p>
      </div>
      <div>
        <p className={`${getDueDateColor()} text-md`}>{getDueDateText()}</p>
      </div>
      <div>
        <p className="text-gray-500">
          Created At: {formatDate(task.createdAt)}
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
