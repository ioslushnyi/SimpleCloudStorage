import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { randomBytes } from "node:crypto";
import jwt from "jsonwebtoken";
import config from "config";
import { check, validationResult } from "express-validator";
import authMiddleware from "../middleware/auth.js";
import { sendVerificationEmail } from "../factories/emailFactory.js";

const router = new Router();

router.post(
  "/register",
  [
    check("email", "Incorrect email").isEmail(),
    check(
      "password",
      "Password should be longer that 3 and shorter than 12 symbols"
    ).isLength({ min: 3, max: 12 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "VALIDATION_FAILED" });
      }
      //console.log(req.body);
      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res
          .status(400)
          .json({ message: `User with email ${email} aready exists` });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const emailVerificationString = randomBytes(10).toString("hex");
      const newUser = new User({
        email,
        password: hashedPassword,
        emailVerificationString,
      });
      await newUser.save();
      sendVerificationEmail(
        email,
        `http://127.0.0.1:5000/api/auth/verifyEmail?token=${emailVerificationString}`
      );
      return res.status(201).json({ message: "USER_CREATED" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "SERVER_ERROR" });
    }
  }
);

router.get("/verifyEmail", async (req, res) => {
  try {
    const { token: emailVerificationString } = req.query;
    const user = await User.findOne({ emailVerificationString });
    if (!user) {
      return res.status(400).json({ message: "USER_NOT_FOUND" });
    }
    if (emailVerificationString === user.emailVerificationString) {
      user.emailVerificationString = "";
      user.isVerified = true;
      await user.save();
      //return res.status(201).json({ message: "Email successfully verified" });
      res.redirect("http://localhost:5173/login?emailVerified=true");
    } else {
      //return res
      //  .status(400)
      //  .send({ message: "Token does not match a user record" });
      res.redirect("http://localhost:5173/login?emailVerified=false");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "SERVER_ERROR" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "USER_NOT_FOUND" });
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "INVALID_PASSWORD" });
    }
    if (!user.isVerified) {
      return res.status(400).json({ message: "USER_NOT_VERIFIED" });
    }
    const token = jwt.sign({ id: user.id }, config.get("secretKey"), {
      expiresIn: "30m",
    });
    return res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        diskSpace: user.diskSpace,
        usedSpace: user.usedSpace,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "SERVER_ERROR" });
  }
});

router.get("/authFromToken", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    const token = jwt.sign({ id: user.id }, config.get("secretKey"), {
      expiresIn: "30m",
    });
    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        diskSpace: user.diskSpace,
        usedSpace: user.usedSpace,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.log(err);
    res.send({ message: "SERVER_ERROR" });
  }
});

export default router;
