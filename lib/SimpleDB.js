const { writeFile, readFile } = require('fs/promises');
const path = require('path');
const shortid = require('shortid');

class SimpleDB {
  constructor(rootDir) {
    const fileName = `${shortid.generate()}.json`;
    this.file = path.join(rootDir, fileName);
  }
  //save function
  save(newObject) {
    //generate new ID for file
    const newId = shortid.generate();
    //
    newObject.id = newId;
    //
    const stringObject = JSON.stringify(newObject);

    return writeFile(this.file, stringObject);
  }
}

module.exports = SimpleDB;
