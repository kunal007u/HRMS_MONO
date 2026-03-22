const { getAllHoliday } = require("./getHoliday");
const { createHoliday } = require("./addHoliday");
const { updateHoliday } = require("./updateHoliday");
const { deleteHoliday } = require("./deleteHoliday");

module.exports = { getAllHoliday, createHoliday, updateHoliday, deleteHoliday };
