import { Request, Response, NextFunction } from "express";
import redis from "../middleware/redis";

export const fromCache = (keyPrefix: string) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const key = `${keyPrefix}:${JSON.stringify(req.params)}`;
      const cachedData = await redis.get(key);
      
      if (cachedData) {
        console.log(`Cache hit for key: ${key}`);
        res.json(JSON.parse(cachedData)); 
        return;
      }

      console.log(`Cache miss for key: ${key}`);
      res.locals.cacheKey = key;
      next(); 
    } catch (error) {
      console.error("Redis Cache Error:", error);
      next();
    }
  };
};
