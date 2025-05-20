/**
 * Wraps async route handlers and forwards errors to Express.
 * @param {Function} fn  Async (req, res, next) => Promise
 */

export default function catchAsync (fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
