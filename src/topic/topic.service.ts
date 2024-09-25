import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';

@Injectable()
export class TopicService {
  constructor(private prisma: PrismaService) {}

  async getTopicsBySubject(subjectId: number) {
    return this.prisma.topic.findMany({
      where: { subjectId },
    });
  }

  async markTopicAsCompleted(userId: number, topicId: number) {
    return this.prisma.completion.create({
      data: {
        userId,
        topicId,
      },
    });
  }

  async updateTopic(
    topicId: number,
    updateTopicDto: UpdateTopicDto,
    videoPath?: string,
  ) {
    const topic = await this.prisma.topic.findUnique({
      where: { id: topicId },
    });

    if (!topic) {
      throw new NotFoundException(`Topic with ID ${topicId} not found`);
    }

    return this.prisma.topic.update({
      where: { id: topicId },
      data: {
        ...updateTopicDto,
        videoURL: videoPath || topic.videoURL,
      },
    });
  }

  async create(subjectId: number, createTopicDto: CreateTopicDto) {
    console.log(createTopicDto);
    return this.prisma.topic.create({
      data: {
        title: createTopicDto.title,
        videoURL: createTopicDto.videoURL,
        description: createTopicDto.description,
        subject: {
          connect: { id: subjectId },
        },
      },
    });
  }

  async deleteTopic(topicId: number) {
    const topic = await this.prisma.topic.findUnique({
      where: { id: topicId },
    });

    if (!topic) {
      throw new NotFoundException(`Topic with ID ${topicId} not found`);
    }

    return this.prisma.topic.delete({
      where: { id: topicId },
    });
  }
}
