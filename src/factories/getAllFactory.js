const asyncHandler = require('../utils/asyncHandler');

/**
 * Creates a get all function for a given model. The generated function returns
 * a promise that resolves to an array of all documents in the model.
 *
 * @param {Model} Model - mongoose model
 * @returns {function} - get all function
 */
const getAllFactory = (Model) => {
  return asyncHandler(async () => {
    return await Model.find();
  });
};

module.exports = getAllFactory;
