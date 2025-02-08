import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";
import { JWT_SECRET } from "../constants.js";
import { User } from "../models/users.schema.js";
import { sendMail } from "../services/mail.service.js";
import { mailVerification } from "../templates/mail/emailVerification.template.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const createUser = async (req, res) => {
  try {
    const { displayname, email, password } = req.body;
    if ([displayname, email, password].some((value) => !value?.trim())) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      displayname,
      email,
      password: hashedPassword,
    });
    const user = await User.findOne({ email }).select("-password");
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "5m",
    });
    await sendMail(email, "Email Verification", "", mailVerification(token));
    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.log(error);
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decodedToken = jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }
      return decoded;
    });
    const user = await User.findOne({ email: decodedToken.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.emailVerified = true;
    await user.save();
    return res
      .status(200)
      .sendFile(path.resolve("src" ,"views", "mailVerified.html"));
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    if (Object.values(req.body).some((value) => !value?.trim())) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ message: "credentials are incorrect" });
    }
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "credentials are incorrect" });
    }
    const loginuser = await User.findOne({ email: req.body.email }).select(
      "-password -_id -__v -createdAt -updatedAt"
    );
    return res
      .status(200)
      .json({ message: "User logged in successfully", loginuser });
  } catch (error) {
    console.log(error);
  }
};

export { createUser, loginUser, verifyEmail };

