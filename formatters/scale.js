module.exports = function scale(input){
  if (input instanceof Object && input.node === 'scale'){
    return input.scale || 'major'
  }
}