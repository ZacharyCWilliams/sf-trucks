const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const validate = user => {
  const schema = {
    username: Joi.string()
      .min(5)
      .max(50)
      .required(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };
  return Joi.validate(user, schema);
};

const UserSchema = new Schema({
  username: {
    type: String,
    require: true,
    minLength: 5,
    maxLength: 255,
    unique: true
  },
  password: {
    type: String,
    require: true,
    minLength: 5,
    maxLength: 255,
    unique: true
  }
});

module.exports = validate;
module.exports = User = mongoose.model("users", UserSchema);
