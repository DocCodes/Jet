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
String.prototype.toTitleCase = function () {
  return this.toLowerCase().split(' ').map(function (word) {
    return (word.charAt(0).toUpperCase())+(word.slice(1))
  }).join(' ')
}

/**
 * Reverses a string
 * @since 2.3.0
 * @return {string}
 */
String.prototype.reverse = function () {
  return this.split('').reverse().join('')
}

/**
 * Gets all the used characters in a string
 * @since 2.3.0
 * @return {array} The characters
 */
Object.defineProperty(String.prototype, 'chars', {
  get: function () {
    return Array.from(new Set(this.split('')))
  }
})
// </region>

// <region> Number
/**
* Limits an integer to a specific range
* @since 2.2.0
* @param  {integer} min The lower bound
* @param  {integer} max The upper bound
* @return {integer}     The number in range
*/
Number.prototype.clamp = function(min = 0, max = 1000000) {
  return Math.min(Math.max(this, min), max);
}
// </region>

// <region> Array
/**
 * Randomly choose something in an array
 * @since 2.3.0
 * @return {object} The random choice
 */
Array.prototype.choose = function () {
  return this[Math.randRange(0, this.length - 1)]
}
// </region>

// <region> Date
/**
* Formats a date like in C
* @since 2.3.0
* @param  {string} str The string to be formatted
* @return {string} The formatted date
*/
Date.prototype.format = function (str) {
  let repl = {
    '%': '%q',
    a: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][this.getDay()],
    A: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][this.getDay()],
    b: ['January','February','March','April','May','June','July','August','September','October','November','December'][this.getMonth()],
    B: ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'][this.getMonth()],
    C: Math.floor(this.getFullYear() / 100),
    d: this.getDate() < 10 ? `0${this.getDate()}` : this.getDate(),
    get D () {return `${this.m}/${this.d}/${this.y}`},
    e: this.getDate() < 10 ? ` ${this.getDate()}` : this.getDate(),
    F: `${this.getFullYear()}-${this.getMonth() + 1}-${this.getDate() < 10 ? `0${this.getDate()}` : this.getDate()}`,
    get F () {return `${this.Y}-${this.m}-${this.d}`},
    G: this.getFullYear() / 100,
    g: this.getFullYear() % 100,
    H: this.getHours() < 10 ? `0${this.getHours()}` : this.getHours(),
    I: (this.getHours() - 1) % 12 + 1 < 10 ? `0${(this.getHours() - 1) % 12 + 1}` : (this.getHours() - 1) % 12 + 1,
    k: this.getHours() < 10 ? ` ${this.getHours()}` : this.getHours(),
    l: (this.getHours() - 1) % 12 + 1 < 10 ? ` ${(this.getHours() - 1) % 12 + 1}` : (this.getHours() - 1) % 12 + 1,
    m: this.getMonth() + 1 < 10 ? `0${this.getMonth() + 1}` : this.getMonth() + 1,
    M: this.getMinutes() < 10 ? `0${this.getMinutes()}` : this.getMinutes(),
    p: this.getHours() < 12 ? 'AM' : 'PM',
    get P () {return this.p.toLowerCase()},
    R: `${this.getHours() < 10 ? `0${this.getHours()}` : this.getHours()}:${this.getMinutes() < 10 ? `0${this.getMinutes()}` : this.getMinutes()}`,
    get R () {return `${this.H}:${this.M}`},
    s: this.getTime() / 1000,
    S: this.getSeconds() < 10 ? `0${this.getSeconds()}` : this.getSeconds(),
    get T () {return `${this.H}:${this.M}:${this.S}`},
    u: this.getDay(),
    w: this.getDay(),
    y: this.getFullYear() % 100,
    Y: this.getFullYear(),
    z: `GMT${d.getTimezoneOffset() > 0 ? '-' : '+'}${this.getTimezoneOffset() / 60 * 100 < 1000 ? `0${this.getTimezoneOffset() / 60 * 100}` : this.getTimezoneOffset() / 60 * 100}`,
    get Z () {return `${this.a} ${this.B} ${this.d} ${this.Y} ${this.T} ${this.z}`},
    q: '%'
  }

  for (var r in repl) {
    if (repl.hasOwnProperty(r)) {
      str = str.replace(new RegExp(`%${r}`), repl[r])
    }
  }
  return str
}
// </region>

// <region> Math
/**
 * The golden ratio
 * @since 1.2.0
 * @type {decimal}
 */
Math.GOLDEN = (Math.sqrt(5)+1)/2

/**
 * Random range inclusive
 * @since 1.2.0
 * @param  {integer} min   Minimum outcome
 * @param  {integer} max   Maximum outcome
 * @param  {boolean} round Should it round
 * @return {integer}       The random number
 */
Math.randRange = function (min = 0, max = 1, round = true) {
  let n = Math.random()
  n *= max
  n += min
  n = Math.round(n)
  return n
}

/**
 * Gets a number's factorial
 * @since 1.2.0
 * @param  {integer} n The number
 * @return {integer}   The factorial
 */
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
// </region>

// <region> Location
/**
 * Gets the URL's query string
 * @since 2.2.0
 * @return {object} The query's keys and values
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
// <region> Jet
const jet = {
  /**
   * Simple metadata
   * @since 1.1.2
   * @type {object}
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
   * @return {object}     The keys and values of the variables
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
   * A phone number object
   * @since 2.3.0
   * @param  {string} num The raw phone number
   * @return {object}     A phone number object
   */
  PhoneNumber: function (num) {
    this.match = /^(?:\+?(\d{1,3})(?:\-| ))?\(?(\d{3})\)?(?:\-| )(\d{3})(?:\-| )(\d{4})$/
    if (this.match.test(num) === false) {
      console.error(`Phone number ${num} is invalid`)
      delete this
    } else {
      let exec = this.match.exec(num)
      this.country = exec[1] || '1'
      this.area = exec[2]
      this.pre = exec[3]
      this.line = exec[4]
      this.uri = this.area + this.pre + this.line
      this.compile = function () {return `+${this.country} (${this.area}) ${this.pre}-${this.line}`}

      this.call = function () {open(`tel://${this.uri}`, '_system')}
      this.text = function (body = '') {open(`sms/::${this.uri}${body !== '' ? `?body=${encodeURI(body)}` : ''}`)}
    }
  },

  /**
   * A person object
   * @since 2.3.0
   * @param  {array}  name  The person's name
   * @param  {string} dob   The date of birth
   * @param  {object} addr  The address
   * @param  {object} phone The phone number
   * @return {object}       A person object
   */
  Person: function (name, dob, addr = {}, phone = {}) {
    this.name = (() => {
      let li = []
      for (n of name) {
        li.push(n.toTitleCase())
      }
      return li
    })()
    this.fullname = this.name.join(' ')

    this.dob = new Date(dob)

    this.age = (() => {
      let a = {}
      let d = (new Date() - this.dob) / 1000
      a.years = Math.floor(d / 60 / 60 / 24 / 365)
      d -= a.years * 60 * 60 * 24 * 365
      a.days = Math.floor(d / 60 / 60 / 24)
      d -= a.days * 60 * 60 * 24
      a.hours = Math.floor(d / 60 / 60)
      d -= a.hours * 60 * 60
      a.minutes = Math.floor(d / 60)
      d -= a.minutes * 60
      a.seconds = Math.floor(d)
      d -= a.seconds
      a.milliseconds = Math.floor(d * 1000)
      return a
    })()

    this.addr = addr
    this.phone = phone
  }

}
// </region>
window._ = jet
