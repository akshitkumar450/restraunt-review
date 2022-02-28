import * as Joi from 'joi';

export const createRestroSchema = Joi.object({
  name: Joi.string().required(),
  location: Joi.string().required(),
  img: Joi.string(),
});

export const updateRestroSchema = Joi.object({
  name: Joi.string(),
  location: Joi.string(),
  img: Joi.string(),
});
