const createFactory = require('../factories/createFactory');
const getAllFactory = require('../factories/getAllFactory');
const getFactory = require('../factories/getFactory');
const updateFactory = require('../factories/updateFactory');
const deleteFactory = require('../factories/deleteFactory');
const Restriction = require('../models/restriction.model');

class RestrictionService {
  /**
   * Initialize the service with factories for create, getAll, get, update and delete operations
   *
   * @memberof RestrictionService
   */
  constructor() {
    this.createRestriction = createFactory(Restriction);
    this.getAllRestrictions = getAllFactory(Restriction);
    this.getRestriction = getFactory(Restriction);
    this.updateRestriction = updateFactory(Restriction);
    this.deleteRestriction = deleteFactory(Restriction);
  }
}

module.exports = new RestrictionService();
