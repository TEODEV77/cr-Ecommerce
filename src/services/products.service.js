import UsersService from "./users.service.js";
import productDao from "../dao/product.dao.js";

export default class ProductsService {

  static create = async (payload, id) => {
    const user = await UsersService.getUserPremiumOrAdmin(id);

    if (!user) throw new Error("You must be admin or premium user to create products");
    payload.owner = user.email;

    return productDao.create(payload);
    
  };

  static getBy (query) {
    return productDao.getBy(query);
  };

  static updatePartial = async (pid, payload, id) => {

    const product = await productDao.getBy({ _id: pid });

    if (!product) throw new Error("Product not found");

    const user = await UsersService.getUserPremiumOrAdmin(id);

    if (!user) throw new Error("You must be a admin or premium user to update products"); 

    if(user.role === UsersService.isAdmin) return productDao.updatePartialBy(pid, payload);

    if(product.owner !== user.email) throw new Error("You must be the owner of the product to update it");

    return productDao.updatePartialBy(pid, payload);
  };
}
