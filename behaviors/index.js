var behave = require('dom-behavior')

var behaviors = {
  nodes: require('./nodes'),
  noteChooser: require('./note_chooser'),
  param: require('./param'),
  sampleTrimmer: require('./sample_trimmer'),
  browseSample: require('./browse_sample')
}

module.exports = function(element){
  return behave(behaviors, element)
}