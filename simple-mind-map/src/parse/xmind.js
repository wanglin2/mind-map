import JSZip from "jszip";
import xmlConvert from "xml-js";

/**
 * javascript comment
 * @Author: 王林25
 * @Date: 2022-09-21 14:07:47
 * @Desc: 解析.xmind文件
 */
const parseXmindFile = (file) => {
  return new Promise((resolve, reject) => {
    JSZip.loadAsync(file).then(
      async (zip) => {
        try {
          let content = "";
          if (zip.files["content.json"]) {
            let json = await zip.files["content.json"].async("string");
            content = transformXmind(json);
          } else if (zip.files["content.xml"]) {
            let xml = await zip.files["content.xml"].async("string");
            let json = xmlConvert.xml2json(xml);
            content = transformOldXmind(json);
          }
          if (content) {
            resolve(content);
          } else {
            reject(new Error("解析失败"));
          }
        } catch (error) {
          reject(error);
        }
      },
      (e) => {
        reject(e);
      }
    );
  });
};

/**
 * javascript comment
 * @Author: 王林25
 * @Date: 2022-09-21 18:57:25
 * @Desc: 转换xmind数据
 */
const transformXmind = (content) => {
  let data = JSON.parse(content)[0];
  let nodeTree = data.rootTopic;
  let newTree = {};
  let walk = (node, newNode) => {
    newNode.data = {
      // 节点内容
      text: node.title,
    };
    // 节点备注
    if (node.notes) {
      newNode.data.note = (node.notes.realHTML || node.notes.plain).content;
    }
    // 超链接
    if (node.href && /^https?:\/\//.test(node.href)) {
      newNode.data.hyperlink = node.href;
    }
    // 标签
    if (node.labels && node.labels.length > 0) {
      newNode.data.tag = node.labels;
    }
    // 子节点
    newNode.children = [];
    if (
      node.children &&
      node.children.attached &&
      node.children.attached.length > 0
    ) {
      node.children.attached.forEach((item) => {
        let newChild = {};
        newNode.children.push(newChild);
        walk(item, newChild);
      });
    }
  };
  walk(nodeTree, newTree);
  return newTree;
};

/**
 * javascript comment
 * @Author: 王林25
 * @Date: 2022-09-23 15:51:51
 * @Desc: 转换旧版xmind数据，xmind8
 */
const transformOldXmind = (content) => {
  let data = JSON.parse(content);
  let elements = data.elements;
  let root = null;
  let getRoot = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (!root && arr[i].name === "topic") {
        root = arr[i];
        return;
      }
    }
    arr.forEach((item) => {
      getRoot(item.elements);
    });
  };
  getRoot(elements);
  let newTree = {};
  let getItemByName = (arr, name) => {
    return arr.find((item) => {
      return item.name === name;
    });
  };
  let walk = (node, newNode) => {
    let nodeElements = node.elements;
    newNode.data = {
      // 节点内容
      text: getItemByName(nodeElements, "title").elements[0].text,
    };
    try {
      // 节点备注
      let notesElement = getItemByName(nodeElements, "notes");
      if (notesElement) {
        newNode.data.note =
          notesElement.elements[0].elements[0].elements[0].text;
      }
    } catch (error) {}
    try {
      // 超链接
      if (
        node.attributes &&
        node.attributes["xlink:href"] &&
        /^https?:\/\//.test(node.attributes["xlink:href"])
      ) {
        newNode.data.hyperlink = node.attributes["xlink:href"];
      }
    } catch (error) {}
    try {
      // 标签
      let labelsElement = getItemByName(nodeElements, "labels");
      if (labelsElement) {
        newNode.data.tag = labelsElement.elements.map((item) => {
          return item.elements[0].text;
        });
      }
    } catch (error) {}
    // 子节点
    newNode.children = [];
    let _children = getItemByName(nodeElements, "children");
    if (_children && _children.elements && _children.elements.length > 0) {
      _children.elements.forEach((item) => {
        if (item.name === "topics") {
          item.elements.forEach((item2) => {
            let newChild = {};
            newNode.children.push(newChild);
            walk(item2, newChild);
          });
        } else {
          let newChild = {};
          newNode.children.push(newChild);
          walk(item, newChild);
        }
      });
    }
  };
  walk(root, newTree);
  return newTree;
};

export default {
  parseXmindFile,
  transformXmind,
  transformOldXmind,
};
