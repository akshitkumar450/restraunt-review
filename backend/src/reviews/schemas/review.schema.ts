import * as Joi from 'joi';

export const createReview = Joi.object({
  comment: Joi.string().required(),
  rating: Joi.number().required(),
});
