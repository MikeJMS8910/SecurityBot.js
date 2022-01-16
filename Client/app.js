const express = require('express');
const app = express();

app.listen(3000);

console.log("listening on port 3000")

app.get('/', (req, res) => {
    res.sendFile(__dirname+"/index.html");
});

app.get('/indexjs', (req, res) => {
    res.sendFile(__dirname+"/index.js")
})

app.get("/securityjs", (req, res) => {
    res.sendFile(__dirname+"/client-securitybot.js")
});