import { useState, useEffect } from "react";
import { TaskState } from "../../TaskContext.js";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner.js";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const { auth, setAuth } = TaskState();

  useEffect(() => {
    const authCheck = async () => {
      const baseUrl = `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_AUTHENTICATION_PREFIX}`;
      const response = await axios.get(`${baseUrl}/user-auth`);
      if (response.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
