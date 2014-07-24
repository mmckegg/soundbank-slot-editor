var mcss = require('micro-css')
var getExt = require('path').extname
module.exports = function(context){
  if (context.cachedStyles){
    return context.cachedStyles
  } else {
    var result = ''
    if (context.locals){
      for (var key in context.locals){
        if (key in context.locals){
          var local = context.locals[key]
          if (getExt(local.path) === '.mcss'){
            result += mcss(key + ' { ' + local.content + ' }')
          }
        }
      }
    }
    context.cachedStyles = result
    return result
  }
}