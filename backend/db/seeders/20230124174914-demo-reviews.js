'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA; // define your schema in options object

const reviews = [
  {
    spotId: 1,
    userId: 1,
    review: "Place was good!",
    stars: 4
  },
  {
    spotId: 2,
    userId: 2,
    review: "Place was ok!",
    stars: 3
  },
  {
    spotId: 3,
    userId: 2,
    review: "Place was great!!",
    stars: 5
  },
  {
    spotId: 3,
    userId: 3,
    review: "Place was wonderful!!!",
    stars: 5
  },
  {
    spotId: 4,
    userId: 1,
    review: "I would come here again for a wonderful relaxing time",
    stars: 4
  },
  {
    spotId: 5,
    userId: 2,
    review: "Very unclean. Would not come here again!",
    stars: 2
  }

]


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, reviews)
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, reviews);
  }
};
