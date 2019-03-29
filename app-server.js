const express = require('express');
const app = express();
const path = require('path');

app.use('/', express.static(__dirname + '/'));
app.get('/*', (req, res) => {

    res.sendFile(path.join(__dirname + '/index.html'));

})
console.log("__dirname:", __dirname);


const hostname = 'localhost';
const port = 3000;


app.listen(port, hostname, function() {
    console.log(`Front-end App server: http://${hostname}:${port}`)
});