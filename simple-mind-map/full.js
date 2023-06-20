import MindMap from './index'
import MiniMap from './src/plugins/MiniMap.js'
import Watermark from './src/plugins/Watermark.js'
import KeyboardNavigation from './src/plugins/KeyboardNavigation.js'
import ExportPDF from './src/plugins/ExportPDF.js'
import Export from './src/plugins/Export.js'
import Drag from './src/plugins/Drag.js'
import Select from './src/plugins/Select.js'
import AssociativeLine from './src/plugins/AssociativeLine'
import RichText from './src/plugins/RichText'
import xmind from './src/parse/xmind.js'
import markdown from './src/parse/markdown.js'
import icons from './src/svg/icons.js'

MindMap.xmind = xmind
MindMap.markdown = markdown
MindMap.iconList = icons.nodeIconList

MindMap
  .usePlugin(MiniMap)
  .usePlugin(Watermark)
  .usePlugin(Drag)
  .usePlugin(KeyboardNavigation)
  .usePlugin(ExportPDF)
  .usePlugin(Export)
  .usePlugin(Select)
  .usePlugin(AssociativeLine)
  .usePlugin(RichText)

export default MindMap