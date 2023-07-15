const { ERROR, OK } = require("../utils/responseHelper");
const UserService = require("../service/userService");
const { checkValidEmail, comparePasswords } = require("../functions/common");
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // set hash password
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // check valid email
    const validEmail = checkValidEmail(email);
    if (!validEmail) return ERROR(res, [], "Invalid email Address");
    const payload = {
      firstName,
      lastName,
      email: email,
      password: hashedPassword
    }
    const user = await UserService.createUser(payload);
    if (user.message) return ERROR(res, [], user.message);
    return OK(res, user, "User created Successfully");
  } catch (err) {
    ERROR(res, [], "Error while creating user");
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const validEmail = checkValidEmail(email);
    if (!validEmail) return ERROR(res, [], "Invalid email Address");
    const user = await UserService.getUserByEmail(email);
    if (!Boolean(user.length)) return ERROR(res, [], "User not found");
    if (user.message) return ERROR(res, [], user.message);

    const userPassword = user[0]?.password;
    const match = await bcrypt.compare(password, userPassword);

    if (match) return OK(res, user, "User logged in Successfully");

    return ERROR(res, [], "Password is wrong");




  } catch (err) {
    ERROR(res, [], "Error while logging in user");
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await UserService.getUserByEmail(req.params.email);
    if (!Boolean(user.length)) return ERROR(res, [], "User not found");
    return OK(res, user, "User found Successfully");
  } catch (err) {
    ERROR(res, [], "Error while getting user");
  }
};
exports.getAllUser = async (req, res) => {
  try {
    const user = await UserService.getAllUser();
    if (!Boolean(user.length)) return ERROR(res, [], "User not found");
    return OK(res, user, "User found Successfully");
  } catch (err) {
    ERROR(res, [], "Error while getting user");
  }
};
