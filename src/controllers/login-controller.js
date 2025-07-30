import prisma from '../../db/pool.js';
import bcrypt from 'bcrypt';

export default {
    getLoginRequest: async (name, password) => {
        try {
            // Find user by name
            const user = await prisma.user.findUnique({
                where: { name }
            });

            if (!user) return null;

            // Compare hashed password
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) return null;

            return user;
        } 
        catch (err) {
            throw err;
        }
    }
};
