import Application from '@loaders/app';

import checkController from '@app/check/check.controller';
import reportController from '@app/report/report.controller';

const appRouters = [
  { route: '/check', router: checkController.router },
  { route: '/report', router: reportController.router },
];

const app = new Application();
app.setApiRouters(appRouters);

export default app;
