import { Request, Express } from 'express';
import { FileFilterCallback } from 'multer';

export function isFileCsv(fileName: string) {
  return fileName.match(/\.(csv)$/);
}

export default function csvFileValidator(
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) {
  if (!isFileCsv(file.originalname)) {
    return cb(null, false);
  }

  return cb(null, true);
}
