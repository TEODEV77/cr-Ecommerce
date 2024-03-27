import { Router } from "express";
import PaymentsService from "../../services/payments.service.js";

const router = Router();

router.post("/", async (req, res) => {
  const paymentInfo = {
    amount: 150,
    currency: 'usd',
  };

  const service = new PaymentsService();
  const paymentIntent = await service.createPaymentsIntent(paymentInfo);
  res.status(200).json(paymentIntent);
});

export default router;
