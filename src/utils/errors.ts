import { Response } from "express";
import Logger from "./logger";
import { sendErrorResponse } from "./responseHelper";
import { ZodError } from "zod";

export const handleErrorResponse = (error: any, res: Response): void => {
  Logger.error("Error occurred:", error);

  // Zod Validation Error
  if (error instanceof ZodError) {
    const issues = error.errors.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));

    sendErrorResponse(res, 400, "Validation failed", issues);
    return;
  }

  if (error instanceof Error) {
    sendErrorResponse(res, 500, error.message, error.stack);
  } else {
    sendErrorResponse(res, 500, "Internal server error", [
      "An unexpected error occurred.",
    ]);
  }
};
