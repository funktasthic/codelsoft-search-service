const createFactory = require('../factories/createFactory');
const getAllFactory = require('../factories/getAllFactory');
const getFactory = require('../factories/getFactory');
const updateFactory = require('../factories/updateFactory');
const deleteFactory = require('../factories/deleteFactory');
const User = require('../models/user.model');

class UserService {
  /**
   * Initialize the service with factories for create, getAll, get, update and delete operations
   *
   * @memberof UserService
   */
  constructor() {
    this.createUser = createFactory(User);
    this.getAllUsers = getAllFactory(User);
    this.getUser = getFactory(User);
    this.updateUser = updateFactory(User);
    this.deleteUser = deleteFactory(User);
  }
}

module.exports = new UserService();
