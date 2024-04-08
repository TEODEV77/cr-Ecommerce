import CartDao from "../dao/cart.dao.js";

export default class CartsService {

    static create () {
        const payload = { products : []};
        return CartDao.create(payload);
    }

}