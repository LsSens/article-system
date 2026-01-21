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

### Default Users

Three users are created automatically with different permissions:

**Admin User:**
- Email: `admin@example.com`
- Password: `admin123`
- Permission: Admin

**Editor User:**
- Email: `editor@example.com`
- Password: `editor123`
- Permission: Editor

**Reader User:**
- Email: `reader@example.com`
- Password: `reader123`
- Permission: Reader

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

### Users

- `GET /users` - List all users (Admin only)
- `GET /users/:id` - Get user by ID (Admin can access any user, others can only access own data)
- `POST /users` - Create new user (Admin only)
- `PATCH /users/:id` - Update user (Admin can update any user, others can only update own data)
- `DELETE /users/:id` - Delete user (Admin can delete any user, others can only delete own data)

### Articles

- `GET /articles` - List all articles (Admin, Editor, Reader)
- `GET /articles/:id` - Get article by ID (Admin, Editor, Reader)
- `POST /articles` - Create new article (Admin, Editor)
- `PATCH /articles/:id` - Update article (Admin can update any article, Editor can only update articles they created)
- `DELETE /articles/:id` - Delete article (Admin can delete any article, Editor can only delete articles they created)

### Permissions (Admin only)

- `GET /permissions` - List all permissions

## Permissions

- **Admin**: Full access to users and articles
  - Can list, view, create, update and delete any user
  - Can edit/delete any article
- **Editor**: Can create articles and can only edit/delete articles they created
  - Can view and update own user data
- **Reader**: Read-only access to articles
  - Can view and update own user data

## Technology Stack

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- JWT
- Docker
