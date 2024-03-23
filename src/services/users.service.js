import UserDao from "../dao/user.dao.js";

export default class UsersService {
  static findBy = (query) => {
    return UserDao.findBy(query);
  };

  static updatePartialBy = (query) => {
    return UserDao.updatePartialBy(query);
  };
}
