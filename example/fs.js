var gap = require('..');
var fs = require('fs');
var readFile = gap(fs.readFile);
var r = async function() {
  try {
    var buffer = await readFile(__filename+1);
    console.log(buffer.toString())
  } catch(e) {
    console.log(e)
  }
}
r();