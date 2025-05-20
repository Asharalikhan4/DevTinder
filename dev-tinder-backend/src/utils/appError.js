export class AppError extends Error {
    /**
     * @param {string} message  Human-readable error message
     * @param {number} statusCode  HTTP status code (e.g. 400, 404, 500)
     */
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        // So instanceof still works after transpilation
        this.name = this.constructor.name;
        // Capture stack trace without this constructor
        Error.captureStackTrace(this, this.constructor);
    }
};