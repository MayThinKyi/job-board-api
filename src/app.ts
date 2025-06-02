import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import { startDB } from "./database/db";
import customerRouter from "./routes/customer.route";
import setupSwagger from "./config/swaggerConfig";

dotenv.config();

const app = express();

//Middleware
app.use(
  cors({ origin: ["https://your-frontend-domain.com"], credentials: true }),
);
app.use(helmet());
app.use(bodyParser.json());
app.use(mongoSanitize());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

setupSwagger(app);

//Routes
app.use("/api/customers", customerRouter);

app.disable("x-powered-by");

startDB();

export default app;
