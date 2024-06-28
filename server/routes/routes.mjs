import { Router } from "express";
import { csrfController } from "../controllers/auth/csrf.controller.mjs";
import { formController } from "../controllers/form/form.controller.mjs";

export const routes = Router();

routes.post("/form-submission", formController);

routes.get("/auth/csrf-token", csrfController);
