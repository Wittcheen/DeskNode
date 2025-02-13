import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

class PasswordManager {
    static hash(password) {
        const salt = randomBytes(16);
        const hash = scryptSync(password, salt, 64);
        return Buffer.concat([salt, hash]).toString("base64");
    }

    static verify(password, storedHash) {
        const buffer = Buffer.from(storedHash, "base64");
        const salt = buffer.subarray(0, 16);
        const hash = buffer.subarray(16);
        const newHash = scryptSync(password, salt, 64);
        // Securely compare the hashes to prevent timing attacks
        return timingSafeEqual(hash, newHash);
    }
}

export default PasswordManager;
