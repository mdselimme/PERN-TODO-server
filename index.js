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

// update a todo 

// delete a todo 


app.listen(port, () => {
    console.log("Server is started on port 5000")
});