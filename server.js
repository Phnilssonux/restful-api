import express from "express";

const app = express();
app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server is running in http://localhost:${PORT}`);
});

let users = [
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
        id: users.length + 1,
        name: req.body.name,
        gender: req.body.gender,
    };
    users.push(newUser);
    res.json({ message: "User added succesfully!", user: newUser});
});

app.put("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if(!user) {
        return res.status(404).json({message: "User not found!"});
    }
    user.name = req.body.name || user.name;
    user.gender = req.body.gender || user.gender;
    res.json({message: "User updated successfully!", user });
});

app.delete("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((u) => u.id === userId);

    if (!user) {
        return res.status(404).json({ message: "User not found!" });
    }

    users = users.filter((u) => u.id !== userId);

    res.json({ message: "User deleted successfully!", deletedUser: user });
});