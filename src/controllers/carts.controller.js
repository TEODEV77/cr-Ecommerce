import cartsService from "../services/carts.service.js";

export default class CartController { 

    static create = async () => {
        return await cartsService.create();
    } 

    static getById = async (id) => {
        return await cartsService.getById(id);
    }

    static addItemToCart = async (cid,pid,quantity,owner) => {
        return await cartsService.addItemToCart(cid,pid,quantity,owner);
    }

    static removeItem = async (cid,pid) => {
        return await cartsService.deleteItemToCart(cid,pid);
    }

    static removeItems = async (cid) => {
        return await cartsService.deleteItemsToCart(cid);
    }

    static remove = async (cid) => {
        return await cartsService.removeCart(cid);
    }
}