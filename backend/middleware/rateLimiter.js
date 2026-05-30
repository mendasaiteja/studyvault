import rateLimit from "express-rate-Limit";

export const uploadLimiter = rateLimit({
    max: 10,
    windowMs: 60 * 60 * 1000,
    message: { message: "Too many uploads, try again after an hour" }
});

export const authLimiter = rateLimit({
    max: 10,
    windowMs: 15 * 60 * 1000,
    message: { message: "Too many attempts, try again later" }
});