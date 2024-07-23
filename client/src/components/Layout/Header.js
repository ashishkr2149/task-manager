import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TaskState } from "../../TaskContext";
import AvatarDropdown from "../Avatar";
const Header = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const { auth, setAuth, addToast } = TaskState();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    navigate("/login");
    addToast("Logout successful", "success");
  };

  return (
    <header className="bg-[#77A6F7] text-[#ffffff] flex flex-wrap items-center justify-between px-4 py-2 md:px-6 md:py-3 gap-2">
      <div className="flex items-center">
        <span
          className="text-xl font-bold px-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Task Manager
        </span>
      </div>
      <div className="flex md:hidden content-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            ></path>
          </svg>
        </button>
      </div>
      <nav
        className={`${
          isOpen ? "block" : "hidden"
        } w-full md:flex md:w-auto md:items-center`}
      >
        {auth.user ? (
          <div className="flex flex-col md:flex-row md:space-x-6 md:mt-0">
            <AvatarDropdown handleLogout={handleLogout} />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row md:space-x-6 md:mt-0">
            <div
              className="block py-2 px-2 md:px-4 md:py-1 text-[#ffffff]
          hover:bg-[#ffffff] hover:text-[#77A6F7] hover:grow-1 
          ounded md:text-center rounded md:w-[88px] cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </div>
            <div
              className="block py-2 px-2 md:px-4 md:py-1 text-[#ffffff]
          md:text-[#77A6F7] md:bg-[#ffffff] hover:bg-[#ffffff]
          hover:text-[#77A6F7] hover:md:none rounded md:w-[88px] cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Signup
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
