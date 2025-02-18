import userRoutes from './user.route.js';

function initRoutes(app) {
    app.use("/api/users", userRoutes);
}

export { initRoutes };
