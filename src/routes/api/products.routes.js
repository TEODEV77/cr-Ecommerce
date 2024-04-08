import { Router } from "express";
import { Authenticate } from "../../config/middleware/passport.mid.js";

import ProductController from "../../controllers/product.controller.js";

const router = Router();

router.post("/", Authenticate("jwt"), async (req, res, next) => {
  const { body } = req;
  const user = req.user;

  try {
    const product = await ProductController.create(body, user.id);
    res.status(201).json({ message: product });
  } catch (error) {
    next(error);
  }
});


router.patch("/:id", Authenticate("jwt"), async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  const user = req.user;

  try {
    await ProductController.update(id ,body, user.id);
    res.status(201).json({ message: "Product has been updated" });
  } catch (error) {
    next(error); 
  }
});

router.delete("/:id", Authenticate("jwt"), async (req, res, next) => {
  const { id } = req.params;
  const user = req.user;

  try {
    await ProductController.remove(id , user.id);
    res.status(201).json({ message: "Product has been deleted" });
  } catch (error) {
    next(error); 
  }
});




export default router;