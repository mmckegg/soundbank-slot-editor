var relativeQuery = /^[\.\[:]/

module.exports = function path(input, args){
  var result = ''
  if (input){
    result = this.query
    if (this.parentContext && relativeQuery.exec(result)){
      result = path.call(this.parentContext, this.parentContext.source) + result
    }
    var root = input

    // read arguments.slice(1)
    for (var i=1;i<arguments.length;i++){
      if (root instanceof Object){
        var arg = arguments[i]
        if (result){
          result += '.' + arg
        } else {
          result = arg
        }
        root = root[arg]
      }
    }
    
  }
  return result
}