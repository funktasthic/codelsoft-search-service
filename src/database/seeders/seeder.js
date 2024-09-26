const mongoose = require('mongoose');
const User = require('../../models/user.model');
const Grade = require('../../models/grade.model');
const Restriction = require('../../models/restriction.model');
const Role = require('../../models/role.model');
require('dotenv').config();
const config = require('../config/config');
const gradeData = require('./data/grades.data');
const restrictionData = require('./data/restrictions.data');
const userData = require('./data/users.data');
const roleData = require('./data/roles.data');

/**
 * Seeds the database with the given data.
 *
 * @function
 * @async
 * @returns {undefined}
 * @throws {Error} If there is an error seeding the database.
 */
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.MONGODB_URI);

    // Get the list of all collections
    const collections = await mongoose.connection.db.listCollections().toArray();

    // Drop all collections
    for (const collection of collections) {
      await mongoose.connection.db.dropCollection(collection.name);
    }

    // Insert data
    await Role.insertMany(roleData);
    await User.insertMany(userData);
    await Grade.insertMany(gradeData);
    await Restriction.insertMany(restrictionData);

    console.log(
      '\x1b[33m--------------------\n\x1b[1mDATABASE SEEDED!\n--------------------\x1b[0m'
    );
    process.exit(0);
  } catch (error) {
    console.log(
      '\x1b[31m-------------------\n\x1b[1mDATABASE ERROR: ',
      error,
      '\n-------------------\x1b[0m'
    );
    process.exit(1);
  }
};

seedDatabase();
