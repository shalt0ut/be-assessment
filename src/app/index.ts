import Application from '@loaders/app';
import { Router, Request, Response, NextFunction } from 'express';
const appRouters = [
  {
    route: '/',
    router: Router().get(
      '/',
      (req: Request, res: Response, next: NextFunction) =>
        res.status(200).json({ message: 'Hello from index' })
    ),
  },
];
const app = new Application();
app.setApiRouters(appRouters);

export default app;
