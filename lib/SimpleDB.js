const { writeFile, readFile, readdir } = require('fs/promises');
const path = require('path');
const shortid = require('shortid');
const { errorMonitor } = require('stream');

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
    return parsedFile.catch((error) => {
      if (error.code === 'ENOENT') {
        return null;
      }
      throw error;
    });
  }

  async getAll() {
    //Getting all the files in the directory
    const allFiles = await readdir(this.rootDir);

    //"map through all the files, then read the files, then parse the files"
    const parsedFiles = await Promise.all(
      allFiles.map(async (file) => {
        this.file = path.join(this.rootDir, file);
        return await readFile(this.file, 'utf8').then((file) =>
          JSON.parse(file)
        );
      })
    );
    console.log(parsedFiles);
    //return array of parsed files
    return parsedFiles;
  }
}
//.getAll()
//Returns an array of all the objects in the directory, deserialized from the corresponding files in the directory.

//The work to retrieve the files should be done in parallel (Promise.all)
module.exports = SimpleDB;
