var getContext = require('./get-context')
var updateNode = require('./nodes/update')

module.exports = function(container){
  container.addEventListener('mousedown', function(e){
    var element = e.target
    var path = container.dataset.path
    var context = getContext(container)

    if (element.dataset.value){
      var value = parseInt(element.dataset.value)
      updateNode(context, path, value)
    }
  })
}