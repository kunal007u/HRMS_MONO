const { getAllResignation, getByIdResignation } = require("./getResignation");
const { createResignation } = require("./addResignation");
const { updateResignation, updateResignationStatus } = require("./updateResignation");
const { deleteResignation } = require("./deleteResignation");

module.exports = { getAllResignation, createResignation, updateResignation, deleteResignation, getByIdResignation, updateResignationStatus };
