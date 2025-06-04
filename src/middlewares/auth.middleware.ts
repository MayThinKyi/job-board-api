import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwtUtils";
import { sendErrorResponse } from "../utils/responseHelper";

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return sendErrorResponse(res, 401, "Unauthorized", [
        "Access denied. Please log in and provide a valid token.",
      ]);
    }
    const decoded = verifyToken(token);
    if (!decoded) {
      sendErrorResponse(res, 403, "Invalid or expired token", [
        "The provided token is invalid or has expired. Please log in again to continue.",
      ]);
    }
    (req as any).user = decoded;
    next();
  } catch (error) {
    sendErrorResponse(res, 403, "Invalid or expired token", [
      "The provided token is invalid or has expired. Please log in again to continue.",
    ]);
  }
};

export { authenticateJWT };
