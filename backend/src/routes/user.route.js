import express from 'express';
import UserController from '../controllers/user.controller.js';
import Middleware from '../utils/middleware.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         accountStatus:
 *           type: string
 *           enum: [active, change_password, locked]
 *       example:
 *         firstName: "John"
 *         lastName: "Doe"
 *         email: "john.doe@example.com"
 *         accountStatus: "change_password"
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         $ref: '#/components/responses/400'
 *       409:
 *         $ref: '#/components/responses/409'
 */
router.post("/", Middleware.asyncHandler(UserController.create));

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", Middleware.asyncHandler(UserController.getAll));

/**
 * @swagger
 * /api/users/{email}:
 *   get:
 *     summary: Get user by email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         $ref: '#/components/responses/404'
 */
router.get("/:email", Middleware.asyncHandler(UserController.getByEmail));

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user details
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       204:
 *         description: User updated
 *       400:
 *         $ref: '#/components/responses/400'
 *       404:
 *         $ref: '#/components/responses/404'
 */
router.put("/:id", Middleware.asyncHandler(UserController.update));

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: User deleted
 *       404:
 *         $ref: '#/components/responses/404'
 */
router.delete("/:id", Middleware.asyncHandler(UserController.delete));

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         $ref: '#/components/responses/400'
 *       403:
 *         $ref: '#/components/responses/403'
 */
router.post("/login", Middleware.asyncHandler(UserController.login));

/**
 * @swagger
 * /api/users/{email}/change_password:
 *   put:
 *     summary: Change user password
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         $ref: '#/components/responses/400'
 *       403:
 *         $ref: '#/components/responses/403'
 */
router.put("/:email/change_password", Middleware.asyncHandler(UserController.changePassword));

export default router;
