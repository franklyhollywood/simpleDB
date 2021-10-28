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

  it('should save file into directory', () => {
    //create file

    const newFile = { text: 'Hello world' };
    const simpleDB = new SimpleDB(rootDir);
    return simpleDB
      .save(newFile)
      .then(() => simpleDB.get(newFile.id))
      .then((contents) => expect(contents).toEqual(newFile));
  });
});
