const asyncHandler = require('../utils/asyncHandler');

/**
 * Creates a get function for a given model. The generated function takes one
 * argument, the id of the document to get, and returns a promise that resolves
 * to the found document.
 *
 * @param {Model} Model - mongoose model
 * @returns {function} - get function
 */
const getFactory = (Model) => {
  return asyncHandler(async (id) => {
    return await Model.findById(id);
  });
};

module.exports = getFactory;
