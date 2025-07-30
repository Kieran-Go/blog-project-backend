const prisma = require('../../db/pool');
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

module.exports = {
    getAllUsers: async () => {
        try{
            return await prisma.user.findMany();
        }
        catch(err) {
            console.error("Error in getAllUsers: ", err);
            throw err;
        }
    },

    getUserById: async (id) => {
        try {
            return await prisma.user.findUnique({
                where: { id: id }
            });
        }
        catch(err) {
            throw err;
        }
    },

    getUsersPosts: async (userId) => {
        try {
            return await prisma.post.findMany({
                where: { userId: userId }
            });
        }
        catch(err) {
            throw err;
        }
    },

    createUser: async (name, password) => {
        try {
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
            return await prisma.user.create({
            data: { name: name, password: hashedPassword },
        });
        } 
        catch (err) {
        throw err;
        }
    },

    makeAuthor: async (userId) => {
        try{
            const newAuthor = await prisma.user.update({
                where: { id: userId },
                data: {
                    isAuthor: true
                }
            })
            return newAuthor;
        }
        catch(err) {
            // Prisma "record not found" error
            if (err.code === 'P2025') {
                return null;
            }
            throw err;
        }
    },

    deleteUser: async (userId) => {
        try{
            return await prisma.user.delete({
                where: { id: userId }
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