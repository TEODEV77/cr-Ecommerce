
import productsService from '../services/products.service.js';

export default class ProductController { 

    static create = async (payload, id) => {
        return await productsService.create(payload, id);
    }

    static update = async (pid, payload, id) => {
        return await productsService.updatePartial(pid, payload, id);
    }

}