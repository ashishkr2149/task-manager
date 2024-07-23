import React, { useState, useRef } from "react";
import { TaskState } from "../TaskContext";

const AvatarDropdown = ({ handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);
  const { auth } = TaskState();

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col relative w-full md:w-fit gap-2">
      <button
        onClick={togglePopover}
        className="px-4 py-2 bg-blue-500 text-white h-10 w-10 rounded-full"
      >
        {auth?.user?.first_name.charAt(0).toUpperCase()}
      </button>
      <div
        className="block md:hidden py-2 px-2 md:px-4 md:py-1 text-[#FFFFFF] md:text-[#77A6F7] md:bg-[#ffffff] hover:bg-[#ffffff] hover:text-[#77A6F7] hover:md:none rounded md:w-[88px] cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </div>

      {isOpen && (
        <div
          ref={popoverRef}
          className="hidden md:block absolute z-10 mt-3 bg-white border border-gray-300 rounded-md shadow-lg"
          style={{ top: "100%", left: "50%", transform: "translateX(-50%)" }}
        >
          <div className="h-[12px] w-[12px] rounded-tl-sm bg-white absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
          <div
            className="hidden md:block py-2 px-2 md:px-4 md:py-1 text-black md:text-[#77A6F7] md:bg-[#ffffff] hover:bg-[#ffffff] hover:text-[#77A6F7] hover:md:none rounded md:w-[88px] cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
