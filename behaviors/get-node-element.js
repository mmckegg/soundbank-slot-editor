module.exports = function getNodeElement(node){
  while (node && !node.classList.contains('$node')){
    node = node.parentNode
    if (node === document) { 
      node = null 
    }
  }
  return node
}