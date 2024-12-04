import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";
import { check, validationResult } from "express-validator";
import authMiddleware from "../middleware/auth.js";

const router = new Router();

router.get("/registration", (req, res) => {
  console.log("get registration");
});

router.post(
  "/registration",
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
        return res.status(400).json({ message: "Validation has failed" });
      }
      console.log(req.body);
      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res
          .status(400)
          .json({ message: `User with email ${email} aready exists` });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();
      return res.json({ message: "User has been created" });
    } catch (err) {}
  }
);

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
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
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/authenticate", authMiddleware, async (req, res) => {
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
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
});

export default router;
