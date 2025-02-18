class Middleware {
    static asyncHandler(func) {
        return (req, res, next) => {
            // Wraps the async function in a promise and catches any errors
            Promise.resolve(func(req, res)).catch((error) => {
                if (!res.headersSent) { res.sendStatus(error.statusCode || 500); }
            });
        };
    }
}

export default Middleware;
