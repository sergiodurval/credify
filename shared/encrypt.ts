import bcrypt from 'bcrypt';

const encrypt = {
    // Password hashing
    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    },

    // Comparing passwords
    async comparePassword(inputPassword: string, storedHash: string): Promise<boolean> {
        return await bcrypt.compare(inputPassword, storedHash);
    }
};

export default encrypt;
