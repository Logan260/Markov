/** Command-line tool to generate Markov text. */
const fs = require('fs');
const markov = require('./markov');
const process = require('process');
const axios = require('axios');

function genText(text){
    let mm = new markov.MarkovMachine(text);
}

function makeText(path){
    fs.readFile(path, 'utf8', (error, data ) => {
        if(error){
            console.error(`Couldn't read file: ${path}: ${error}`);
            process.exit(1);
        }else{
            genText(data);
        }
    });
}

async function makeURLText(url){
    let res;
    try{
        res = await axios.get(url);
    }catch(error){
        console.erroe(`Couldn't read url: ${url}: ${error}`);
        process.exit(1);
    }
    genText(res.data)
}

let [method, path] = process.argv.slice(2);
if (method === "file") {
  makeText(path);
}
else if (method === "url") {
  makeURLText(path);
}
else {
  console.error(`Unknown method: ${method}`);
  process.exit(1);
}