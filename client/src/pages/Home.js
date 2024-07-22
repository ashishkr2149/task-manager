import React from "react";
import Layout from "../components/Layout/Layout";
import { TaskState } from "../TaskContext";

const Home = () => {
  const { auth, setAuth } = TaskState();

  return (
    <Layout>
      <h1>Home</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
};

export default Home;
