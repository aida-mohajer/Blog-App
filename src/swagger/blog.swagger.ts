/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Blog management operations
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
 * /api/blogs/:
 *   post:
 *     summary: Create a new blog
 *     description: This endpoint allows authenticated users to create a new blog.
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     security:
 *       - bearerAuth: []  # This indicates that the bearer token is required
 *     responses:
 *       201:
 *         description: Blog created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized, user not authenticated
 */

/**
 * @swagger
 * /api/blogs/:
 *   get:
 *     summary: Get all blogs
 *     description: This endpoint retrieves a paginated list of all blogs.
 *     tags: [Blogs]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: Number of blogs per page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: A list of blogs
 *       404:
 *         description: No blogs found
 */

/**
 * @swagger
 * /api/blogs/{blogId}:
 *   get:
 *     summary: Get a blog by ID
 *     description: This endpoint retrieves a specific blog by its ID.
 *     tags: [Blogs]
 *     parameters:
 *       - name: blogId
 *         in: path
 *         required: true
 *         description: ID of the blog to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog retrieved successfully
 *       404:
 *         description: Blog not found
 */

/**
 * @swagger
 * /api/blogs/{blogId}:
 *   put:
 *     summary: Update a blog by ID
 *     description: This endpoint allows authenticated users to update an existing blog.
 *     tags: [Blogs]
 *     parameters:
 *       - name: blogId
 *         in: path
 *         required: true
 *         description: ID of the blog to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Blog not found
 */

/**
 * @swagger
 * /api/blogs/{blogId}:
 *   delete:
 *     summary: Delete a blog by ID
 *     description: This endpoint allows authenticated users to delete a blog.
 *     tags: [Blogs]
 *     parameters:
 *       - name: blogId
 *         in: path
 *         required: true
 *         description: ID of the blog to delete
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     responses:
 *       204:
 *         description: Blog deleted successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Blog not found
 */
