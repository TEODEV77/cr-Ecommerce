import ticketModel from './models/ticket.model.js';

export default class TicketDao {

    static create(payload){
        return ticketModel.create(payload);
    }
}