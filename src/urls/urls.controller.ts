import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';

@Controller()
export class UrlsController {
  constructor(private urlsService: UrlsService) {}

  @Post('shorten')
  async shorten(@Body() dto: CreateUrlDto) {
    const url = await this.urlsService.create(dto);
    return url;
  }

  @Get('urls')
  async getUrls() {
    const urls = await this.urlsService.findAll();
    return { urls };
  }

  @Get('redirect/:shortCode')
  async redirect(@Param('shortCode') shortCode: string) {
    const url = await this.urlsService.findByShortCode(shortCode);
    return { originalUrl: url.originalUrl };
  }
}