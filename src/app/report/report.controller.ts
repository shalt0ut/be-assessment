import { Request, Response, NextFunction, Router } from 'express';

import catchAsync from '@common/middlewares/catchAsync';

import HttpStatus from '@common/enums/httpStatus';

class ReportController {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    // TODO: Add body Validation and route protection
    this.router.post('/', catchAsync(this.createReport));
    this.router.get('/:id', catchAsync(this.readReport));
  }

  private async createReport(req: Request, res: Response) {
    const report = 'await reportService.createReport(req.body)';
    res.status(HttpStatus.CREATED).json({
      message: `URL Check Report Created Successfully`,
      report: report,
    });
  }

  private async readReport(req: Request, res: Response) {
    const { reportId } = req.params;
    const report = 'await reportService.readReport(reportId, req.body)';

    res.status(HttpStatus.CREATED).json({
      message: 'URL Check Report Retrieved Successfully',
      report: report,
    });
  }
}

const reportController = new ReportController();
export default reportController;
