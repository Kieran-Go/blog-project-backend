import { Router } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import controller from "../controllers/login-controller.js";
const router = Router();

router.post('/', async (req, res) => {
    // User inputed name and password
    const { name, password } = req.body;

    // Check the database for user
    const user = await controller.getLoginRequest(name, password);
    
    // Verify user
    if(!user) return res.status(401).json({ message: "Incorrect username or password" });
    
    // Payload to encode in the JWT
    const payload = { id: user.id };

    // Sign the JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
});

export default router;