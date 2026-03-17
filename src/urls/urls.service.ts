import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUrlDto) {
    return this.prisma.url.create({
      data: {
        originalUrl: dto.originalUrl,
        shortCode: nanoid(6),
        rateLimit: dto.rateLimit,
        expiry: dto.expiry ? new Date(dto.expiry) : null,
      },
    });
  }

  async findAll() {
    return this.prisma.url.findMany();
  }

  async findByShortCode(shortCode: string) {
    const url = await this.prisma.url.findUnique({ where: { shortCode } });
    if (!url) throw new NotFoundException('URL não encontrada');

    // Checa expiração
    if (url.expiry && url.expiry < new Date()) {
      throw new BadRequestException('URL expirada');
    }

    // Checa rate limiting
    if (url.rateLimit && url.clicks >= url.rateLimit) {
      throw new BadRequestException('Limite de cliques atingido');
    }

    // Incrementa cliques
    await this.prisma.url.update({
      where: { shortCode },
      data: { clicks: url.clicks + 1 },
    });

    return url;
  }
}