import { FormModel } from "../../model/form/form.model.mjs";
import { formControllerValidator } from "../../validators/form/form.controller.validator.mjs";
import { logger } from "../../configs/logger.config.mjs";

export const formController = async (request, response) => {
  const { error, value } = formControllerValidator.validate(request.body);

  if (error) {
    return response.status(400).json({ responseMessage: error.message });
  }

  const { firstName, lastName, email, message } = value;

  try {
    await FormModel.create({ firstName, lastName, email, message });

    return response
      .status(201)
      .json({ responseMessage: "Form has been submitted successfully." });
  } catch (error) {
    logger.log({
      level: "error",
      message: error,
      additional: "Internal server error.",
    });

    return response
      .status(500)
      .json({ responseMessage: "Internal server error." });
  }
};
