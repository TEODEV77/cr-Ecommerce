import cartModel from "./models/cart.model.js";

export default class cartDao {
  static create(payload) {
    return cartModel.create(payload);
  }

  static getById(query) {
    return cartModel.findOne(query);
  }

  static update(query, operation) {
    return cartModel.findOneAndUpdate(query, operation);
  }

  static productIsIn(cid, pid) {
    return cartModel.findOne({ _id: cid, "products.product": pid });
  }
}
