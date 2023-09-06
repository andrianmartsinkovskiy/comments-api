import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Comment } from '../entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddCommentDto } from '../dto/add-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private comment_repository: Repository<Comment>,
  ) {}
  async getAll(): Promise<Comment[]> {
    return await this.comment_repository.find({
      order: {
        created_at: {
          direction: 'DESC',
        },
      },
    });
  }

  async add(dto: AddCommentDto) {
    const newComment = new Comment();
    newComment.text = dto.text;
    await this.comment_repository.save(newComment);
    return {
      message: 'Comment successfully added',
    };
  }

  async remove(id) {
    const comment = await this.comment_repository.findOne({ where: { id } });
    if (!comment) {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }

    await this.comment_repository.remove(comment);
    return { message: 'Comment successfully removed' };
  }
}
