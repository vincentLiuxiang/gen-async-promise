module.exports = function (api) {
  return function () {
    return new Promise((res,rej) => {
      api(...arguments, function (err) {
        if (err) return rej(err);
        if (arguments.length > 2) {
          return res([].slice.call(arguments,1))
        }
        res(arguments[1]);
      })
    })
  }
}