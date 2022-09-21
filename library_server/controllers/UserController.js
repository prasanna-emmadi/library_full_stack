import UserModel from "../models/user.js";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const addUser = async (req, res) => {
  console.log("addUser");
  const savedUser = req.body;
  const checkUsername = await UserModel.findOne({
    username: savedUser.username,
  });

  if (checkUsername === null) {
    const saltRounds = 10;
    const passwdhash = await bcrypt.hash(savedUser.password, saltRounds);
    savedUser.password = passwdhash;

    await UserModel.create(savedUser);
    res
      .status(200)
      .send(
        `New user: ${savedUser.firstName} ${savedUser.lastName} was saved to database`
      );
  } else {
    res.status(400).send("error");
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("username or password missing");
  }
  try {
    const userData = await UserModel.findOne({ username: username });
    const valid = await bcrypt.compare(password, userData.password);

    if (valid) {
      const token = jsonwebtoken.sign(
        { type: "session", username: username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).send({ token });
    } else {
      res.status(401).send("forbidden, wrong password");
    }
  } catch (e) {
    res.status(400).send("Something went wrong in authentication");
  }
};

export const refreshToken = (req, res) => {
  res.status(200).json({
    token: jsonwebtoken.sign(
      { type: "session", username: req.user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    ),
  });
};

export const modifyUser = async (req, res) => {
  const update = { ...req.body };
  try {
    const userUpdate = await UserModel.findOneAndUpdate(
      { username: req.user.username },
      update
    );
    res.status(200).send("User data was modified successfully");
  } catch (e) {
    console.log("updated user   : ", e);
    res.status(400).json({ message: "bad request" });
  }
};

export const getUser = async (req, res) => {
  try {
    const selectedUser = await UserModel.findOne({ _id: req.body.id });
    res.status(200).json(selectedUser);
  } catch (e) {
    console.log("selected user: ", e);
    res.status(400).json({ message: "bad request" });
  }
};
