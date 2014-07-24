module.exports = function(){
  if (this.query === '.amp'){
    return 'dB'
  } else if (this.query === '.rate'){
    return 'lfo'
  } else if (this.query === '.frequency'){
    return 'arfo'
  } else if (this.query === '.transpose'){
    return 'semitone'
  } else {
    return 'ratio'
  }
}