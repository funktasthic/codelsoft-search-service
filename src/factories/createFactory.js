const asyncHandler = require('../utils/asyncHandler');

const createFactory = (Model) => {
  return asyncHandler(async (data) => {
    return await Model.create(data);
  });
};

module.exports = createFactory;
