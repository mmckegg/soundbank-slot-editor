var jsonQuery = require('json-query')

module.exports = function(context, node, element){
  if (node){
    var path = node.dataset.path
    var res = jsonQuery(path, context)
    if (res.key != null){
      var obj = jsonQuery.lastParent(res)
      if (obj){
        if (Array.isArray(obj)){
          obj.splice(res.key, 1)
        } else {
          delete obj[res.key]
        }
        context.changed('delete', path)
      }
    }
  }
}