import TicketDao from "../dao/ticket.dao.js";

export default class TicketsService {

    static create (amount,email) {
        const payload = {
            code: `T-${Date.now()}`,
            amount: amount.toFixed(2),
            purchaser: email
        };
        return TicketDao.create(payload);
    }
}