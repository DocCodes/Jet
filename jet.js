const jet = {
  /**
   * Simple metadata
   * @type {dictionary}
   */
  meta: { 
    version: '1.2.0-b2',
    date: '11/13/2017',
    author: 'Evan Young',
    copyright: 'Copyright 2017 Evan Young'
  },

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
    let val, loc, li
    val = {}
    loc = window.location.search.replace('?', '')
    li = loc.split('&')

    for (var i = li.length - 1; i >= 0; i--) {
      let spl = li[i].split('=')
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
    let val = {}
    let valList = ['color', 'email', 'file', 'hidden', 'password', 'search', 'tel', 'time', 'text', 'url', 'week']
    let dateList = ['date', 'datetime-local', 'month']
    let decList = ['number', 'range']

    for (var i = form.length - 1; i >= 0; i--) {
      let el = form[i]
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
  },

  /**
   * Math functions
   * @type {dictionary}
   */
  math: {
    /**
     * Random range inclusive
     * @param  {integer} min Minimum outcome
     * @param  {integer} max Maximum outcome
     * @return {integer}     The random number
     */
    rand: function (min=0, max=1) {
      let n = Math.random()
      n *= max
      n += min
      n = Math.round(n)
      return n
    },

    /**
     * Gets a number's factorial
     * @param  {integer} n The number
     * @return {integer}   The factorial
     */
    factorial: function (n) {
      if (n < 0) {
        return 0
      } else if(n === 0) {
        return 1
      } else {
        for (var i = n - 1; i > 0; i--) {
          n *= i
        }
        return n
      }
    }
  }
};
window._ = jet