var getContext = require('./get-context')
var updateNode = require('./nodes/update')

module.exports = function(element){
  var path = element.dataset.path
  var context = getContext(element)

  var handler = {
    handleEvent: onChange,
    context: context,
    path: path,
    element: element
  }

  element.addEventListener('change', handler, false)

  return function(action){
    if (action === 'remove'){
      element.removeEventListener('change', handler, false)
    }
  }
}

function onChange(e){
  var context = this.context
  var path = this.path
  var element = this.element
  if (element.files[0]){
    context.handleFile(element.files[0], function(err, info){
      console.log(err, info)
      if (!err){
        updateNode(context, path + '.offset', info.offset, false)
        updateNode(context, path + '.url', info.url)
      }
    })
  }
}