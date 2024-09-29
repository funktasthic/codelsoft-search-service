const asyncHandler = require('../utils/asyncHandler');

/**
 * Creates a delete function for a given model. The generated function takes one
 * argument, the id of the document to delete, and returns a promise that resolves
 * to the deleted document.
 *
 * @param {Model} Model - mongoose model
 * @returns {function} - delete function
 */
const deleteFactory = (Model) => {
  return asyncHandler(async (id) => {
    return await Model.findByIdAndDelete(id);
  });
};

module.exports = deleteFactory;
