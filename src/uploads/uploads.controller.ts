import {
  BadRequestException,
  Controller,
  Post,
  Req,
  Res,
} from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';
import * as pump from 'pump';

@Controller('uploads')
export class UploadsController {
  // @UseGuards(UploadGuard)
  @Post('image')
  async uploadFile(@Req() req, @Res() res) {
    const mp = req.multipart(
      (field: any, file: any, filename: any, encoding: any, mimeType: any) => {
        //
        if (!mimeType.includes('image')) throw new BadRequestException();
        //
        file.on('limit', (a) => {
          console.log(a);
        });
        //
        const destination = 'public/images/';
        const name = uuidv4();
        const extname = path.extname(filename);

        const url = name + extname;

        const filePath = path.resolve(destination + url);

        const writeStream = fs.createWriteStream(filePath);
        pump(file, writeStream);
        writeStream.on('finish', () => {
          res.send({ url: url });
        });
      },

      (error: any) => {
        if (error) {
        }
      },
    );
  }
}
