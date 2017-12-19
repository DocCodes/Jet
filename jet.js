/*
██████  ██████   ██████  ████████  ██████  ████████ ██    ██ ██████  ███████
██   ██ ██   ██ ██    ██    ██    ██    ██    ██     ██  ██  ██   ██ ██
██████  ██████  ██    ██    ██    ██    ██    ██      ████   ██████  █████
██      ██   ██ ██    ██    ██    ██    ██    ██       ██    ██      ██
██      ██   ██  ██████     ██     ██████     ██       ██    ██      ███████
*/
// <region> String
/**
 * Gets a string's title
 * @since 2.2.0
 * @return {string}      The titled string
 */
if (String.toTitleCase === undefined) {
  String.prototype.toTitleCase = function () {
    return this.toLowerCase().split(' ').map(function(word) {
      return (word.charAt(0).toUpperCase())+(word.slice(1))
    }).join(' ')
  }
}
// </region>

// <region> Numbers
/**
* Limits an integer to a specific range
* @since 2.2.0
* @param  {int} min The lower bound
* @param  {int} max The upper bound
* @return {int}     The number in range
*/
Number.prototype.clamp = function(min = 0, max = 1000000) {
  return Math.min(Math.max(this, min), max);
}
// </region>

// <region> Math
/**
 * The golden ratio
 * @since 1.2.0
 * @type {decimal}
 */
if (Math.GOLDEN === undefined) {
  Math.GOLDEN = (Math.sqrt(5)+1)/2
}

/**
 * Random range inclusive
 * @since 1.2.0
 * @param  {integer} min   Minimum outcome
 * @param  {integer} max   Maximum outcome
 * @param  {boolean} round Should it round
 * @return {integer}       The random number
 */
if (Math.randRange === undefined) {
  Math.randRange = function (min = 0, max = 1, round = True) {
    let n = Math.random()
    n *= max
    n += min
    n = Math.round(n)
    return n
  }
}

/**
 * Gets a number's factorial
 * @since 1.2.0
 * @param  {integer} n The number
 * @return {integer}   The factorial
 */
if (Math.factorial === undefined) {
  Math.factorial = function (n) {
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
// </region>

// <region> Location
/**
 * Gets the URL's query string
 * @since 2.2.0
 * @return {dictionary} The query's keys and values
 */
Location.prototype.query = (() => {
  let qs = document.location.search.split('+').join(' ')
  let re = /[?&]?([^=]+)=([^&]*)/g
  let params = {}
  let tokens
  while (tokens = re.exec(qs)) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2])
  }
  return params
})()
// </region>

/*
     ██ ███████ ████████
     ██ ██         ██
     ██ █████      ██
██   ██ ██         ██
 █████  ███████    ██
*/
const jet = {
  /**
   * Simple metadata
   * @since 1.1.2
   * @type {dictionary}
   */
  meta: {
    version: '2.2.0',
    scheme: 'https://semver.org/',
    date: '11/13/2017',
    author: 'Evan Young',
    copyright: 'Copyright 2017 Evan Young'
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
  }
}
window._ = jet
