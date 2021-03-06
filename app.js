'use strict';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

/**
 * takes a file and makes it's contents uppercase then resaves it
 * @param {*} filepath
 */
const alterFile = async (filepath) => {
  const file = await getFile(filepath);
  let fileContent = upperCaseFile(file);
  await saveFile(filepath, fileContent)
}

/**
 * make file content upper case
 * @param {*} filepath
 * @returns {*} the contents of the file as a string
 */
const getFile = async (filepath) => {
  return readFile(filepath)
    .then(data => {
      return data.toString();
    })
    .catch(error => {
      socket.emit('file-error', error);
    })
};

/**
 * make file content upper case
 * @param {*} fileContent
 * @returns {*} the contents of the file upper cased
 */
const upperCaseFile = (fileContent) => {
  return fileContent.toUpperCase();
};

/**
 * make file content lower case
 * @param {*} fileContent
 * @returns {*} the contents of the file lower cased
 */
const lowerCaseFile = (fileContent) => {
  return fileContent.toLowerCase();
};

/**
 * saves fileContent to filePath location
 * @param {*} filepath
 * @param {*} fileContent
 */
const saveFile = async (filepath, fileContent) => {
  return writeFile(filepath, Buffer.from(fileContent))
    .then(() => {
      socket.emit('file-save', 'File has been saved');
    })
    .catch(error => {
      socket.emit('file-error', error);
    })
};

let testFilePath = './test-content.txt'
alterFile(testFilePath);

//Why is it giving me an error with alterFile function?

