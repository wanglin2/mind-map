/**
 * 防御 XSS 攻击，过滤恶意 HTML 标签和属性
 * @param {string} text 需要过滤的文本
 * @returns {string} 过滤后的文本
 */
export function defenseXSS(text) {
    text = String(text)

    // 初始化结果变量
    let result = text;

    // 使用正则表达式匹配 HTML 标签
    const match = text.match(/<(\S*?)[^>]*>.*?|<.*? \/>/g);
    if (match == null) {
        // 如果没有匹配到任何标签，则直接返回原始文本
        return text;
    }

    // 遍历匹配到的标签
    for (let value of match) {
        // 定义白名单属性正则表达式（style、target、href）
        const whiteAttrRegex = new RegExp(/(style|target|href)=["'][^"']*["']/g);

        // 定义黑名单href正则表达式（javascript:）
        const aHrefBlackRegex = new RegExp(/href=["']javascript:/g);

        // 过滤 HTML 标签
        const filterHtml = value.replace(
            // 匹配属性键值对（如：key="value"）
            /([a-zA-Z-]+)\s*=\s*["']([^"']*)["']/g,
            (text) => {
                // 如果属性值包含黑名单href或不在白名单中，则删除该属性
                if (aHrefBlackRegex.test(text) || !whiteAttrRegex.test(text)) {
                    return "";
                }

                // 否则，保留该属性
                return text;
            }
        );

        // 将过滤后的标签替换回原始文本
        result = result.replace(value, filterHtml);
    }

    // 返回最终结果
    return result;
}