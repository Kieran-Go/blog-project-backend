const prisma = require('../../db/pool');

module.exports = {
    getAllComments: async () => {
        try{
            return await prisma.comment.findMany();
        }
        catch(err) {
            console.error("Error in getAllComments: ", err);
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
            console.error("Error in getCommentById: ", err);
            throw err;
        }
    },

    createComment: async (content, userId, postId) => {
        try {
            return await prisma.comment.create({
            data: { content, userId, postId }
        });
        } 
        catch (err) {
        console.error("Error in createComment: ", err);
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
            console.error("Error in editComment: ", err);
            throw err;
        }
    },

    deleteComment: async (id) => {
        try{
            return await prisma.comment.delete({
                where: { id: id }
            })
        }
        catch(err) {
            // Prisma "record not found" error
            if (err.code === 'P2025') {
                return null;
            }
            console.error("Error in deleteComment: ", err)
            throw err;
        }
    },
}