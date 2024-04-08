import cartsService from "../services/carts.service.js";

export default class CartController { 

    static create = async () => {
        return await cartsService.create();
    } 
}