import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
@Controller('photo')
export class PhotoController {
  @Get()
  async proxyPhoto(@Query('url') url: string, @Res() res: Response) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    res.set(
      'Content-Type',
      response.headers.get('content-type') || 'image/jpeg',
    );
    res.send(buffer);
  }
}
