import jwt from 'jsonwebtoken';
import express from 'express';

declare module 'express' {
    export interface Request {
        userId?: number;
    }
}

export const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.headers['x-access-token'];
  
    if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });
  
    jwt.verify(token as string, 'supersecret', (err, decoded: string | any) => {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      // Check if decoded is of JwtPayload type and has an id property
      if (typeof decoded !== 'string' && 'id' in decoded) {
        req.userId = decoded.id;
        next();
      } else {
        return res.status(500).send({ auth: false, message: 'Failed to decode token.' });
      }
    });
};