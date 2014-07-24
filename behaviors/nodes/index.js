var button = require('../button')
var getContext = require('../get-context')
var update = require('./update')

module.exports = {

  deleteButton: button(require('./delete')),
  spawner: button(require('./spawner')),
  toggle: button(require('./toggle')),

  select: function(element){
    element.onchange = function(){
      var context = getContext(element)
      update(context, element.dataset.path, element.value)
    }

    function refresh(){
      element.value = element.dataset.value || ''
    }

    refresh()
    return refresh
  },

  scaleSelector: function(element){
    element.onchange = function(){
      var context = getContext(element)
      if (element.value){
        update(context, element.dataset.path, {
          $node: true, 
          $valueTo: 'root',
          node: 'scale', 
          scale: element.value
        })
      } else {
        update(context, element.dataset.path, {
          $node: false, 
          $valueFrom: 'root'
        })
      }
    }

    function refresh(){
      element.value = element.dataset.value || ''
    }

    refresh()
    return refresh
  }
}