import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
app.use(express.json());

const PORT = 3000;

// Swagger setup
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "User API",
            version: "1.0.0",
            description: "A simple API to manage users",
        },
    },
    apis: ["./server.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

let users = [
    { id: 1, name: "Philip", gender: "male" },
    { id: 2, name: "Sara", gender: "female" },
];

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Returns an array of users.
 *     responses:
 *       200:
 *         description: A list of users.
 */
app.get("/users", (req, res) => {
    res.json(users);
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Add a new user
 *     description: Creates a new user and returns it.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               gender:
 *                 type: string
 *     responses:
 *       201:
 *         description: User added successfully.
 */
app.post("/users", (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        gender: req.body.gender,
    };
    users.push(newUser);
    res.status(201).json({ message: "User added successfully!", user: newUser });
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     description: Updates an existing user's details.
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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               gender:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       404:
 *         description: User not found.
 */
app.put("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ message: "User not found!" });
    }
    user.name = req.body.name || user.name;
    user.gender = req.body.gender || user.gender;
    res.json({ message: "User updated successfully!", user });
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Removes a user from the list.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
 */
app.delete("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((u) => u.id === userId);
    if (!user) {
        return res.status(404).json({ message: "User not found!" });
    }
    users = users.filter((u) => u.id !== userId);
    res.json({ message: "User deleted successfully!", deletedUser: user });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
