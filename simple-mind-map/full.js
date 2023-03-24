import MindMap from './index'
import MiniMap from './src/MiniMap.js'
import Watermark from './src/Watermark.js'
import KeyboardNavigation from './src/KeyboardNavigation.js'
import Export from './src/Export.js'
import Drag from './src/Drag.js'
import Select from './src/Select.js'
import AssociativeLine from './src/AssociativeLine'
import RichText from './src/RichText'
import xmind from './src/parse/xmind.js'
import markdown from './src/parse/markdown.js'

MindMap.xmind = xmind
MindMap.markdown = markdown

MindMap
  .usePlugin(MiniMap)
  .usePlugin(Watermark)
  .usePlugin(Drag)
  .usePlugin(KeyboardNavigation)
  .usePlugin(Export)
  .usePlugin(Select)
  .usePlugin(AssociativeLine)
  .usePlugin(RichText)

export default MindMap