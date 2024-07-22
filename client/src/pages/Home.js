import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import Button from "../components/Button";
import axios from "axios";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const taskUrl = `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_TASKS_PREFIX}`;

  useEffect(() => {
    console.log(taskUrl);
    const fetchTasks = async () => {
      const result = await axios.get(`${taskUrl}/tasks`);
      setTasks(result.data);
      console.log(result.data);
    };
    fetchTasks();
    // eslint-disable-next-line
  }, [sortBy]);

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
                  <option value="createdAt:asc">Creation Date (Asc)</option>
                  <option value="createdAt:desc">Creation Date (Desc)</option>
                  <option value="dueDate:asc">Due Date (Asc)</option>
                  <option value="dueDate:desc">Due Date (Desc)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
