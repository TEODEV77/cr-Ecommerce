import CartDao from "../dao/cart.dao.js";
import ProductsService from "./products.service.js";

export default class CartsService {
  static create() {
    const payload = { products: [] };
    return CartDao.create(payload);
  }

  static getById(id) {
    const query = { _id: id };
    return CartDao.getById(query);
  }

  static populate = async (cid) => {
    const cart = await CartDao.populate({ _id: cid });
    if (!cart) throw new Error("Cart not found");
    return cart.products.toObject();
  };

  static addItemToCart = async (cid, pid, quantity, owner) => {
    const shoppingCart = await this.getById(cid);

    if (!shoppingCart) throw new Error("Cart not found");

    const productOwner = await ProductsService.getBy({ _id: pid });

    if (productOwner.owner === owner)
      throw new Error("You can't add your own product to the cart");

    const cart = await CartDao.productIsIn(cid, pid);
    if (cart) {
      const query = { _id: cid, "products.product": pid };
      const operation = { $inc: { "products.$.quantity": quantity } };
      return await this.updateQuantity(query, operation);
    }

    const query = { _id: cid };
    const operation = {
      $push: { products: { product: pid, quantity: quantity } },
    };

    return await CartDao.update(query, operation);
  };

  static updateQuantity = async (query, operation) => {
    return await CartDao.update(query, operation);
  };

  static deleteItemToCart = async (cid, pid) => {
    const query = { _id: cid, "products.product": pid };
    const operation = { $pull: { products: { product: pid } } };
    return await CartDao.update(query, operation);
  };

  static deleteItemsToCart = async (cid) => {
    const query = { _id: cid };
    const operation = { $set: { products: [] } };
    return await CartDao.update(query, operation);
  };

  static removeCart = async (cid) => {
    const cart = await this.getById(cid);
    if (!cart) throw new Error("Cart not found");
    return await CartDao.remove(query);
  };
}
