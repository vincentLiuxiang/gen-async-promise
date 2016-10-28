module.exports = function (api) {
  return function () {
    return new Promise((res,rej) => {
      var cb = function (err) {
        if (err) return rej(err);
        if (arguments.length > 2) return res([].slice.call(arguments,1))
        res(arguments[1]);
      }
      if (arguments.length) return api(...arguments,cb);
      api(cb);
    })
  }
}