import React from "react";
import Layout from "../components/Layout/Layout";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/");
  };
  return (
    <Layout>
      <div className="w-full flex-1 flex items-center justify-center">
        <div className="flex flex-col gap-y-3">
          <div className="">
            <p className="text-[#77A6F7] text-3xl font-bold text-center">
              Page Not Found
            </p>
          </div>
          <Button
            type="button"
            label="Go To Home"
            className="w-full h-10 bg-[#77A6F7] text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#77A6F7] hover:border hover:border-[#77A6F7] rounded-full"
            onClick={handleRedirect}
          />
        </div>
      </div>
    </Layout>
  );
};

export default PageNotFound;
