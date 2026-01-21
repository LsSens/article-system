import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../entities/article.entity';
import { User } from '../entities/user.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createArticleDto: CreateArticleDto, userId: string): Promise<Article> {
    const author = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    const article = this.articleRepository.create({
      ...createArticleDto,
      authorId: userId,
    });

    return this.articleRepository.save(article);
  }

  async findAll(): Promise<Article[]> {
    return this.articleRepository.find({
      relations: ['author'],
      select: {
        author: {
          id: true,
          name: true,
          email: true,
        },
      },
    });
  }

  async findOne(id: string): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['author'],
      select: {
        author: {
          id: true,
          name: true,
          email: true,
        },
      },
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article;
  }

  async update(
    id: string,
    updateArticleDto: UpdateArticleDto,
    userId: string,
    userPermission: string,
  ): Promise<Article> {
    const article = await this.findOne(id);

    if (userPermission !== 'admin' && article.authorId !== userId) {
      throw new ForbiddenException('You can only edit your own articles');
    }

    Object.assign(article, updateArticleDto);
    return this.articleRepository.save(article);
  }

  async remove(id: string, userId: string, userPermission: string): Promise<void> {
    const article = await this.findOne(id);

    if (userPermission !== 'admin' && article.authorId !== userId) {
      throw new ForbiddenException('You can only delete your own articles');
    }

    await this.articleRepository.remove(article);
  }
}
