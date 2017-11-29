const jet = {
  /**
   * Simple metadata
   * @since 1.1.2
   * @type {dictionary}
   */
  meta: {
    version: '2.0.2',
    scheme: 'https://semver.org/',
    date: '11/13/2017',
    author: 'Evan Young',
    copyright: 'Copyright 2017 Evan Young'
  },

  /**
   * Gets the GET values in the url
   * @since 1.0.0
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
   * @since 1.1.0
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
   * Iterates through an object's keys
   * @since 1.2.0
   * @param  {object}   obj  The object with keys
   * @param  {function} func The function to iterate through
   */
  iterKeys: function (obj, func) {
    keys = Object.keys(obj)
    for (var i = keys.length - 1; i >= 0; i--) {
      k = keys[i]
      v = obj[k]
      func(k, v)
    }
  },

  /**
   * Math functions
   * @since 1.2.0
   * @type {dictionary}
   */
  math: {
    /**
     * The golden ratio
     * @since 1.2.0
     * @type {decimal}
     */
    GOLD: (Math.sqrt(5)+1)/2,

    /**
     * Random range inclusive
     * @since 1.2.0
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
     * @since 1.2.0
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
}
window._ = jet
