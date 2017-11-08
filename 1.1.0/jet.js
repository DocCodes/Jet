const jet = {
  version: '1.1.0',
  date: '11/8/2017',
  author: 'Evan Young',
  copyright: 'Copyright 2017 Evan Young',

  /**
   * String substitution similar to python
   * @param  {string}     str  The raw string
   * @param  {dictionary} args The replacement arguments
   * @return {string}          The substituted string
   */
  format: function (str, args) {
    str = str.replace(/%{[0-z]*}/g, function (k) {
      return args[k.replace(/[^0-z]/g, '')]
    })
    return str
  },

  /**
   * Gets the GET values in the url
   * @return {dictionary} The keys and values of the variables
   */
  getHash: function () {
    var val, loc, li
    val = {}
    loc = window.location.search.replace('?', '')
    li = loc.split('&')

    for (var i = li.length - 1; i >= 0; i--) {
      var spl = li[i].split('=')
      val[spl[0]] = spl[1].replace(/\+/g, ' ')
    }
    return val
  },

  /**
   * Gets values from a form
   * @param  {form}       form The form element full of inputs
   * @return {dictionary}      The keys and values of the variables
   */
  getForm: function (form) {
    var val = {}
    let valList = ['color', 'email', 'file', 'hidden', 'password', 'search', 'tel', 'time', 'text', 'url', 'week']
    let dateList = ['date', 'datetime-local', 'month']
    let decList = ['number', 'range']

    for (var i = form.length - 1; i >= 0; i--) {
      var el = form[i]
      if (el.type === 'checkbox') {
        val[el.name] = el.checked
      } else if (el.type === 'radio' && el.checked) {
        val[el.name] = el.value
      } else if (valList.indexOf(el.type) !== -1) {
        val[el.name] = el.value
      } else if (dateList.indexOf(el.type) !== -1) {
        val[el.name] = new Date(el.value)
      } else if (decList.indexOf(el.type) !== -1) {
        val[el.name] = parseFloat(el.value) || 0
      }
    }
    return val
  }
};
window._ = jet