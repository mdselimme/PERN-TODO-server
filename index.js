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
    } catch (error) {
        console.error(error.message);
    }
});

app.listen(5000, () => {
    console.log("Server is started on port 5000")
});