import cartModel from "./models/cart.model.js";

export default class cartDao {
  static create(payload) {
    return cartModel.create(payload);
  }

  static getById(query) {
    return cartModel.findOne(query);
  }

  static populate (query) {
    return cartModel.findOne(query).populate("products.product");
  }

  static update(query, operation) {
    return cartModel.findOneAndUpdate(query, operation);
  }

  static productIsIn(cid, pid) {
    return cartModel.findOne({ _id: cid, "products.product": pid });
  }

  static remove(query) {
    return cartModel.findByIdAndDelete(query);
  }
}
