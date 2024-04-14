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
    `You must ${user}`
    if (!user) throw new Error("You must be a admin or premium user to update products"); 

    if(user.role === UsersService.isAdmin) return productDao.updatePartialBy(pid, payload);

    if(product.owner !== user.email) throw new Error("You must be the owner of the product to update it");

    return productDao.updatePartialBy(pid, payload);
  };

  static remove = async (pid, id) => {
    const product = await productDao.getBy({ _id: pid });

    if (!product) throw new Error("Product not found");

    const user = await UsersService.getUserPremiumOrAdmin(id);

    if (!user) throw new Error("You must be a admin or premium user to delete products"); 

    if(user.role === UsersService.isAdmin) return productDao.remove(pid);

    if(product.owner !== user.email) throw new Error("You must be the owner of the product to delete it");

    return productDao.remove(pid);
  };

  static productsInStock (cart) {
    const inStock = cart.filter((item) => item.quantity <= item.product.stock); 
    return inStock;
  }

  static productsOutOfStock (cart) {
    const inStock = cart.filter((item) => item.quantity > item.product.stock); 
    return inStock;
  }

  static updateQuantity = async (products) => {
    for (let product of products) {
      const query = { _id: product.product._id.toString() };
      const operation = { $inc: { stock: -product.quantity } };
      await productDao.updatePartialBy(query, operation);
    }
  };
  
}
