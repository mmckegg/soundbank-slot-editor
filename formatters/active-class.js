module.exports = function(input, args){
  args = Array.prototype.slice.call(arguments, 1)
  if (input){
    return args.join(' ') + ' -active'
  } else {
    return args.join(' ')
  }
}