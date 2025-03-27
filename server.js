import express from "express";

const app = express();

app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server is running in http://localhost:${PORT}`);
});

let users: [
    {
        id: 1, name: "Philip", gender: "male",
    },
    {
        id: 2, name: "Sara", gender: "female",
    },
];

app.get("/users", (req, res) => {
    res.json(users);
});

app.post("/users", (req, res) => {
    const newUser = {
        id: users.length +1,
        title: req.body.name,
        gender: req.body.gender,
    };
    users.push(newUser);
    res.json({ message: "User added succesfully!", user: newUser});
});