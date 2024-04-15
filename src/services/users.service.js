import UserDao from "../dao/user.dao.js";
import UserDto from "../dto/user.dto.js";
import Jwt from "../utils/jwt.js";
import { inactivityEmail } from "../utils/mailMessages.js";
import CartsService from "./carts.service.js";
import MailService from "./mail.service.js";
import ProductsService from "./products.service.js";
import TicketsService from "./tickets.service.js";

export default class UsersService {
  static isAdmin = "admin";

  static findBy = (query) => {
    return UserDao.findBy(query);
  };

  static get = async () => {
    const data = await UserDao.getAll();
    const users = data.map((user) => new UserDto(user));
    return JSON.parse(JSON.stringify(users));
  };

  static getInactiveUsers = async () => {
    const inactiveUsers = [];
    const users = await UserDao.getAll();
    for (let user of users) {
      try {
        Jwt.verifyToken(user.active);
      } catch (error) {
        const user = { name: user.firstName, email: user.email };
        inactiveUsers.push(user);
      }
    }
  };

  static deleteInactiveUsers = async () => {
    // Manual test, for the manual test, create the user in the db
    //const users = [{ name: 'User name', email: 'user email'}];
    const users = this.getInactiveUsers();
    const mailService = MailService.getInstance();

    if (!users.length) throw new Error("No users to delete");

    for (let user of users) {
      const query = { email: user.email };
      await UserDao.deleteBy(query);
      const body = inactivityEmail(user.name);
      mailService.sendEmail(user.email, "Inactivity", body, []);
    }

    return "Users deleted successfully";
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

  static purchase = async (user) => {
    const shopping_cart = await CartsService.populate(user.cart);
    if (!shopping_cart.length) throw new Error("Cart is empty");

    const inStock = ProductsService.productsInStock(shopping_cart);
    const outOfStock = ProductsService.productsOutOfStock(shopping_cart);

    ProductsService.updateQuantity(inStock);

    const details = { purchased: inStock, noBought: outOfStock };

    const totalAmount = inStock.reduce((acc, item) => {
      const amount = item.product.price * item.quantity;
      return acc + amount;
    }, 0);

    await TicketsService.create(totalAmount, user.email);

    return details;
  };
}
