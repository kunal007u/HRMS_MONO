const { AbilityBuilder, createMongoAbility } = require("@casl/ability");
const models = require("../models/associations");
const { Role } = models;
const constants = require("../utils/constants");

const defineAbilities = (req, userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { can, cannot, rules } = new AbilityBuilder(createMongoAbility);

      Role.findOne({
        where: {
          id: userData.roleId,
          isActive: constants.ACTIVE,
        },
      })
        .then((data) => {
          if (data) {
            if (data.name === "SUPER ADMIN") {
              can("manage", "all");
            } 
            // else if (data.name === "HR") {
            // } else if (data.name === "EMPLOYEE") {
            // } 
            req.roleName = data.name;
            resolve(createMongoAbility(rules));
          } else {
            reject("Role not found.");
          }
        })
        .catch((err) => {
          reject(err);
        });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = defineAbilities;
