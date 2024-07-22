import React from "react";
import Layout from "../components/Layout/Layout";
import { TaskState } from "../TaskContext";

const Home = () => {
  const { auth, setAuth } = TaskState();

  return (
    <Layout>
      <div className="w-full flex-1 flex flex-col items-center justify-center">
        <div>Home</div>
      </div>
    </Layout>
  );
};

export default Home;
