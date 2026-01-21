import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';

@ApiTags('Articles')
@ApiBearerAuth('JWT-auth')
@Controller('articles')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @RequirePermissions('admin', 'editor')
  @ApiOperation({ summary: 'Create a new article' })
  @ApiResponse({ status: 201, description: 'Article created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin or Editor only' })
  create(
    @Body() createArticleDto: CreateArticleDto,
    @CurrentUser() user: any,
  ) {
    return this.articlesService.create(createArticleDto, user.id);
  }

  @Get()
  @RequirePermissions('admin', 'editor', 'reader')
  @ApiOperation({ summary: 'Get all articles' })
  @ApiResponse({ status: 200, description: 'List of articles' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  @RequirePermissions('admin', 'editor', 'reader')
  @ApiOperation({ summary: 'Get article by ID' })
  @ApiParam({ name: 'id', description: 'Article UUID' })
  @ApiResponse({ status: 200, description: 'Article found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Article not found' })
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  @Patch(':id')
  @RequirePermissions('admin', 'editor')
  @ApiOperation({ summary: 'Update article' })
  @ApiParam({ name: 'id', description: 'Article UUID' })
  @ApiResponse({ status: 200, description: 'Article updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Can only edit own articles unless Admin' })
  @ApiResponse({ status: 404, description: 'Article not found' })
  update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
    @CurrentUser() user: any,
  ) {
    return this.articlesService.update(
      id,
      updateArticleDto,
      user.id,
      user.permission,
    );
  }

  @Delete(':id')
  @RequirePermissions('admin', 'editor')
  @ApiOperation({ summary: 'Delete article' })
  @ApiParam({ name: 'id', description: 'Article UUID' })
  @ApiResponse({ status: 200, description: 'Article deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Can only delete own articles unless Admin' })
  @ApiResponse({ status: 404, description: 'Article not found' })
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.articlesService.remove(id, user.id, user.permission);
  }
}
