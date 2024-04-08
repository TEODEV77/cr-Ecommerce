import cartModel from "./models/cart.model.js";

export default class cartDao {
  static create(payload) {
    return cartModel.create(payload);
  }

  static getById(query) {
    return cartModel.findOne(query);
  }

  static addItemToCart = async (query, operation) => {
    return await cartModel.findOneAndUpdate(query, operation);
  };

  static updateQuantity = async (query, operation) => {
    return await cartModel.findOneAndUpdate(query, operation);
  };

  static productIsIn (cid,pid) {
    return cartModel.findOne({ _id: cid, "products.product": pid });
  }
}
