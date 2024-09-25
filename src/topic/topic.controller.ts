import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TopicService } from './topic.service';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { CreateTopicDto } from './dto/create-topic.dto';

@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get()
  async getTopics(@Param('subjectId') subjectId: number) {
    return this.topicService.getTopicsBySubject(subjectId);
  }

  @Post(':subjectId')
  async create(
    @Param('subjectId') subjectId: number,
    @Body() createTopicDto: CreateTopicDto,
  ) {
    return this.topicService.create(Number(subjectId), createTopicDto);
  }

  @Patch(':topicId')
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: './uploads/videos',
        filename: (req, file, cb) => {
          const randomName = uuidv4();
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(mp4|avi|mkv|mov)$/)) {
        
          cb(null, true);
        } else {
          cb(new Error('Only video files are allowed!'), false);
        }
      },
    }),
  )
  async updateTopic(
    @Param('topicId') topicId: number,
    @Body() updateTopicDto: UpdateTopicDto,
    @UploadedFile() video?: Express.Multer.File,
  ) {
    const videoPath = video ? `/uploads/videos/${video.filename}` : undefined;
    return this.topicService.updateTopic(+topicId, updateTopicDto, videoPath);
  }

  @Post(':topicId/complete')
  async completeTopic(
    @Param('topicId') topicId: number,
    @Param('userId') userId: number,
  ) {
    return this.topicService.markTopicAsCompleted(userId, topicId);
  }

  // // Update topic
  // @Patch(':topicId')
  // async updateTopic(
  //   @Param('topicId') topicId: number,
  //   @Body() updateTopicDto: UpdateTopicDto,
  // ) {
  //   return this.topicService.updateTopic(+topicId, updateTopicDto);
  // }

  // Delete topic
  @Delete(':topicId')
  async deleteTopic(@Param('topicId') topicId: number) {
    return this.topicService.deleteTopic(+topicId);
  }
}
