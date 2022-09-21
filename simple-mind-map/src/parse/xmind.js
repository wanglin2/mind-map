import JSZip from "jszip";

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
          let content = await zip.files["content.json"].async("string");
          let res = transformXmind(content);
          resolve(res);
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

export default {
  parseXmindFile,
  transformXmind,
};
