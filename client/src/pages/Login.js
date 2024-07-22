import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import Textbox from "../components/Textbox";
import Button from "../components/Button";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitHandler = async (data) => {
    const loginUrl = `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_AUTHENTICATION_PREFIX}`;
    console.log(data);
    console.log(loginUrl);
    const response = await axios.post(`${loginUrl}/login`, {
      email: data.email,
      password: data.password,
    });
    reset();
    console.log(response);
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
                label="Submit"
                className="w-full h-10 border border-[#77A6F7] text-[#77A6F7] hover:bg-[#77A6F7] hover:text-white rounded-full"
              />
              <div>
                <span className="text-sm text-gray-500">
                  Don't have an account? {"\u00A0"}
                </span>

                <span className="text-sm text-gray-500 hover:text-[#77A6F7] hover:underline cursor-pointer">
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
