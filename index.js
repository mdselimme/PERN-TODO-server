const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db");
const port = 5000 || process.env.PORT;

app.use(cors());
app.use(express.json());

// All Routes 
// default route
app.get('/', (req, res) => {
    res.send("Postgress Server is running");
})

// create a todo 
app.post("/todos", async (req, res) => {
    try {
        console.log(req.body)
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        );
        res.json(newTodo);
    } catch (error) {
        console.error(error.message);
    }
});

// get all todos 
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.send(allTodos.rows);
    } catch (error) {
        console.error(error.message);
    }
})

// get a todo 
app.get("/todos/:id", async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const todo = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1",
            [id]
        );
        res.send(todo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
})

// update a todo 
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",
            [description, id]
        );
        res.json("Todo is Updated");
    } catch (error) {
        console.error(error.message);
    }
})


// delete a todo 
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1",
            [id]
        );
        res.json("Todo is Deleted!");
    } catch (error) {
        console.error(error.message);
    }
})

app.listen(port, () => {
    console.log("Server is started on port 5000")
});