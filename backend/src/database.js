import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { initModels } from './models/initialize.js';

dotenv.config();

class Database {
    constructor() {
        this.sequelize = new Sequelize({
            dialect: "mysql", logging: false,
            host: process.env.DB_HOST,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT
        });
        initModels(this.sequelize);
    }

    async sync(force) {
        try {
            await this.sequelize.sync({ force: force });
            console.log("Database synced successfully!");
        } catch (error) {
            throw error;
        }
    }

    async authenticate() {
        try {
            await this.sequelize.authenticate();
            console.log("Database connection established successfully!");
        } catch (error) {
            throw error;
        }
    }
}

const database = new Database();
export default database;
