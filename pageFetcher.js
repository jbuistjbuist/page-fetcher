const fs = require('fs');
const request = require('request');

const input = process.argv.slice(2);
const URL = input[0];
const path = input[1];

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


const fileExists = function(path, body, callback) {
  fs.access(path, fs.F_OK, (err) => {
    if (err) {
      callback(path, body, downloadedMessage);
    } else {
      console.log('File already exists!');
    }
  });
};