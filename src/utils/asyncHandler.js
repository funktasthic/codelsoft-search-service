/**
 * Returns a middleware function that wraps the given function `fn` and
 * automatically calls `next` with any exceptions that are thrown.
 *
 * @param {Function} fn - The function to wrap.
 * @returns {Function} The wrapped function.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
