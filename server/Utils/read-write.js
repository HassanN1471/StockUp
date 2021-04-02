const { writeFileSync, readFileSync } = require("fs");

const readData = (filePath) => {
    return JSON.parse(readFileSync(filePath));
}

const writeData = (filePath, data) => {
    writeFileSync(filePath, JSON.stringify(data));
}

module.exports = { readData, writeData };