import { config } from "dotenv";
import cors from "cors";
import { corsOptions } from "./configs/cors.options.config.mjs";
import express from "express";
import { logger } from "./configs/logger.config.mjs";
import lusca from "lusca";
import { mongodbDatabase } from "./databases/mongodb.database.mjs";
import { rateLimitMiddleware } from "./middlewares/rate.limit.middleware.mjs";
import { routes } from "./routes/routes.mjs";
import session from "express-session";
import { sessionOptions } from "./configs/session.options.config.mjs";

config();
mongodbDatabase();
const app = express();

app.use(express.json());
app.use(cors(corsOptions));

if (process.env.NODE_ENVIRONMENT === "development") {
  sessionOptions.cookie.secure = false;
}

app.use(session(sessionOptions));

app.use(
  lusca({
    // ! ALERT (csrf is disabled due to difference in ports, however manual csrf can also be implemented.)"
    // * Create a random csrf token and save it in memory. then send the token as a response when the user login's or,
    // * Create an Get API endpoint and send the token as a response. Then on every post match the generated token with the sent token from the client.
    csrf: false,
    csp: {
      policy: {
        "default-src": "'self'",
        "img-src": "'*'",
      },
    },
    xframe: "SAMEORIGIN",
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
    xssProtection: true,
    nosniff: true,
    referrerPolicy: "same-origin",
  })
);

app.use(rateLimitMiddleware);
app.use("/", routes);

app.listen(process.env.EXPRESS_PORT, () => {
  logger.log({
    level: "info",
    message: "Express Server is successfully running.",
    additional: `port: ${process.env.EXPRESS_PORT}`,
  });
});
