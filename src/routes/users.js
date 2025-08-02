import { Router } from 'express';
import controller from "../controllers/users-controller.js";
import verifyToken from '../middleware/verifyToken.js';
import 'dotenv/config';
const router = Router();

// Get routes
router.get('/', async (req, res) => {
    const users = await controller.getAllUsers();
    res.json(users);
});

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const user = await controller.getUserById(id);
    res.json(user);
})

router.get('/:id/posts', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const posts = await controller.getUsersPosts(id);
    res.json(posts);
})

// Post routes
router.post('/', async (req, res) => {
    const { name, password } = req.body;
    if (!name || !password) {
      return res.status(400).json({ error: "Name and password are required." });
    }

    const newUser = await controller.createUser(name, password);
    res.json(newUser);
})

// Put routes
router.put('/make-author', verifyToken, async (req, res) => {
    const { password } = req.body;
    if (password !== process.env.AUTHOR_PASSWORD) return res.status(401).json({ error: 'Incorrect password' });

    try {
        const updatedUser = await controller.makeAuthor(req.user.id);
        if (!updatedUser) return res.status(404).json({ error: 'User not found' });

        const { id, name, isAuthor } = updatedUser;
        return res.json({ user: { id, name, isAuthor } });
    } 
    catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
})

// Delete routes
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const deleted = await controller.deleteUser(id);
    if (!deleted) return res.status(404).json({ error: "User not found" });
    res.send("User deleted");
})

export default router;