// src/swagger/like.swagger.ts

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: Blog like management operations
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
 * /api/likes/toggleLike/{blogId}:
 *   post:
 *     summary: Toggle like for a blog
 *     description: This endpoint allows authenticated users to like or unlike a blog.
 *     tags: [Likes]
 *     parameters:
 *       - name: blogId
 *         in: path
 *         required: true
 *         description: ID of the blog to toggle like
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     responses:
 *       200:
 *         description: Blog like toggled successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Blog not found
 */
