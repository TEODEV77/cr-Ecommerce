import Joi from "joi";

export const createUser = (body) => {
  const userModel = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    age: Joi.number().required(),
  });

  
  const { error } = userModel.validate(body);

  if (error) {
    return error.details[0].message;
  }

  return 1;
};
