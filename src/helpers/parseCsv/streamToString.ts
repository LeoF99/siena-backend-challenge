import { Readable } from 'stream';
import logger from '../../config/helpers/logger';

export default function streamToString(stream: Readable): Promise<string> {
  const chunks: Buffer[] = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on('error', (err) => {
      logger.error('Stream error', { message: err.message });
      reject(err);
    });
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  });
}
