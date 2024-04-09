import CartDao from "../dao/cart.dao.js";

export default class CartsService {
  static create() {
    const payload = { products: [] };
    return CartDao.create(payload);
  }

  static getById(id) {
    const query = { _id: id };
    return CartDao.getById(query);
  }

  static addItemToCart = async (cid, pid, quantity) => {
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
}
