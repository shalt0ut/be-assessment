import Application from '@loaders/app';

import checkController from '@app/check/check.controller';

const appRouters = [{ route: '/check', router: checkController.router }];

const app = new Application();
app.setApiRouters(appRouters);

export default app;
