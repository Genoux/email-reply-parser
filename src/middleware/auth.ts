import type { Request, Response, NextFunction } from 'express';

export const authenticateApiKey = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Bearer token required' });
  }
  
  const token = authHeader.split(' ')[1];
  
  if (!token || token !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
  
  next();
};