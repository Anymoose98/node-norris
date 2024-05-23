require('dotenv').config();
const { match } = require('assert');
const { config } = require('dotenv');
const http = require("http");
const host = process.env.host
const port = process.env.port

// Chiamata Api
let responseApi

const fetch = require("node-fetch");
const fetchData = async function (){
    try {
        const response = await fetch(`https://api.chucknorris.io/jokes/random`)
        const data = await response.json()
        responseApi =data.value
    } catch (err) {
        console.error(err)
        return false
    }
    };
fetchData();


// lettura e scrittura su file
const path = require('path');
const filePath = path.join("norrisDB.json")
const fs = require('fs');

fs.readFile('norrisDB.json', function(err, data) {
// console.log(data.toString())
});

fs.appendFile("norrisDB.json",
`${responseApi}`,
function (err) {
if (err) throw err;
});



// Server
http
    .createServer(function(req, res){
        res.writeHead(200, {
            "content-Type":"text/html; charset=utf-8"
        });
        res.end(
            `<h1>${responseApi}</h1>
             `
        );
    })
    .listen(port, host, () => {
        const serverUrl = `http://${host}:${port}`
    })



