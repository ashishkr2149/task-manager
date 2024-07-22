import React, { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#77A6F7] text-[#ffffff] flex flex-wrap items-center justify-between px-4 py-2 md:px-6 md:py-3">
      <div className="flex items-center">
        <span className="text-xl font-bold px-2">Task Manager</span>
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
        <div className="flex flex-col md:flex-row md:space-x-6 md:mt-0">
          <div className="block py-2 px-2 md:px-4 md:py-1 text-[#ffffff] hover:bg-[#ffffff] hover:text-[#77A6F7] hover:grow-1 rounded md:text-center md:w-[88px]">
            Login
          </div>
          <div className="block py-2 px-2 md:px-4 md:py-1 text-[#ffffff] md:text-[#77A6F7] md:bg-[#ffffff] hover:bg-[#ffffff] hover:text-[#77A6F7] hover:md:none rounded md:w-[88px]">
            Signup
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
