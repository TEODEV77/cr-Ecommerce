import userModel from "./models/user.model.js";

export default class UserDao {
  static create(payload) {
    return userModel.create(payload);
  }

  static getAll() {
    return userModel.find();
  }

  static findBy(query) {
    return userModel.findOne(query);
  }

  static async updatePartialBy (id,query) {
    return userModel.findByIdAndUpdate(id,query);
  }

  static async deleteBy (query) {
    return userModel.deleteOne(query);
  }

  static getUserPremiumOrAdmin(id) {
    return userModel.findOne({
      _id: id,
      $or: [{ role: "premium" }, { role: "admin" }],
    });
  }
}
