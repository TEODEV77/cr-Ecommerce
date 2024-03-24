import UserDao from "../dao/user.dao.js";

import UserServices from "../services/users.service.js";

export default class UserController {
  static uploadDocuments = async (req) => {
    await UserServices.uploadDocuments(req);
  };
}
