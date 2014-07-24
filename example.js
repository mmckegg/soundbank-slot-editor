var slotEditor = require('./index')

var element = document.createElement('div')
document.body.appendChild(element)

var editor = slotEditor(element)
editor.on('change', function(descriptor){
  console.log('change', descriptor)
})

editor.set({
  id: "12",
  sources: [
    {
      node: "sample",
      mode: "hold",
      url: "140454172397428.wav",
      offset: [ 0.0825, 1 ],
      amp: {
        node: "adsr",
        release: 0.4802205580996135,
        value: 1.6885
      },
      transpose: 34
    }
  ],
  gain: 1,
  output: "E",
  processors: [
    {
      node: "overdrive",
      postCut: 8013.40508294877,
      gain: {
        node: "lfo",
        value: 1.8223,
        amp: 0.5244764827915656,
        rate: 0.7380319348684902
      },
      color: 4221.436534824215
    },
    {
      node: "filter",
      frequency: {
        node: "adsr",
        value: 344.3045548130483,
        startValue: 3842.732723627973,
        attack: 0.3113153166514781
      }
    },
    {
      node: "filter",
      frequency: {
        node: "lfo",
        value: 1483.837438372009,
        amp: 601.9575187546659,
        rate: 1.007302605671705,
        sync: true,
        shape: "sine"
      },
      type: "lowpass"
    }
  ],
  volume: 0.7494
})