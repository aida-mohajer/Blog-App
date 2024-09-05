// src/swagger/user.swagger.ts
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management operations
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: Create a new user
 *     description: This endpoint allows users to sign up.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: number
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login
 *     description: This endpoint allows users to log in.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/users/delete-user:
 *   delete:
 *     summary: Delete a user
 *     description: This endpoint allows users to delete their account.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: User not found
 */
