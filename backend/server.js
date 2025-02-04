import express from 'express';
import database from './src/database.js';
import Swagger from './swagger.js';

const app = express();
const port = 3000;

app.use(express.json());

async function startServer(sync) {
    try {
        await database.authenticate();
        if (sync) { await database.sync(true); }
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
            new Swagger().setup(app, port);
        });
    } catch (error) {
        console.error(`Error starting the server: ${error.message}`);
        process.exit(1); // Exit if the database connection fails
    }
}
startServer(true);
