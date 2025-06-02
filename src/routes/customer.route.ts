import { Router } from "express";
import { CustomerController } from "../controllers/customer.controller";

const customerController = new CustomerController();
const router = Router();

router.get("/", customerController.getAllCustomers);
router.get("/:customerId", customerController.getCustomerById);
router.post("/", customerController.createCustomer);
router.put("/:customerId", customerController.updateCustomer);
router.delete("/:customerId", customerController.deleteCustomer);

export default router;

/**
 * @openapi
 * openapi: 3.0.0
 * info:
 *   title: Customer API
 *   version: 1.0.0
 *   description: API for managing customers
 * servers:
 *   - url: http://localhost:3000
 */

/**
 * @openapi
 * /customers:
 *   get:
 *     summary: Get all customers
 *     tags:
 *       - Customers
 *     responses:
 *       200:
 *         description: Successfully retrieved customers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Retrieved customers successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Customer'
 */

/**
 * @openapi
 * /customers:
 *   post:
 *     summary: Create a new customer
 *     tags:
 *       - Customers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCustomerDTO'
 *     responses:
 *       201:
 *         description: Created new customer successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Created new customer successfully
 *                 data:
 *                   $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Validation failed
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       path:
 *                         type: string
 *                         example: email
 *                       message:
 *                         type: string
 *                         example: Invalid email format
 *       500:
 *         description: Internal server error
 */

/**
 * @openapi
 * /customers/{customerId}:
 *   get:
 *     summary: Get a customer by ID
 *     tags:
 *       - Customers
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the customer
 *     responses:
 *       200:
 *         description: Customer retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Retrieved customer successfully
 *                 data:
 *                   $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Customer not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Customer with the provided ID was not found
 *       500:
 *         description: Internal server error
 */

/**
 * @openapi
 * /customers/{customerId}:
 *   put:
 *     summary: Update a customer by ID
 *     tags:
 *       - Customers
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCustomerDTO'
 *     responses:
 *       200:
 *         description: Updated customer successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Updated customer successfully
 *                 data:
 *                   $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Internal server error
 */

/**
 * @openapi
 * /customers/{customerId}:
 *   delete:
 *     summary: Delete a customer by ID
 *     tags:
 *       - Customers
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the customer
 *     responses:
 *       204:
 *         description: Deleted customer successfully
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Internal server error
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 664f2cb45e12c41804cbb9f2
 *         firstName:
 *           type: string
 *           example: Jane
 *         lastName:
 *           type: string
 *           example: Doe
 *         email:
 *           type: string
 *           example: jane@example.com
 *         phone:
 *           type: string
 *           example: +1234567890
 *         address:
 *           type: string
 *           example: 123 Main St, City, Country
 *     CreateCustomerDTO:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - phone
 *         - address
 *       properties:
 *         firstName:
 *           type: string
 *           example: John
 *         lastName:
 *           type: string
 *           example: Smith
 *         email:
 *           type: string
 *           example: john@example.com
 *         phone:
 *           type: string
 *           example: +1234567890
 *         address:
 *           type: string
 *           example: 456 Elm St, City, Country
 *     UpdateCustomerDTO:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           example: John
 *         lastName:
 *           type: string
 *           example: Smith
 *         email:
 *           type: string
 *           example: john@example.com
 *         phone:
 *           type: string
 *           example: +1234567890
 *         address:
 *           type: string
 *           example: 456 Elm St, City, Country
 */
