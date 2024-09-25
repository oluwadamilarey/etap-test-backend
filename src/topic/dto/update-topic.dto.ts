import { IsString, IsOptional } from 'class-validator';

export class UpdateTopicDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  videoURL?: string;
}
