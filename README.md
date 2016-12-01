# gen-async-promise

[![Build Status](https://travis-ci.org/vincentLiuxiang/gen-async-promise.svg?branch=master)](https://travis-ci.org/vincentLiuxiang/gen-async-promise) [![Coverage Status](https://coveralls.io/repos/github/vincentLiuxiang/gen-async-promise/badge.svg?branch=master)](https://coveralls.io/github/vincentLiuxiang/gen-async-promise?branch=master)

> the goal of gen-async-promise is transform all of the callback based async functions to an async/await based promise function

## for example
```javascripts
var fs = require('fs');
fs.readFile(__filename , (err, buffer) => {
  if (err) return console.log(err);
  console.log(buffer.toString())
})
```
gen-async-promise :

```javascripts
var gap = require('gen-async-promise');
var fs = require('fs');
var readFile = gap(fs.readFile);
var r = async function() {
  try {
    var buffer = await readFile(__filename);
    console.log(buffer.toString())
  } catch(e) {
    console.log(e)
  }
}
r();
```
try/catch will capture the error;

if the callback function contains More than two parameters, just like:

```javascripts
var mysql = require('mysql');
var pool  = mysql.createPool({
  ...
});

pool.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;
  console.log('The solution is: ', rows[0].solution);
});
```
the callback function contains err, rows, fields three parameters , in the case, gen-async-promise will return a array:

```javascripts
var gap = require('gen-async-promise');
var mysql = require('mysql');
var pool  = mysql.createPool({
  ...
});
var query = gap(pool.query);
var r = async function() {
  var [rows, fields] = await query('SELECT 1 + 1 AS solution');
}
r()
```
another:

```javascripts
var gap = require('gen-async-promise');

var sleep = gap(function (m,cb) {
  setTimeout(() => {
    cb(null,'hello','world')
  }, m);
});

var r = async function() {
  try {
    var [a,b] = await sleep(1000);
    console.log(a,b)
  } catch(e) {
    console.log(e)
  }
}
r();
```





