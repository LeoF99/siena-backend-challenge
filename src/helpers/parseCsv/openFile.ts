import { Readable } from 'stream';
import streamToString from './streamToString';
import stringToCsv from './stringToCsv';

export default async function openFile(
  fileStream: Readable,
): Promise<Record<string, string>[]> {
  const fileString = await streamToString(fileStream);

  return stringToCsv(fileString);
}
