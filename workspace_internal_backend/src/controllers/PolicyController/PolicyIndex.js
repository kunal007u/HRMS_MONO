const { getAllPolicy } = require("./getPolicy");
const { createPolicy } = require("./addPolicy");
const { updatePolicy } = require("./updatePolicy");
const { deletePolicy } = require("./deletePolicy");

module.exports = { getAllPolicy, createPolicy, updatePolicy, deletePolicy };
