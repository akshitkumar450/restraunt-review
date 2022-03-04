import * as Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  isAdmin: Joi.boolean(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  password: Joi.string().min(0), // if the password in coming empty while updating the user details
  isAdmin: Joi.boolean(),
});

export const signUpUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const loginUserSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});
