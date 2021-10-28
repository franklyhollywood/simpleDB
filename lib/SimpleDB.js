const { writeFile, readFile } = require('fs/promises');
const path = require('path');
const shortid = require('shortid');

class SimpleDB {
  constructor(rootDir) {
    this.rootDir = rootDir;
  }
  //save function
  save(newObject) {
    //generate new ID for file
    const newId = shortid.generate();
    const fileName = `${newId}.json`;
    this.file = path.join(this.rootDir, fileName);
    //
    newObject.id = newId;
    //
    const stringObject = JSON.stringify(newObject);

    return writeFile(this.file, stringObject);
  }

  get(id) {
    const fileName = `${id}.json`;
    this.file = path.join(this.rootDir, fileName);
    //read the file name that matches the ID
    //once it gets the file, we need to parse it
    //return the parsed file
    const parsedFile = readFile(this.file, 'utf8').then((file) =>
      JSON.parse(file)
    );

    return parsedFile;
  }
}

module.exports = SimpleDB;
