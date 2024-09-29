const asyncHandler = require('../utils/asyncHandler');

/**
 * Creates an update function for a given model. The generated function takes two
 * arguments, the id of the document to update and an object with the data to
 * update, and returns a promise that resolves to the updated document.
 *
 * @param {Model} Model - mongoose model
 * @returns {function} - update function
 */
const updateFactory = (Model) => {
  return asyncHandler(async (id, updateData) => {
    return await Model.findByIdAndUpdate(id, updateData, { new: true });
  });
};

module.exports = updateFactory;
