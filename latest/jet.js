const jet = {
  version: '1.0.0',
  date: '11/6/2017',

  format: function (str, args) {
    str = str.replace(/%{[0-z]*}/g, function (k) {
      return args[k.replace(/[^0-z]/g, '')]
    })
    return str
  },
  getHash: function () {
    var val, loc, li
    val = {}
    loc = location.search.replace('?', '')
    li = loc.split('&')

    for (var i = li.length - 1; i >= 0; i--) {
      var spl = li[i].split('=')
      val[spl[0]] = spl[1].replace(/\+/g, ' ')
    }
    return val
  }
}