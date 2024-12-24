import pkg from 'pg';
import 'dotenv/config';

const { Pool } = pkg;

const dbConnectionPool = new Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    ssl: {
        rejectUnauthorized: false,
    },
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

async function connect() {
    try {
        const client = await dbConnectionPool.connect();
        console.log(`Successfully connected to the database: ${client.database}`);
        client.release();
    } catch (error) {
        console.error(`Error connecting to the database: ${error}`);
        process.exit(1);
    }
}

connect();
export { dbConnectionPool };