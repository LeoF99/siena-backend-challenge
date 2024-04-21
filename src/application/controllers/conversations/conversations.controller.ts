import express, { Router, Request, Response } from 'express';
import IController from '../controller.intreface';
import ConversationsService from '../../../domain/conversations/conversations.service';
import errorHandler from '../../../config/middlewares/errorHandler';
import getPagination from '../helpers/getPagination';

class ConversationsController implements IController {
  private router: Router = express.Router();

  constructor(private readonly conversationsService: ConversationsService) {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(
      '/conversation',
      errorHandler(this.find.bind(this)),
    );
  }

  public getRoutes(): Router {
    return this.router;
  }

  async find(req: Request, res: Response): Promise<void> {
    const {
      skip, limit,
    } = getPagination(req);

    const conversations = await this.conversationsService.find({
      skip,
      limit,
    });

    res.status(200).json(conversations);
  }
}

export default ConversationsController;
