import { createWriteStream } from 'fs';
import { join } from 'path';
import type { IFileType } from 'src/types/fileTypes';
import { random } from './random';

export const saveFile = (file: IFileType) => { 
  const extension = file.originalname.split('.');
  const index = extension.length - 1;
  const fileName = `${random()}.${extension[index]}`;
  const uploadPath = join(__dirname, '..', 'upload', fileName);
  const writeStream = createWriteStream(uploadPath);

  return new Promise((
    resolve: (value: string) => void,
    reject: (reason?: boolean) => void
  ) => {
    writeStream.write(file.buffer, (error) => {
      if (error) {
        reject(false);
      } else {
        writeStream.end(() => {
          resolve(fileName);
        });
      }
    });
  });
};