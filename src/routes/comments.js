import { Router } from 'express';
import controller from "../controllers/comments-controller.js";
import verifyToken from '../middleware/verifyToken.js';
const router = Router();

// Get routes
router.get('/', async (req, res) => {
    const comments = await controller.getAllComments();
    res.json(comments);
});

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const comment = await controller.getCommentById(id);
    res.json(comment);
});

// Post routes
router.post('/posts/:id', verifyToken, async (req, res) => {
    const { content } = req.body;
    const postId = parseInt(req.params.id, 10);
    const userId = req.user.id; 

    const newComment = await controller.createComment(content, userId, postId);
    res.json(newComment);
});

// Put routes
router.put('/edit/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { content } = req.body;
    const editedComment = await controller.editComment(id, content);

    if (!editedComment) return res.status(404).json({ error: "Comment not found" });
    res.json(editedComment);
});

// Delete routes
router.delete('/:id', verifyToken, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const deleted = await controller.deleteComment(id);
    if (!deleted) return res.status(404).json({ error: "Comment not found" });
    res.json(deleted);
})

export default router;