import express, {
  Request, Response, Router,
} from 'express';
import multer, { Multer, memoryStorage } from 'multer';
import IController from '../controller.intreface';
import errorHandler from '../../../config/middlewares/errorHandler';
import FileUploadService from '../../../domain/fileUpload/fileUpload.service';

const upload: Multer = multer({ storage: memoryStorage() });

class FileUploadController implements IController {
  private router: Router = express.Router();

  constructor(private readonly fileUploadService: FileUploadService) {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(
      '/upload',
      upload.single('file'),
      errorHandler(this.uploadFile.bind(this)),
    );
  }

  public getRoutes(): Router {
    return this.router;
  }

  async uploadFile(req: Request, res: Response): Promise<void> {
    const { file } = req;

    if (file) {
      await this.fileUploadService.uploadFile(file, file.originalname);

      res.status(200).json({
        message: 'File uploaded successfully.',
      });

      return;
    }

    res.status(400).json({
      error: 'No file uploaded.',
    });
  }
}

export default FileUploadController;
