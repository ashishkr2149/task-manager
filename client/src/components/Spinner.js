import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Spinner = ({ size = "64px", color = "text-[#77A6F7]" }) => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 && navigate("/login");
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <div
      className={`flex flex-col gap-[12px] w-full h-screen justify-center items-center`}
    >
      <div className="">
        <p className="text-[#77A6F7] text-3xl font-bold text-center">
          You are not logged in. Please login
        </p>
        <p className="text-center text-base text-gray-700 ">
          Redirecting to Login in {count} second
        </p>
      </div>
      <div
        className={`w-[96px] h-[96px] border-4 border-t-4 border-gray-200 rounded-full animate-spin ${color}`}
        style={{ borderTopColor: "currentColor" }}
      ></div>
    </div>
  );
};

export default Spinner;
