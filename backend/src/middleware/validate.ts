import { Request, Response, NextFunction } from 'express';

export const validateLead = (req: Request, res: Response, next: NextFunction): void => {
  const { name, email, source } = req.body;

  if (!name || !email || !source) {
    res.status(400).json({ success: false, message: 'Name, email and source are required' });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ success: false, message: 'Invalid email format' });
    return;
  }

  next();
};

export const validateAuth = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ success: false, message: 'Email and password are required' });
    return;
  }

  next();
};