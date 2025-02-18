import Middleware from '../utils/middleware.js';
import userRoutes from './user.route.js';

function initRoutes(app) {
    app.use("/api/", Middleware.rateLimiter)
    app.use("/api/users", userRoutes);
}

export { initRoutes };
