var query = require('micro-css').query

var getContext = require('./get-context')
var updateNode = require('./nodes/update')

var width = 500
var height = 400

module.exports = function(element){
  var context = getContext(element)
  var audioContext = context.audioContext

  var svg = element.querySelector('svg')
  var wavePath = element.querySelector(query('svg path.wave'))
  var selectionRect = element.querySelector(query('svg rect.selection'))
  var startSlider = element.querySelector(query('input.start'))
  var endSlider = element.querySelector(query('input.end'))

  var path = element.dataset.path
  var currentWidthScale = 1
  var currentHeightScale = 1

  var lastUrl = null
  var lastOffset = null
  var lastAmp = null

  startSlider.oninput = function(){
    lastOffset = [parseFloat(this.value), lastOffset[1]]
    updateOffset()
    updateNode(context, path + '.offset', lastOffset, false)
  }

  endSlider.oninput = function(){
    lastOffset = [lastOffset[0], parseFloat(this.value)]
    updateOffset()
    updateNode(context, path + '.offset', lastOffset, false)
  }

  function updateScale(){
    var offsetHeight = (((currentHeightScale*height) - height) / 2) / currentHeightScale
    wavePath.setAttribute('transform', 'scale(' + currentWidthScale + ' ' + currentHeightScale + ') translate(0 ' + -offsetHeight + ')')
  }

  function updateOffset(){
    var x1 = lastOffset[0]*width
    var x2 = lastOffset[1]*width
    selectionRect.setAttribute('width', x2-x1)
    selectionRect.setAttribute('x', x1)
  }

  function refresh(action){
    if (action != 'remove'){
      path = element.dataset.path
      var value = context.get(path)
      var offset = value.offset || [0,1]

      var amp = value.amp

      if (amp && amp instanceof Object){
        amp = amp.value
      }

      if (amp == null){
        amp = 1
      }

      // update sample
      if (lastUrl != value.url && typeof audioContext.loadSample == 'function'){

        audioContext.loadSample(value.url, function(buffer){
          var data = buffer ? buffer.getChannelData(0) : []
          var step = data.length / width
          var quant = Math.ceil(step)
          currentWidthScale = quant / step
          updateScale()
          wavePath.setAttribute('d', getPathForData(data, width, height))
        })

        lastUrl = value.url
      }

      // update offset
      if (!lastOffset || lastOffset[0] != offset[0] || lastOffset[1] != offset[1]){
        lastOffset = offset
        updateOffset()
        startSlider.value = offset[0]
        endSlider.value = offset[1]
      }

      if (lastAmp != amp){
        currentHeightScale = amp
        updateScale()
        lastAmp = amp
      }

    }
  }

  refresh()

  return refresh
}


function getPathForData(data, width, height){
  var step = Math.ceil( data.length / width )
  var amp = (height / 2)

  var maxValues = []
  var minValues = []

  for(var i=0;i<width;i++){
    var min = 1.0
    var max = -1.0
    var defined = false
    for (j=0; j<step; j++) {
      var datum = data[(i*step)+j]
      if (datum < min){
        min = datum
        defined = true
      }
      if (datum > max){
        max = datum
        defined = true
      }
    }

    if (defined){
      maxValues[i] = max
      minValues[i] = min
    } else {
      maxValues[i] = 0
      minValues[i] = 0
    }

  }

  // top
  var result = 'M0,' + (height/2)
  maxValues.forEach(function(val, i){
    result += ' L' + i + ',' + Math.round(amp+(val*amp))
  })

  // end point
  result += ' L' + width + ',' + (height/2)


  // bottom
  minValues.reverse().forEach(function(val,i){
    result += ' L' + (width-i-1) + ',' + Math.round(amp+(val*amp))
  })

  return result + ' Z'
}