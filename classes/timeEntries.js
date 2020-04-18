
const parse = require('csv-parse/lib/sync');
const fs = require('fs');

class TimeEntries {

  constructor (fileName) {
    this.data = '';
    this.records = [];
    this.fileName = fileName;
    this.read();
  }

  read () {
    this.data = this.readFromFile(this.fileName);
    this.records = this.convertRecordsFromCsv(this.data);
  }

  readFromFile (fileName) {
    return fs.readFileSync(fileName, 'utf8');
  }

  convertRecordsFromCsv (data) {
    return parse(data, {
      columns: true,
      skip_empty_lines: true
    })
  }

  getRecords () {
    return this.records;
  }
}

module.exports = { TimeEntries };
