import express from "express";
import { addUser, getUser } from "../models/authModal.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { singAccessJWT } from "../utils/jwt.js";
const authRouter = express.Router();
authRouter.post("/signup", async (req, res) => {
  try {
    req.body.password = hashPassword(req.body.password);

    const user = await addUser(req.body);

    user?._id
      ? res.json({
          status: "success",
          message: "registration success",
        })
      : res.json({
          status: "error",
          message: "registration failed, please try again later",
        });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});
authRouter.post("/login", async (req, res) => {
  try {
    //get email and password
    const { email, password } = req.body;

    //get user by emali
    const user = await getUser(email);
    console.log(user);

    if (user?._id) {
      const isPasswordCorrect = comparePassword(password, user.password);
      console.log(isPasswordCorrect);

      if (isPasswordCorrect) {
        //create token

        const JWTtoken = singAccessJWT({ email: email });
        //todo

        res.json({
          status: "success",
          message: "login success",
          user,
          JWTtoken,
        });
      }
    }
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

export default authRouter;
