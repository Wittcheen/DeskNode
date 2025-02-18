import rateLimit from 'express-rate-limit';

class Middleware {
    static asyncHandler(func) {
        return (req, res, next) => {
            // Wraps the async function in a promise and catches any errors
            Promise.resolve(func(req, res)).catch((error) => {
                if (!res.headersSent) { res.sendStatus(error.statusCode || 500); }
            });
        };
    }

    static rateLimiter = rateLimit({
        max: 100, windowMs: 5 * 60 * 1000, // 5 minutes
        message: "You have exceeded the 100 requests in 5 minutes limit!",
        standardHeaders: true, legacyHeaders: false
    });
}

export default Middleware;
