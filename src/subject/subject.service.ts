import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectService {
  constructor(private prisma: PrismaService) {}

  async getAllSubjects() {
    return this.prisma.subject.findMany();
  }

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

  async createSubject(createSubjectDto: CreateSubjectDto) {
    const { name } = createSubjectDto;

    return this.prisma.subject.create({
      data: {
        name,
      },
    });
  }

  async findAllWithTopics() {
    return this.prisma.subject.findMany({
      include: {
        topics: true,
      },
    });
  }

  async deleteSubject(id: number) {
    return this.prisma.subject.delete({
      where: { id },
    });
  }

  async updateSubject(subjectId: number, updateSubjectDto: UpdateSubjectDto) {
    const subject = await this.prisma.subject.findUnique({
      where: { id: subjectId },
    });

    if (!subject) {
      throw new NotFoundException(`Subject with ID ${subjectId} not found`);
    }

    return this.prisma.subject.update({
      where: { id: subjectId },
      data: {
        ...updateSubjectDto,
      },
    });
  }
}
