import { Router } from 'express';
import controller from "../controllers/users-controller.js";
import verifyToken from '../middleware/verifyToken.js';
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
router.put('/make-author/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const author = await controller.makeAuthor(id);

    if (!author) return res.status(404).json({ error: "User not found" });
    res.json(author);
})

// Delete routes
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const deleted = await controller.deleteUser(id);
    if (!deleted) return res.status(404).json({ error: "User not found" });
    res.send("User deleted");
})

export default router;