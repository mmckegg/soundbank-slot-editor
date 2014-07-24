var jsonQuery = require('json-query')

module.exports = function spawner(context, node, element, target){
  if (target.dataset.node){
    var object = {node: target.dataset.node}
    if (object.node === 'oscillator'){
      object.amp = 0.6
      object.note = 72
      object.frequency = 440
    }

    if (object.node === 'filter'){
      object.frequency = 350
    }

    var path = element.dataset.path
    var res = jsonQuery(path, {data: context.data, force: []})
    if (res.key != null){
      var obj = res.value
      if (Array.isArray(obj)){
        obj.push(object)
        context.changed('append', path)
      }
    }
  }
}