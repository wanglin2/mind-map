import MindMap from './index'
import MiniMap from './src/MiniMap.js'
import Watermark from './src/Watermark.js'
import KeyboardNavigation from './src/KeyboardNavigation.js'
import Export from './src/Export.js'
import Drag from './src/Drag.js'
import Select from './src/Select.js'
import xmind from './src/parse/xmind.js'

MindMap.xmind = xmind

MindMap
  .usePlugin(MiniMap)
  .usePlugin(Watermark)
  .usePlugin(Drag)
  .usePlugin(KeyboardNavigation)
  .usePlugin(Export)
  .usePlugin(Select)

export default MindMap