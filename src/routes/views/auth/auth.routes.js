import { Router } from "express";

import AuthService from "../../../services/auth.service.js";
import UsersService from "../../../services/users.service.js";
import { cookieOptions } from "../../../utils/cookieOptions.js";

const router = Router();

router.post("/sign-up", async (req, res) => {
  const { body } = req;
  try {
    const user = await AuthService.register(body);
    if (user) {
      return res.redirect("/signUpSuccessfully");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/sign-in", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await UsersService.findBy({ email });
    let token = null;

    if (user) {
      token = await AuthService.login(password, user);
      res.cookie("token", token, cookieOptions);
    } else {
      return res.redirect("/signInFailed");
    }

    if (token) {
      return res.redirect("/me");
    } else {
      return res.redirect("/signInFailed");
    }
  } catch (error) {
    next(error);
  }
});

router.get("/sign-out", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

export default router;
