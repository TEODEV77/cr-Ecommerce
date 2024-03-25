import Stripe from "stripe";

export default class PaymentsService {

    constructor() {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    }

    createPaymentsIntent(data) {
        return this.stripe.paymentIntents.create(data);
    }
}