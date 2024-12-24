import e from "express";
import { dbConnectionPool } from "../config/data-source.js";

export const isUserExistsByUsernameOrEmail = async (username, email) => {
    try {
        const user = await dbConnectionPool.query(`SELECT id FROM users
            WHERE username = $1 OR email = $2`, [username, email]);
        return user.rows.length > 0;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const saveUser = async (username, email, password) => {
    try {
        const newUser = await dbConnectionPool.query(`INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3) RETURNING *`, [username, email, password]);
        return newUser.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getUserByUsernameOrEmail = async (usernameOrEmail) => {
    try {
        const user = await dbConnectionPool.query(`SELECT * FROM users
            WHERE username = $1 OR email = $1`, [usernameOrEmail]);
        return user.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getUserById = async (id) => {
    try {
        const user = await dbConnectionPool.query(`SELECT * FROM users
            WHERE id = $1`, [id]);
        return user.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
}