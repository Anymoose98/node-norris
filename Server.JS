require('dotenv').config();
const { match } = require('assert');
const { config } = require('dotenv');
const http = require("http");
const host = process.env.host
const port = process.env.port
const path = require('path');
const fs = require('fs');
const FILE_PATH = path.join(__dirname, 'norrisDb.json');

// Chiamata Api

const fetch = require("node-fetch");
const fetchData = async function () {
    try {
        const response = await fetch('https://api.chucknorris.io/jokes/random')
        const data = await response.json()
        return data.value
    } catch (err) {
        return console.log('error')
    }
};


// lettura e scrittura su file



// const responseApiJson = JSON.parse(`{"value":"${responseApi}"}`)
// console.log(responseApiJson)

// fs.appendFile("norrisDB.json",
// `{"value":"${responseApi}"}`,
// function (err) {
// if (err) throw err;
// });

const readJson = () => {
    const jokes = fs.readFileSync(FILE_PATH, 'utf-8');
    if (jokes.length === 0) return [];
    return JSON.parse(jokes);
}

const writeJson = (joke) => {
    const jokes = readJson();
    jokes.push(joke);
    fs.writeFileSync(FILE_PATH, JSON.stringify(jokes))
}




// Server
http
    .createServer(async function (req, res) {
        if(req.url === '/favicon.ico'){
            res.writeHead(404);
            res.end();
            return;
        }
        const joke = await fetchData();
        writeJson(joke);
        res.writeHead(200, {
            "content-Type": "text/html; charset=utf-8"
        });
        res.end(
            `<h1>${joke}</h1>
             `
        );
    })
    .listen(port, host, () => {
        const serverUrl = `http://${host}:${port}`
    })



