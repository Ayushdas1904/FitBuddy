import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv'

dotenv.config();
const router = express.Router();

const stripe = new Stripe(process.env.SECRET_STRIPE_KEY); // Initialize Stripe with your secret key

const app = express();
app.use(express.json());

router.post('/', async (req, res) => {
    try {
        const { cartItems } = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: cartItems.map((item) => ({
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: item.name,
                        images: [item.imgSrc],
                    },
                    unit_amount: Math.round(item.price * 100), // Convert to paise
                },
                quantity: 1,
            })),
            mode: 'payment',
            success_url: `${FRONTEND_URL}/success`,
            cancel_url: `${FRONTEND_URL}/cancel`,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;