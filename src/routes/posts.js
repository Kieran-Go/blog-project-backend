import { Router } from 'express';
import controller from "../controllers/posts-controller.js";
import verifyToken from '../middleware/verifyToken.js';
const router = Router();

// Get routes
router.get('/', async (req, res) => {
    const posts = await controller.getAllPosts();
    res.json(posts);
});

router.get('/published', async (req, res) => {
    const posts = await controller.getPublishedPosts();
    res.json(posts);
});

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const post = await controller.getPostById(id);
    res.json(post);
});

router.get('/:id/comments', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const comments = await controller.getPostComments(id);
    res.json(comments);
})

// Post routes
router.post('/create', verifyToken, async (req, res) => {
    const { title, content, isPublished, } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Fields are empty." });
    }

    const newPost = await controller.createPost(title, content, isPublished, req.user.id);
    res.json(newPost);
});

router.put('/:id', verifyToken, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { title, content, isPublished } = req.body;

    const editedPost = await controller.editPost(id, title, content, isPublished);
    res.json(editedPost);
});

// Put routes
router.put('/publish/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const publishedPost = await controller.publishPost(id);

    if (!publishedPost) return res.status(404).json({ error: "Post not found" });
    res.json(publishedPost);
});

// Delete routes
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const deleted = await controller.deletePost(id);
    if (!deleted) return res.status(404).json({ error: "Post not found" });
    res.send("Post deleted");
})

export default router;