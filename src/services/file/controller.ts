import { Controller, Get, Param, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('file')
export class FileController {

  @Get(':id')
  getFile(@Param() {id}) {
    const file = createReadStream(join(process.cwd(), 'dist', 'upload', id));
    return new StreamableFile(file);
  }
}
