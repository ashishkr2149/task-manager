import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import userModel from "../models/UserModel.js";
import JWT from "jsonwebtoken";

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const registerController = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    //Validations
    if (!first_name) {
      return res.status(400).send({
        error: "First Name is required",
      });
    }
    if (!last_name) {
      return res.status(400).send({
        error: "Last Name is required",
      });
    }
    if (!email) {
      return res.status(400).send({
        error: "Email is required",
      });
    }
    if (!validateEmail(email)) {
      return res.status(400).send({
        success: false,
        message: "Invalid email format",
      });
    }
    if (!password) {
      return res.status(400).send({
        error: "Password is required",
      });
    }

    //Check for existing User
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "User already exists, Please Login",
      });
    }

    //Hashing the password
    const hashedPassword = await hashPassword(password);

    //Register User
    const user = await new userModel({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error: err,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Validations
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    if (!validateEmail(email)) {
      return res.status(400).send({
        success: false,
        message: "Invalid email format",
      });
    }

    //Check for existing User
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User does not exist, Please Register",
      });
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(401).send({
        success: true,
        message: "Invalid Password",
      });
    }

    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error while login",
      error: err,
    });
  }
};
