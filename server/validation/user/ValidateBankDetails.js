const Joi = require("@hapi/joi");
const User = require("../../models/user");

const registerValidation = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    acc_name: Joi.string().required(),
    acc_number: Joi.string().required(),
    bank_name: Joi.string().required(),
  });

  const { error, value } = schema.validate({ ...req.body });

  let msg = "";
  let key = "";
  let type = "";

  if (error) {
    msg = error.details[0].message
      .replace('"', "")
      .replace('"', "")
      .replace("id", "User ID")
      .replace("acc_name", "Account Name")
      .replace("acc_number", "Account Number")
      .replace("bank_name", "Bank Name");

    key = error.details[0].path[0];
    type = error.details[0].type;

    return res.status(401).json({ success: false, msg, key, type });
  }

  try {
    const user = await User.findById(req.body.id);

    if (!user) {
      msg = "User does not exist";
      key = "id";
      type = "invalid.id";
      return res.json({ success: false, msg, key, type });
    }

    req.body.user = user;

    next();
  } catch (e) {
    res.status(400).json({ msg: "Bad Request" });
  }
};

module.exports = registerValidation;
