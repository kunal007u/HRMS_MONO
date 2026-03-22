const { getAllRoles } = require('./getRole')
const getRole = require("./getRoleById");
const createRole = require("./createRole");
const deleteRole = require("./deleteRole");
const updateRole = require("./updateRole");

module.exports = { getAllRoles, getRole, createRole, deleteRole, updateRole };