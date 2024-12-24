import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export function hashPassword(password) {
    return bcrypt.hash(password, SALT_ROUNDS);
}

export function comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
}