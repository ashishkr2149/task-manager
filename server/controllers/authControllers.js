import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/UserModel.js";

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
    if (!password) {
      return res.status(400).send({
        error: "Password is required",
      });
    }

    //Check for existing User
    const existingUser = await userModel.findOne({ email });
    console.log(existingUser);
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
      message: "User registered successfullly",
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
