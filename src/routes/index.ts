/**
 * file: src/routes/index.ts
 * description: file responsible for default api route
 * data: 09/16/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.status(200).send({
    success: 'true',
    message: 'Welcome to the DevSquad Employee API!',
    version: '1.0.0'
  });
});

export default router;