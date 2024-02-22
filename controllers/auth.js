const UserModel = require("../models/users");
const bcrypt = require("bcryptjs");
const { checkMissingParams } = require("../utils");

exports.postSignUp = async (req, res, next) => {
  const { firstName, lastName, password, email, phone, address, userType } =
    req.body;

  const params = [
    "firstName",
    "lastName",
    "password",
    "email",
    "phone",
    "address",
    "userType",
  ];

  try {
    const missingParamsError = checkMissingParams(req, res, params);
    if (missingParamsError) {
      return missingParamsError;
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const user = new UserModel({
      firstName,
      lastName,
      password: hashPassword,
      email,
      phone,
      address,
      userType,
    });

    const condition = { email };
    const userExist = await UserModel.findOne(condition);

    if (userExist) {
      return res.status(409).json({
        error: "Field email already registered in the database",
      });
    }

    const result = await user.save();
    return res.status(201).json({ message: "Data inserted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.postSignIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      return res.status(200).json({ user });
    }

    return res.status(401).json({ error: "Unauthorized" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
