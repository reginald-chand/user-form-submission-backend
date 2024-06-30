import { Router } from "express";
import { formController } from "../controllers/form/form.controller.mjs";

export const routes = Router();

routes.post("/form-submission", formController);
