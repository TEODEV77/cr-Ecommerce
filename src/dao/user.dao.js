import userModel from "./models/user.model.js";

export default class UserDao {
  static create(payload) {
    return userModel.create(payload);
  }

  static findBy(query) {
    return userModel.findOne(query);
  }

  static async updatePartialBy (id,query) {
    return userModel.findByIdAndUpdate(id,query);
  }
}
