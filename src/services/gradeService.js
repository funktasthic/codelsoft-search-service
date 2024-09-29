const createFactory = require('../factories/createFactory');
const getAllFactory = require('../factories/getAllFactory');
const getFactory = require('../factories/getFactory');
const updateFactory = require('../factories/updateFactory');
const deleteFactory = require('../factories/deleteFactory');
const Grade = require('../models/grade.model');

class GradeService {
  /**
   * Initialize the service with factories for create, getAll, get, update and delete operations
   *
   * @memberof GradeService
   */
  constructor() {
    this.createGrade = createFactory(Grade);
    this.getAllGrades = getAllFactory(Grade);
    this.getGrade = getFactory(Grade);
    this.updateGrade = updateFactory(Grade);
    this.deleteGrade = deleteFactory(Grade);
  }
}

module.exports = new GradeService();
