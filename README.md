# 📝 Blog App

A simple blog application built with **Express.js**, **TypeScript**, **TypeORM**, and **Microsoft SQL Server (MSSQL)**. This project allows users to create, manage, and interact with blog posts seamlessly.

## 🌟 Features

- 👤 **User Management**: Register and authenticate users.
- 📝 **Blog Management**: Create, read, update, and delete blog posts.
- ❤️ **Like System**: Users can like blog posts to show appreciation.
- 🔍 **Search Functionality**: Easily find blogs by title or content.

## 🛠️ Technologies

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Web framework for Node.js to build APIs.
- **TypeScript**: Superset of JavaScript that adds static types.
- **TypeORM**: ORM for TypeScript and JavaScript to interact with databases.
- **Microsoft SQL Server**: Relational database management system.

## 🚀 Getting Started

### 📋 Prerequisites

- Node.js
- Microsoft SQL Server
- TypeScript

### 📥 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/aida-mohajer/blog-app.git
   cd blog-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure your database connection in the `ormconfig.json` file.

4. Start the application:
   ```bash
   npm run start
   ```

## 📡 API Endpoints

- **User**:

  - `POST /api/users/signup`: Signup a new user
  - `POST /api/users/login`: Login an existing user
  - `POST /api/users/delete-user`: Delete an existing user

- **Blog**:

  - `GET /api/users/blogs`: Get all blogs
  - `GET /api/users/blog/:id`: Get a blogs
  - `POST /api/users/blog`: Create a new blog
  - `PUT /api/usuers/blog/:id`: Update a blog
  - `DELETE /api/users/blog/:id`: Delete a blog

- **Likes**:
  - `POST /api/users/toggleLike/:id`: Like/unlike a blog post
