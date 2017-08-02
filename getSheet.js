var Tabletop = require('tabletop')

module.exports = function getSheet (key, callback) {
  Tabletop.init({ 
    key: key,
    callback: function gotData (data, tabletop) {
      callback(data)
    },
    simpleSheet: true 
  })
}