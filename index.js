var View = require('rincewind')
var EventEmitter = require('events').EventEmitter
var behave = require('./behaviors')
var become = require('become')
var jsonQuery = require('json-query')

/// the main view
var render = View(__dirname + '/editor.html')
///

var globals = {
  isEmpty: function(input){
    return !input
  }
}

module.exports = function(audioContext, element){
  var self = new EventEmitter()
  var updateBehaviors = behave(element)

  var context = {
    get: getValue,
    audioContext: audioContext,
    globals: globals,
    changed: function(action, path, shouldRefresh){
      self.emit('change', obtain(this.data.slot), {action: action, path: path})
      if (shouldRefresh !== false){
        refresh()
      }
    },
    data: {
      slot: null
    },
    source: null
  }

  element.context = context

  function getValue(query, source){
    if (source != null){
      var context = Object.create(this)
      context.parentContext = this
      context.source = source
      return jsonQuery(query, context).value
    } else {
      return jsonQuery(query, this).value
    }
  }

  function refresh(){
    var newContent = render(context)
    become(element, newContent, {inner: true, onChange: updateBehaviors, tolerance: 0})
  }

  self.set = function(descriptor){
    context.data.slot = obtain(descriptor)
    refresh()
  }

  self.get = function(){
    return context.data.slot
  }

  return self
}

function obtain(obj){
  return JSON.parse(JSON.stringify(obj))
}