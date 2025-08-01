const prisma = require('../../db/pool');

module.exports = {
    getAllComments: async () => {
        try{
            return await prisma.comment.findMany();
        }
        catch(err) {
            throw err;
        }
    },

    getCommentById: async (id) => {
        try {
            return await prisma.comment.findUnique({
                where: { id: id }
            });
        }
        catch(err) {
            throw err;
        }
    },

    createComment: async (content, userId, postId) => {
        try {
            return await prisma.comment.create({
            data: { content, userId, postId },
            include: {
                user: {
                    select: { id: true, name: true }
                }
            }
        });
        } 
        catch (err) {
        throw err;
        }
    },

    editComment: async (id, newContent) => {
        try {
            return await prisma.comment.update({
                where: { id: id },
                data: {
                    content: newContent
                }
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

    deleteComment: async (id) => {
        try{
            return await prisma.comment.delete({
                where: { id: id },
                include: {
                user: {
                    select: { id: true, name: true }
                }
            }
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