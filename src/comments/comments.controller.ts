import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Res,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { AddCommentDto } from '../dto/add-comment.dto';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly comments_service: CommentsService) {}

  @Get('getAll')
  async getAll(@Res() res: Response) {
    const data = await this.comments_service.getAll();
    res.json(data);
  }

  @Post('/add')
  async add(@Body() dto: AddCommentDto, @Res() res: Response) {
    const data = await this.comments_service.add(dto);
    res.json(data);
  }

  @Delete('/delete/:id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const data = await this.comments_service.remove(Number(id));
    res.json(data);
  }
}
