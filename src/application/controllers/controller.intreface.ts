import { Router } from 'express';

interface IController {
  getRoutes(): Router;
}

export default IController;
