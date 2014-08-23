var jsonQuery = require('json-query')

module.exports = function updateSlot(context, path, value, shouldRefresh){
  var res = jsonQuery(path, context)
  if (res.key != null){
    var obj = jsonQuery.lastParent(res)
    if (obj){

      if (value instanceof Object && '$node' in value){
        if (value.$node == 'match'){

          if (obj[res.key] && !Array.isArray(obj[res.key]) && obj[res.key] instanceof Object){
            setValue(obj[res.key], value.value)
          } else {
            obj[res.key] = value.value
          }

        } else if (value.$node){

          var target = obj[res.key]

          // ensure is specified node type
          if (!(target instanceof Object) || res.value.node !== value.node){
            obj[res.key] = target = { node: value.node }
            if (value.$valueTo){

              if (!Array.isArray(res.value) && typeof res.value == 'object'){
                target[value.$valueTo] = res.value.value
              } else {
                target[value.$valueTo] = res.value
              }

            }
          }

          // update node params
          Object.keys(value).forEach(function(key){
            if (typeof key !== 'string' || key.charAt(0) !== '$'){
              target[key] = value[key]
            }
          })

        } else if (res.value instanceof Object) { // revert to ordinary node
          obj[res.key] = res.value[value.$valueFrom || 'value']
        }
      } else {
        obj[res.key] = value
      }

      context.changed('update', path, shouldRefresh)
    }
  }
}

function setValue(object, value){
  if (object.value instanceof Object && !Array.isArray(object.value)){
    setValue(object.value, value)
  } else {
    object.value = value
  }
}