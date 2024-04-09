import { Router } from "express";
import CartController from "../../controllers/carts.controller.js";

const router = Router();

router.post("/:cid/products/:pid", async (req, res, next) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const quantity = req.body.quantity;
  try {
    await CartController.addItemToCart(cid, pid, quantity);
    res.json({ message: "Product added to cart" });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    await CartController.create();
    res.status(201).json({ message: "Cart created" });
  } catch (error) {
    next(error);
  }
});

router.delete("/:cid/products/:pid", async (req, res, next) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  try {
    await CartController.removeItem(cid,pid);
    res.status(201).json({ message: "Cart item deleted" });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const cart = await CartController.getById(id);
    res.json(cart);
  } catch (error) {
    next(error);
  }
});

export default router;
