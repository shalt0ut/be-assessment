import { Request, Response, NextFunction, Router } from 'express';

import catchAsync from '@common/middlewares/catchAsync';

import HttpStatus from '@common/enums/httpStatus';

class CheckController {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    // TODO: Add body Validation and route protection
    this.router.get('/', catchAsync(this.getAllChecks));
    this.router.post('/', catchAsync(this.createCheck));
    this.router.get('/:id', catchAsync(this.readCheck));
    this.router.patch('/:id', catchAsync(this.updateCheck));
    this.router.delete('/:id', catchAsync(this.removeCheck));
  }

  private async getAllChecks(req: Request, res: Response) {
    const checks = 'await checkService.getAllChecks()';
    res
      .status(HttpStatus.OK)
      .json({ message: 'URLs Checks Retrieved Successfully', checks: checks });
  }

  private async createCheck(req: Request, res: Response) {
    const check = 'await checkService.createCheck(req.body)';
    res
      .status(HttpStatus.CREATED)
      .json({ message: `URL Check Added Successfully`, check: check });
  }

  private async readCheck(req: Request, res: Response) {
    const { checkId } = req.params;
    const check = 'await checkService.readCheck(checkId, req.body)';

    res.status(HttpStatus.CREATED).json({
      message: 'URL Check Retrieved Successfully',
      check: check,
    });
  }

  private async updateCheck(req: Request, res: Response) {
    const { checkId } = req.params;

    const check = 'await checkService.updateCheck(checkId, req.body)';
    res
      .status(HttpStatus.CREATED)
      .json({ message: 'URL Check Updated Successfully', check: check });
  }

  private async removeCheck(req: Request, res: Response) {
    const { checkId } = req.params;
    const check = 'await checkService.removeCheck(checkId)';
    res
      .status(HttpStatus.CREATED)
      .json({ message: 'URL Check Deleted Successfully' });
  }
}

const checkController = new CheckController();
export default checkController;
