const asyncHandler = require('../utils/asyncHandler');

/**
 * Creates a create function for a given model. The generated function takes one
 * argument, an object with the data to create, and returns a promise that
 * resolves to the created document.
 *
 * @param {Model} Model - mongoose model
 * @returns {function} - create function
 */
const createFactory = (Model) => {
  return asyncHandler(async (data) => {
    return await Model.create(data);
  });
};

module.exports = createFactory;
