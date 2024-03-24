import UserDao from "../dao/user.dao.js";

export default class UsersService {
  static findBy = (query) => {
    return UserDao.findBy(query);
  };

  static updatePartialBy = (query) => {
    return UserDao.updatePartialBy(query);
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
}

