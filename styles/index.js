var mcss = require('micro-css')
var fs = require('fs')

var css = generateCss({
  Node: fs.readFileSync(__dirname + '/node.mcss', 'utf8'),
  Param: fs.readFileSync(__dirname + '/param.mcss', 'utf8'),
  Piano: fs.readFileSync(__dirname + '/piano.mcss', 'utf8'),
  SampleTrimmer: fs.readFileSync(__dirname + '/sample_trimmer.mcss', 'utf8'),
  Spawner: fs.readFileSync(__dirname + '/spawner.mcss', 'utf8'),
  ToggleButton: fs.readFileSync(__dirname + '/toggle_button.mcss', 'utf8')
})

module.exports = function(context){
  return css
}

function generateCss(styles){
  var result = ''
  Object.keys(styles).forEach(function(key){
    result += mcss(key + ' { ' + styles[key] + ' }')
  })
  return result
}