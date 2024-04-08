import { Router } from "express";
import CartController from "../../controllers/carts.controller.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    await CartController.create();
    res.status(201).json({ message: "Cart created" });
  } catch (error) {
    next(error);
  }
});

export default router;