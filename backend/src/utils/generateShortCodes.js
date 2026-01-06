const { nanoid } = require("nanoid");
const Url = require("../models/Url");

const generateUniqueShortCode = async (length = 7) => {
  let shortCode;

  do {
    shortCode = nanoid(length);
  } while (await Url.findOne({ shortCode }));

  return shortCode;
};

module.exports = generateUniqueShortCode;
