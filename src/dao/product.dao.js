import productModel from "./models/product.model.js";

export default class productDao {
  static create(payload) {
    return productModel.create(payload);
  }

  static getBy(query) {
    return productModel.findOne(query);
  }

  static async updatePartialBy(id, query) {
    return productModel.findByIdAndUpdate(id, query);
  }

  static async deleteBy(id) {
    return productModel.findByIdAndDelete(id);
  }
}
