require('dotenv').config();

const { match } = require('assert');
const { config } = require('dotenv');
const http = require("http");
const host = process.env.host
const port = process.env.port

// Chiamata Api
let responseApi
const fetch = require("node-fetch");
const fetchData = () => {
fetch(`https://api.chucknorris.io/jokes/random`)
.then(response => response.json())
.then(data => {
    responseApi = data.value;
    console.log(responseApi);
  })
};
fetchData();

// Server
http
    .createServer(function(req, res){
        res.writeHead(200, {
            "content-Type":"text/html; charset=utf-8"
        });
        res.end(
            `<h1>${data.value}</h1>
             `
        );
    })
    .listen(port, host, () => {
        const serverUrl = `http://${host}:${port}`
    })



