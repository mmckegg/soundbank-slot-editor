soundbank-slot-editor
===

Visual node editor for [soundbank](https://github.com/mmckegg/soundbank) [audio-slots](https://github.com/mmckegg/audio-slot).

Used as the sound editor in [Loop Drop](https://github.com/mmckegg/loop-drop-app).

## Install

```bash
$ npm install soundbank-slot-editor
```

## TODO

Currently only allows the predefined set of sources, processors, modulators from Loop Drop.  Needs to be user definable, or get available nodes automatically from AudioContext.

## API

```js
var SlotEditor = require('soundbank-slot-editor')
var element = document.getElementById('SlotEditor')

var soundbank = INSTANCE_OF_SOUNDBANK

var currentId = null
var editor = SlotEditor(audioContext, element)

function editSlot(id){
  var descriptor = soundbank.getDescriptor(id)
  editor.set(descriptor)
  currentId = id
}

editor.on('change', function(descriptor){
  soundbank.update(descriptor)
})

editSlot(0)
```