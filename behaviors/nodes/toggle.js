var jsonQuery = require('json-query')

module.exports = function toggle(context, node, element){
  if (element){
    var path = element.dataset.path
    var res = jsonQuery(path, context)
    if (res.key != null){
      var obj = jsonQuery.lastParent(res)
      if (obj){
        if (obj[res.key]){
          obj[res.key] = false
        } else {
          obj[res.key] = true
        }

        context.changed('toggle', path)
      }
    }
  }
}