const express = require('express');
const cors = require("cors");
const app = express();
const router = require("./routes/router");
const port = process.env.PORT || 5000;
require("dotenv").config();

// Midleware-----------------------------
app.use(express.json());
app.use(cors());
app.use(router)
//--------------------------------------

app.get ("/", (req, res) => {
    res.send('Response')
    console.log(req.files)
})

app.get('/', (req, res) => {
    res.send('Ok')
})

app.listen(port, () =>{
    console.log('Running')
})