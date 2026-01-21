# Article Management System

A simple article management system built with NestJS, TypeScript, and PostgreSQL.

## Features

- User authentication with JWT
- Role-based access control (Admin, Editor, Reader)
- User management (CRUD operations)
- Article management (CRUD operations)
- Permission system

## Requirements

- Node.js 20.11.0
- Docker and Docker Compose

## Getting Started

### Using Docker Compose

1. Clone the repository
2. Run the following command:

```bash
docker compose up --build
```

The application will be available at `http://localhost:3000`

The API documentation (Swagger) will be available at `http://localhost:3000/api`

The system will automatically:
- Set up the PostgreSQL database
- Run migrations
- Seed permissions and root user

### Default Root User

- Email: `root@admin.com`
- Password: `root123`
- Permission: Admin

## API Documentation

Interactive API documentation is available at `http://localhost:3000/api` using Swagger.

You can test all endpoints directly from the Swagger UI. To authenticate:
1. Use the `/auth/login` endpoint to get a JWT token
2. Click the "Authorize" button at the top of the Swagger page
3. Enter `Bearer <your-token>` (the word "Bearer" followed by a space and your token)
4. Click "Authorize" and then "Close"
5. Now you can test all protected endpoints

## API Endpoints

### Authentication

- `POST /auth/login` - Login and get JWT token

### Users (Admin only)

- `GET /users` - List all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Articles

- `GET /articles` - List all articles (Admin, Editor, Reader)
- `GET /articles/:id` - Get article by ID (Admin, Editor, Reader)
- `POST /articles` - Create new article (Admin, Editor)
- `PATCH /articles/:id` - Update article (Admin, Editor - own articles only)
- `DELETE /articles/:id` - Delete article (Admin, Editor - own articles only)

### Permissions (Admin only)

- `GET /permissions` - List all permissions

## Permissions

- **Admin**: Full access to users and articles
- **Editor**: Full access to articles (can only edit/delete own articles)
- **Reader**: Read-only access to articles

## Technology Stack

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- JWT
- Docker
