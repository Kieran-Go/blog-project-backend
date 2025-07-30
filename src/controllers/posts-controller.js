const prisma = require('../../db/pool');

module.exports = {
    getAllPosts: async () => {
        try{
            return await prisma.post.findMany();
        }
        catch(err) {
            console.error("Error in getAllposts: ", err);
            throw err;
        }
    },

    getPostById: async (id) => {
        try {
            return await prisma.post.findUnique({
                where: { id: id }
            });
        }
        catch(err) {
            console.error("Error in getPostById: ", err);
            throw err;
        }
    },

    getPostComments: async (postId) => {
        try {
            return await prisma.comment.findMany({
                where: { postId: postId }
            });
        }
        catch(err) {
            throw err;
        }
    },

    createPost: async (title, content, isPublished, userId) => {
        try {
            return await prisma.post.create({
            data: { title, content, isPublished, userId }
        });
        } 
        catch (err) {
        throw err;
        }
    },

    publishPost: async (id) => {
        try {
            return await prisma.post.update({
                where: { id: id },
                data: {
                    isPublished: true
                }
            })
        }
        catch(err) {
            throw err;
        }
    },

    deletePost: async (id) => {
        try{
            return await prisma.post.delete({
                where: { id: id }
            })
        }
        catch(err) {
            // Prisma "record not found" error
            if (err.code === 'P2025') {
                return null;
            }
            throw err;
        }
    },
}