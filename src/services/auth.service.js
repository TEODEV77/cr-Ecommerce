import UserDao from "../dao/user.dao.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import JWT from "../utils/jwt.js";


export default class AuthService {
  static register = (body) => {
    body.password = hashPassword(body.password);
    body.active = JWT.generateToken({ userActive: true }, "active", "2d");
    return UserDao.create(body);
  };

  static login = async (password, user) => {
    const checkPassword = comparePassword(password, user.password);
    const userInfo = {
      firstName: user.id,
      lastName: user.lastName,
      role: user.role,
      email: user.email,
      age: user.age,
      cart: user.cart,
    };
   

    if (checkPassword) {
      const token = JWT.generateToken(userInfo, "authentication", "2h");

      const updateUser = {
        active: JWT.generateToken({ userActive: true }, "active", "2d"),
        last_connection: new Date(),
      };

      await UserDao.updatePartialBy(user._id, { $set: updateUser });
      
      return token;
    } else {
      return 0;
    }
  };
}
