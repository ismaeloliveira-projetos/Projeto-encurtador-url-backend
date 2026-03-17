import { IsNotEmpty, IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class CreateUrlDto {
  @IsNotEmpty()
  @IsString()
  originalUrl: string;

  @IsOptional()
  @IsNumber()
  rateLimit?: number;

  @IsOptional()
  @IsDateString()
  expiry?: string;
}