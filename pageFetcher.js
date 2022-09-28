const fs = require('fs');
const request = require('request');
const readline = require("readline");

const input = process.argv.slice(2);
const URL = input[0];
const path = input[1];

const startReadLine = function(path, body, callback) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question("File already exists. Would you like to overwrite it? (enter y to overwrite or n to exit program)\n\n", (answer) => {
    if (String(answer) === 'n') {
      process.exit();
    }
    if (String(answer) === 'y') {
      // eslint-disable-next-line no-undef
      callback(path, body, downloadedMessage);
      rl.close();
    }
  });
};


const fileExists = function(path, body, callback) {
  fs.access(path, fs.F_OK, (err) => {
    if (err) {
      callback(path, body, downloadedMessage);
    } else {
      startReadLine(path, body, downloadToFile);
    }
  });
};

const downloadedMessage = function(body) {
  console.log(`Downloaded and saved ${body.length} bytes to ${path}`);
};


const downloadToFile = function(path, body, callback) {
  fs.writeFile(path, body, (error) => {
    if (error) {
      console.log("error oops hehe");
    } else {
      callback(body);
    }
  });
};

request(URL, (error, response, body) => {
  if (error) {
    console.log(error, 'Your request failed with code\n', error.code);
  }
  
  if (!error) {
    fileExists(path, body, downloadToFile);
  }
});


