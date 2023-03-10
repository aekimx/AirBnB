'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;


let bookings = [
  {
    spotId: 1,
    userId: 2,
    startDate: new Date('2021-08-06'),
    endDate: new Date('2021-08-14'),
  },
  {
    spotId: 1,
    userId: 1,
    startDate: new Date('2021-01-10'),
    endDate: new Date('2021-02-01'),
  },
  {
    spotId: 2,
    userId: 3,
    startDate: new Date('2023-01-10'),
    endDate: new Date('2021-02-01'),
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, bookings)
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkDelete(options, bookings);
  }
};
