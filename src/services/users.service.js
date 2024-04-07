import UserDao from "../dao/user.dao.js";

export default class UsersService {


  static isAdmin = "admin";

  static findBy = (query) => {
    return UserDao.findBy(query);
  };

  static updatePartialBy = (id, query) => {
    return UserDao.updatePartialBy(id, query);
  };

  static uploadDocuments = async (req) => {
    const documents = req.files.map((file) => ({
      name: file.originalname,
      reference: `http://127.0.0.1:7071/uploads/${req.params.fileType}/${req.user.id}-${file.originalname}`,
    }));
    await UserDao.updatePartialBy(req.user.id, {
      $push: { documents: { $each: documents } },
    });
  };

  static getUserPremiumOrAdmin(id) {
    const query = {
      _id: id,
      $or: [{ role: "premium" }, { role: "admin" }],
    };

    return UserDao.findBy(query);
  }
}
