import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { TaskState } from "../TaskContext.js";

export const Login = () => {
  const navigate = useNavigate();
  const { addToast, auth, setAuth } = TaskState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (auth?.user) {
      navigate("/");
    }
  });

  const submitHandler = async (data) => {
    try {
      const loginUrl = `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_AUTHENTICATION_PREFIX}`;
      const response = await axios.post(`${loginUrl}/login`, {
        email: data.email,
        password: data.password,
      });
      if (response && response.data) {
        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.token,
        });
        addToast(response.data.message, "success");
        localStorage.setItem("auth", JSON.stringify(response.data));
        navigate("/");
      } else {
        addToast("Something went wrong", "error");
      }
    } catch (error) {
      console.log(error);
      addToast(error.response.data.message, "error");
    }
    reset();
  };

  return (
    <Layout>
      <div className="w-full flex-1 flex items-center justify-center">
        <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="form-container border border-[#77A6F7] rounded-[10px] w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 py-5"
          >
            <div className="">
              <p className="text-[#77A6F7] text-3xl font-bold text-center">
                Login!
              </p>
            </div>

            <div className="flex flex-col gap-y-3">
              <Textbox
                placeholder="email@example.com"
                type="email"
                name="email"
                label="Email Address"
                className="w-full rounded-full"
                register={register("email", {
                  required: "Email Address is required!",
                })}
                error={errors.email ? errors.email.message : ""}
              />
              <Textbox
                placeholder="Your password"
                type="password"
                name="password"
                label="Password"
                className="w-full rounded-full"
                register={register("password", {
                  required: "Password is required!",
                })}
                error={errors.password ? errors.password.message : ""}
              />

              <span className="text-sm text-gray-500 hover:text-[#77A6F7] hover:underline cursor-pointer">
                Forget Password?
              </span>

              <Button
                type="submit"
                label="Login"
                className="w-full h-10 border border-[#77A6F7] text-[#77A6F7] hover:bg-[#77A6F7] hover:text-white rounded-full"
              />
              <div>
                <span className="text-sm text-gray-500">
                  Don't have an account? {"\u00A0"}
                </span>

                <span
                  className="text-sm text-gray-500 hover:text-[#77A6F7] hover:underline cursor-pointer"
                  onClick={() => navigate("/signup")}
                >
                  Sign up
                </span>
                <Button
                  type="button"
                  label="Login with Google"
                  className="w-full h-10 bg-[#77A6F7] text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#77A6F7] hover:border hover:border-[#77A6F7] rounded-full"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
