import { CreateContentDto, UpdateContentDto } from './dto/content.dto';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
import { KnowledgeService } from './knowledge.service';
import { JwtUser } from '@/common/decorators';
import { JwtAuthGuard } from '@/common/guards';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TokenPayload } from 'types';

@Controller('knowledge')
@UseGuards(JwtAuthGuard)
export class KnowledgeController {
  constructor(private knowledgeService: KnowledgeService) {}

  // @Post()
  // @UseInterceptors(FileInterceptor('file'))
  // async upload(@UploadedFile() file: Express.Multer.File) {
  //   const filePath = await this.knowledgeService.uploadMinio(file);
  //   return { message: 'success', filePath };
  // }

  // @Post('crawl')
  // CrawlWebsite(@Body() { url }: { url: string }) {
  //   return this.knowledgeService.CrawlWebsite(url);
  // }

  // FILE APIS

  @Post('/presigned')
  async presignedFile(
    @Body('fileName') fileName: string,
    @JwtUser() { team_id }: TokenPayload,
  ) {
    return this.knowledgeService.presignedMinio(fileName, team_id);
  }

  @Delete('/file')
  async deleteFile(
    @Body('fileName') fileName: string,
    @JwtUser() { team_id }: TokenPayload,
  ) {
    return this.knowledgeService.deleteFile(fileName, team_id);
  }

  // CONTENT APIS

  @Post('/content')
  createContent(@Body() dto: CreateContentDto) {
    return this.knowledgeService.createContent(dto);
  }

  @Patch('/content/:id')
  updateContent(@Body() data: UpdateContentDto) {
    return this.knowledgeService.updateContent(data);
  }

  @Delete('/content/:id')
  deleteContent(@Param('id') id: string) {
    return this.knowledgeService.deleteContent(id);
  }

  // PROJECT APIs

  @Post()
  createProject(
    @Body() { title }: CreateProjectDto,
    @JwtUser() { team_id }: TokenPayload,
  ) {
    return this.knowledgeService.createKnowledge({ title, team_id });
  }

  @Get(':id')
  getAllContent(@JwtUser() { team_id }: TokenPayload, @Param('id') id: string) {
    return this.knowledgeService.getFolderContent(team_id, id);
  }

  @Get()
  getAll(@JwtUser() { team_id }: TokenPayload) {
    return this.knowledgeService.getAll(team_id);
  }

  @Patch()
  update(@Body() projectDto: UpdateProjectDto) {
    return this.knowledgeService.updateTitle(projectDto);
  }

  @Delete(':id')
  deleteProject(@Param('id') id: string) {
    return this.knowledgeService.delete(id);
  }
}
