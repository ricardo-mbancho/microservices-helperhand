import { Request, Response } from 'express';

import { register, login } from '../services/auth.service';

export async function registerController(req: Request, res: Response) {
  try {
    const user = await register(req.body.email, req.body.password);

    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
}

export async function loginController(req: Request, res: Response) {
  try {
    const result = await login(req.body.email, req.body.password);

    res.json(result);
  } catch (error: any) {
    res.status(401).json({
      message: error.message,
    });
  }
}
