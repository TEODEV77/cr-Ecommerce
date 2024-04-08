import cartModel from "./models/cart.model.js";

export default class cartDao {

    static create (payload) {
        return cartModel.create(payload);
    }

    




}