import { Router } from "express";

import AuthService from "../../../services/auth.service.js";
import UsersService from "../../../services/users.service.js";
import { cookieOptions } from "../../../utils/cookieOptions.js";

const router = Router();

router.post("/sign-up", async (req, res) => {
  const { body } = req;
  try {
    const user = await AuthService.register(body);
    if(user){
        res.redirect('/sign-in');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  
});

router.post("/sign-in", async (req, res, next) => {

  const { email, password } = req.body;
  try {
    const user = await UsersService.findBy({email: email});
    let token;
    if(user){
      token = await AuthService.login(password, user);
      res.cookie("token", token, cookieOptions);
    }
    if(token != 0 ) {
      res.redirect('/me');
    }
  } catch (error) {
    next(error)
  }
  
});

export default router;
