const { mkdir, rm } = require('fs/promises');
const SimpleDB = require('../lib/SimpleDB');

//is rootdir in store?
describe('SimpleDB', () => {
  const rootDir = './__tests__/store';

  beforeEach(() => {
    return rm(rootDir, { force: true, recursive: true }).then(() =>
      mkdir(rootDir, { recursive: true })
    );
  });
  //should save file in
  it('should save file into directory, and gets file by id', () => {
    //create file

    const newFile = { text: 'Hello world' };
    const simpleDB = new SimpleDB(rootDir);
    return simpleDB
      .save(newFile)
      .then(() => simpleDB.get(newFile.id))
      .then((contents) => expect(contents).toEqual(newFile));
  });
  it('should get all the files', () => {
    //save at least two files
    //use get all function
    //set up expectation - an array and inside array is objects that ID and text inside it.
    const simpleDB = new SimpleDB(rootDir);
    const newFile = { text: 'Hello world' };
    const secondFile = { text: 'Hello World 2' };
    const expectation = [
      { id: expect.any(String), text: 'Hello world' },
      { id: expect.any(String), text: 'Hello World 2' },
    ];
    return simpleDB
      .save(newFile)
      .then(() => simpleDB.save(secondFile))
      .then(() => simpleDB.getAll())
      .then((files) => expect(files).toEqual(expectation));
  });
});
