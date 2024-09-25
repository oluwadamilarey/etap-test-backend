import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Delete(':id')
  async deleteSubject(@Param('id') id: number) {
    return this.subjectService.deleteSubject(Number(id));
  }

  
  @Post()
  async createSubject(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectService.createSubject(createSubjectDto);
  }

  @Get()
  async getAllSubjectsWithTopics() {
    return this.subjectService.findAllWithTopics();
  }
}
