import cartsService from "../services/carts.service.js";

export default class CartController { 

    static create = async () => {
        return await cartsService.create();
    } 

    static getById = async (id) => {
        return await cartsService.getById(id);
    }

    static addItemToCart = async (cid,pid,quantity) => {
        return await cartsService.addItemToCart(cid,pid,quantity);
    }
}