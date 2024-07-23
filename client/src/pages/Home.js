import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import Button from "../components/Button";
import axios from "axios";
import TaskCard from "../components/TaskCard";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [sortBy, setSortBy] = useState("relevance"); // Default sorting
  const [search, setSearch] = useState("");
  const taskUrl = `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_TASKS_PREFIX}`;
  const columns = ["To Do", "In Progress", "Done"];

  useEffect(() => {
    const fetchTasks = async () => {
      const result = await axios.get(`${taskUrl}/tasks`);
      setTasks(result.data);
    };
    fetchTasks();
    // eslint-disable-next-line
  }, []);

  // Function to search based on title and description
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase())
  );

  // Function to sort tasks
  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortBy === "relevance") {
      return 0; // No sorting, display as is
    }

    const [field, order] = sortBy.split(":");
    const isAscending = order === "asc";

    if (field === "dueDate") {
      if (!a.dueDate) return 1; // Null dates go to the bottom
      if (!b.dueDate) return -1; // Null dates go to the bottom
    }

    if (a[field] < b[field]) return isAscending ? -1 : 1;
    if (a[field] > b[field]) return isAscending ? 1 : -1;
    return 0;
  });

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData("taskId", task.uId);
  };

  const handleDrop = async (e, column) => {
    const taskId = e.dataTransfer.getData("taskId");
    const task = tasks.find((task) => task.uId === taskId);
    task.column = column;
    await axios.put(`${taskUrl}/task/${taskId}/move`, { targetColumn: column });
    setTasks([...tasks]);
  };

  return (
    <Layout>
      <div className="w-full flex-1 flex flex-col items-center justify-center bg-[#D3E3FC] p-4 ">
        <div className="w-full h-full flex flex-col gap-3">
          <Button
            type="button"
            label="Add Task"
            className="w-[150px] h-10 text-[#FFFFFF] bg-[#77A6F7] hover:bg-[#FFFFFF] hover:text-[#77A6F7] hover:border hover:border-[#77A6F7] rounded-xl"
          />
          <div className="w-full flex flex-col md:h-16 bg-[#FFFFFF] justify-center md:flex-row md:justify-between rounded items-center px-4 py-2">
            <div className="flex w-full gap-6 items-center">
              <div className="text-lg text-gray-500">Search:</div>
              <div className="w-full md:w-80 h-10 flex flex-row ">
                <input
                  type="text"
                  className="w-full border border-[#f3f4f6] focus:border-[#77A6F7] outline-none bg-[#f3f4f6] h-full rounded px-2 py-1 text-gray-500"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-6 items-center float-right">
              <div className="text-lg text-gray-500">Sort:</div>
              <div>
                <select
                  className="border border-[#77A6F7] outline-none bg-[#f3f4f6] h-full rounded px-2 py-1 text-gray-500"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="relevance">Relevance</option>
                  <option value="createdAt:asc">Creation Date (Asc)</option>
                  <option value="createdAt:desc">Creation Date (Desc)</option>
                  <option value="dueDate:asc">Due Date (Asc)</option>
                  <option value="dueDate:desc">Due Date (Desc)</option>
                </select>
              </div>
            </div>
          </div>
          <div className="h-full flex flex-col md:flex-row gap-4 md:justify-between">
            {columns.map((column, index) => (
              <div
                key={index}
                className="p-4 bg-white shadow rounded-lg w-full h-full flex flex-col items-center"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, column)}
              >
                <div className="">
                  <p className="text-[#77A6F7] text-3xl font-bold text-center">
                    {column}
                  </p>
                </div>
                {/* Render sorted tasks */}
                <div className="w-full flex flex-col gap-3 mt-4 ">
                  {sortedTasks
                    .filter((task) => task.column === column) // Filter tasks based on the column
                    .map((task) => (
                      <TaskCard
                        task={task}
                        key={task.uId}
                        handleDragStart={handleDragStart}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
