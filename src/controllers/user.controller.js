import UserDao from "../dao/user.dao.js";

export default class UserController {

    static uploadDocuments = async (id, documents) => {
        await UserDao.updatePartialBy(id, { $set: { documents: documents } });
    }
}