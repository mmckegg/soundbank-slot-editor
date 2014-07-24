var getContext = require('./get-context')
var getNodeElement = require('./get-node-element')

module.exports = function(handler){
  return function(element){

    var func = function(e){
      e.stopPropagation()
      e.preventDefault()
      var context = getContext(element)
      var nodeElement = getNodeElement(element)
      handler(context, nodeElement, element, e.target)
    }

    element.style.cursor = 'pointer'
    element.addEventListener('click', func, false)
    
    return function(change){
      if (change === 'remove'){
        element.style.cursor = ''
        element.removeEventListener('click', func, false)
      }
    }
  }
}