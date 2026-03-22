const randomstring = require("randomstring");

const temporaryPasswordString = () =>
  randomstring.generate({
    length: 6,
    charset: "alphanumeric",
    capitalization: "uppercase",
});

const randomInvoiceString = () =>
  randomstring.generate({
    length: 2,
    charset: "numeric",
    capitalization: "uppercase",
  });

const generateOTP = () => {
  var digits = "1234567890";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  // return "111111";
  return OTP;
};

module.exports = { temporaryPasswordString, randomInvoiceString, generateOTP };
