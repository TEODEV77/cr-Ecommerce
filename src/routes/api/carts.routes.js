import { Router } from "express";
import { Authenticate } from "../../config/middleware/passport.mid.js";
import CartController from "../../controllers/carts.controller.js";

const router = Router();



router.post("/:cid/products/:pid", Authenticate('jwt'), async (req, res, next) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const quantity = req.body.quantity;
  const owner = req.user.email;
  try {
    await CartController.addItemToCart(cid, pid, quantity, owner);
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

router.delete("/:cid/products", async (req, res, next) => {
  const cid = req.params.cid;
  try {
    await CartController.removeItems(cid);
    res.status(201).json({ message: "Cart items deleted" });
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
