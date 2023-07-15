const { db } = require("../database/connection");
const { ERROR } = require("../utils/responseHelper");

exports.createUser = async (userBody) => {
  try {
    const user = await db.User.create(userBody);
    return user;
  } catch (err) {
    return err;
  }
};

exports.getUserByEmail = async (email) => {
  const user = await db.User.find({ email: email });
  return user;
};
exports.getAllUser = async () => {
  const user = await db.User.find({});
  return user;
};
