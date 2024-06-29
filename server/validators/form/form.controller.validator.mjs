import Joi from "joi";

export const formControllerValidator = Joi.object({
  _csrf: Joi.string(),

  firstName: Joi.string().pattern(new RegExp("^[A-Z].*$")).required(),
  lastName: Joi.string().pattern(new RegExp("^[A-Z].*$")).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),

  message: Joi.string().pattern(new RegExp("^[A-Z].*$")).required(),
});
