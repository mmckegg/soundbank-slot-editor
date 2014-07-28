var h = require('create-element')
var teoria = require('teoria')

var blackNotes = [1,3,6,8,10]

module.exports = function(context){

  var root = getRoot(context.source)
  var scale = getScaleNotes(context.source) || []

  var result = ''
  for (var n=24;n<=96;n++){

    var classes = []
    var id = n % 12
    if (~blackNotes.indexOf(id)){
      classes.push('-black')
    }

    if (~scale.indexOf(id)){
      classes.push('-scale')
    }

    if (n == root){
      classes.push('-selected')
    }

    result += h('div', {'class': classes.join(' '), 'data-value': n })
  }
  return result
}


function getRoot(input){
  if (input instanceof Object){
    return getMidiNote(input.root || 'C5')
  } else {
    return getMidiNote(input)
  }
}

function getScaleNotes(input){
  if (input instanceof Object && input.node === 'scale'){
    return getScale(input.root || 'C4', input.scale || 'major')
  }
}

function getScale(root, scaleName){
  if (scaleName){
    var rootNote = typeof root === 'number' ? teoria.note.fromMIDI(root) : teoria.note(root)
    return rootNote.scale(scaleName).notes().map(getDegree)
  } else {
    return []
  }
}

function getMidiNote(note){
  if (typeof note === 'string'){
    return teoria.note(note).key()+20
  } else {
    return note
  }
}

function getDegree(note){
  return (note.key()-4) % 12
}