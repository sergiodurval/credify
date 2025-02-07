import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import createError from "http-errors";

declare module "express" {
  export interface Request {
    user?: {
      id: string;
      email: string;
    };
  }
}

interface DecodedToken {
  id: string;
  email: string;
}

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.query.token as string || req.headers["x-token"] as string;
  if (!token) {
    return next(createError(401, "Unauthorized: No token provided"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as DecodedToken;
    req.user = { id: decoded.id, email: decoded.email }; 
    next();
  } catch (err) {
    return next(createError(401, "Unauthorized: Invalid token"));
  }
};
