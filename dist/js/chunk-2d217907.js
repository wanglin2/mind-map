(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d217907"],{c6ec:function(s,t,a){"use strict";a.r(t);var e=function(){var s=this;s._self._c;return s._m(0)},n=[function(){var s=this,t=s._self._c;return t("div",[t("h1",[s._v("Export plugin")]),t("p",[s._v("The "),t("code",[s._v("Export")]),s._v(" plugin provides the export function.")]),t("h2",[s._v("Register")]),t("pre",{staticClass:"hljs"},[t("code",[t("span",{staticClass:"hljs-keyword"},[s._v("import")]),s._v(" MindMap "),t("span",{staticClass:"hljs-keyword"},[s._v("from")]),s._v(" "),t("span",{staticClass:"hljs-string"},[s._v("'simple-mind-map'")]),s._v("\n"),t("span",{staticClass:"hljs-keyword"},[s._v("import")]),s._v(" Export "),t("span",{staticClass:"hljs-keyword"},[s._v("from")]),s._v(" "),t("span",{staticClass:"hljs-string"},[s._v("'simple-mind-map/src/plugins/Export.js'")]),s._v("\n"),t("span",{staticClass:"hljs-comment"},[s._v("// import Export from 'simple-mind-map/src/Export.js' Use this path for versions below v0.6.0")]),s._v("\n\nMindMap.usePlugin(Export)\n")])]),t("p",[s._v("After registration and instantiation of "),t("code",[s._v("MindMap")]),s._v(", the instance can be obtained through "),t("code",[s._v("mindMap.doExport")]),s._v(".")]),t("h2",[s._v("Methods")]),t("p",[s._v("All exported methods are asynchronous and return an instance of "),t("code",[s._v("Promise")]),s._v(". You can use the "),t("code",[s._v("then")]),s._v(" method to obtain data, or use the "),t("code",[s._v("async await")]),s._v(" function to obtain:")]),t("pre",{staticClass:"hljs"},[t("code",[s._v("mindMap.doExport.png().then("),t("span",{staticClass:"hljs-function"},[s._v("("),t("span",{staticClass:"hljs-params"},[s._v("data")]),s._v(") =>")]),s._v(" {\n  "),t("span",{staticClass:"hljs-comment"},[s._v("// ...")]),s._v("\n})\n\n"),t("span",{staticClass:"hljs-keyword"},[s._v("const")]),s._v(" "),t("span",{staticClass:"hljs-keyword"},[s._v("export")]),s._v(" = "),t("span",{staticClass:"hljs-keyword"},[s._v("async")]),s._v(" () => {\n  "),t("span",{staticClass:"hljs-keyword"},[s._v("let")]),s._v(" data = "),t("span",{staticClass:"hljs-keyword"},[s._v("await")]),s._v(" mindMap.doExport.png()\n  "),t("span",{staticClass:"hljs-comment"},[s._v("// ...")]),s._v("\n}\n")])]),t("p",[s._v("The returned data is in the format of "),t("code",[s._v("data:URL")]),s._v(". You can create an "),t("code",[s._v("a")]),s._v(" tag to trigger the download:")]),t("pre",{staticClass:"hljs"},[t("code",[t("span",{staticClass:"hljs-keyword"},[s._v("let")]),s._v(" a = "),t("span",{staticClass:"hljs-built_in"},[s._v("document")]),s._v(".createElement("),t("span",{staticClass:"hljs-string"},[s._v("'a'")]),s._v(")\na.href = "),t("span",{staticClass:"hljs-string"},[s._v("'xxx.png'")]),t("span",{staticClass:"hljs-comment"},[s._v("// .png、.svg、.pdf、.md、.json、.smm")]),s._v("\na.download = "),t("span",{staticClass:"hljs-string"},[s._v("'xxx'")]),s._v("\na.click()\n")])]),t("h3",[s._v("png(name, transparent = false, rotateWhenWidthLongerThenHeight)")]),t("ul",[t("li",[t("p",[t("code",[s._v("name")]),s._v(": Name, optional")])]),t("li",[t("p",[t("code",[s._v("transparent")]),s._v(": v0.5.7+, Specify whether the background of the exported image is transparent")])]),t("li",[t("p",[t("code",[s._v("rotateWhenWidthLongerThenHeight")]),s._v(": v0.6.15+，Boolean, false, Automatically rotate 90 degrees when the image has a width to height ratio")])])]),t("p",[s._v("Exports as "),t("code",[s._v("png")]),s._v(".")]),t("h3",[s._v("svg(name, plusCssText)")]),t("ul",[t("li",[t("p",[t("code",[s._v("name")]),s._v("："),t("code",[s._v("svg")]),s._v(" title")])]),t("li",[t("p",[t("code",[s._v("plusCssText")]),s._v("：v0.4.0+, （v0.6.16+This parameter has been removed and instead passed in through the "),t("code",[s._v("resetCss")]),s._v(" configuration during instantiation）, When node rich text editing is enabled and "),t("code",[s._v("domToImage")]),s._v(" passes "),t("code",[s._v("false")]),s._v(", additional "),t("code",[s._v("css")]),s._v(" styles can be added. If there is a "),t("code",[s._v("dom")]),s._v(" node in "),t("code",[s._v("svg")]),s._v(", you can set some styles for the node through this parameter, such as:")])])]),t("pre",{staticClass:"hljs"},[t("code",[s._v("svg(\n  "),t("span",{staticClass:"hljs-string"},[s._v("''")]),s._v(", \n  "),t("span",{staticClass:"hljs-literal"},[s._v("false")]),s._v(", \n  "),t("span",{staticClass:"hljs-string"},[s._v("`* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n  }`")]),s._v("\n)\n")])]),t("p",[s._v("Exports as "),t("code",[s._v("svg")]),s._v(".")]),t("h3",[s._v("pdf(name, useMultiPageExport)")]),t("blockquote",[t("p",[s._v("v0.2.1+")])]),t("ul",[t("li",[t("p",[t("code",[s._v("name")]),s._v("：File name")])]),t("li",[t("p",[t("code",[s._v("useMultiPageExport")]),s._v(": v0.6.15+, Boolean, false, Whether to export multiple pages, default to single page")])])]),t("p",[s._v("Export as "),t("code",[s._v("pdf")]),s._v(". Unlike other export methods, this method does not return data and directly triggers the download.")]),t("blockquote",[t("p",[s._v("After v0.6.0, an additional ExportPDF plugin needs to be registered")])]),t("pre",{staticClass:"hljs"},[t("code",[t("span",{staticClass:"hljs-keyword"},[s._v("import")]),s._v(" ExportPDF "),t("span",{staticClass:"hljs-keyword"},[s._v("from")]),s._v(" "),t("span",{staticClass:"hljs-string"},[s._v("'simple-mind-map/src/plugins/ExportPDF.js'")]),s._v("\nMindMap.usePlugin(ExportPDF)\n")])]),t("h3",[s._v("json(name, withConfig)")]),t("p",[t("code",[s._v("name")]),s._v("：It is temporarily useless, just pass an empty string")]),t("p",[t("code",[s._v("withConfig``：Boolean")]),s._v(", default "),t("code",[s._v("true")]),s._v(", Whether the data contains configuration, otherwise it is pure mind map node data")]),t("p",[s._v("Return "),t("code",[s._v("json")]),s._v(" data.")]),t("h3",[s._v("md()")]),t("blockquote",[t("p",[s._v("v0.4.7+")])]),t("p",[s._v("Export as "),t("code",[s._v("markdown")]),s._v(" file.")]),t("h3",[s._v("getSvgData()")]),t("p",[s._v("Gets "),t("code",[s._v("svg")]),s._v(" data, an async method that returns an object:")]),t("pre",{staticClass:"hljs"},[t("code",[s._v("{\n  node "),t("span",{staticClass:"hljs-comment"},[s._v("// svg node")]),s._v("\n  str "),t("span",{staticClass:"hljs-comment"},[s._v("// svg string")]),s._v("\n}\n")])]),t("h3",[s._v("xmind(name)")]),t("blockquote",[t("p",[s._v("v0.6.6+, an additional ExportXMind plugin needs to be registered")])]),t("pre",{staticClass:"hljs"},[t("code",[t("span",{staticClass:"hljs-keyword"},[s._v("import")]),s._v(" ExportXMind "),t("span",{staticClass:"hljs-keyword"},[s._v("from")]),s._v(" "),t("span",{staticClass:"hljs-string"},[s._v("'simple-mind-map/src/plugins/ExportXMind.js'")]),s._v("\nMindMap.usePlugin(ExportXMind)\n")])]),t("p",[s._v("Export as an "),t("code",[s._v("xmind")]),s._v(" file type, asynchronous method, returns a "),t("code",[s._v("Promise")]),s._v(" instance, and the returned data is the "),t("code",[s._v("data:url")]),s._v(" data of a "),t("code",[s._v("zip")]),s._v(" compressed package, which can be directly downloaded.")])])}],o={},i=o,v=a("2877"),r=Object(v["a"])(i,e,n,!1,null,null,null);t["default"]=r.exports}}]);