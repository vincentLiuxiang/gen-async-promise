var gap = require('..');

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