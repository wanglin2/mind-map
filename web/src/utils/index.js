/** 
 * @Author: 王林 
 * @Date: 2021-07-11 21:38:09 
 * @Desc: 全屏事件检测 
 */
const getOnfullscreEnevt = () => {
    if (document.documentElement.requestFullScreen) {
        return 'onfullscreenchange';
    } else if (document.documentElement.webkitRequestFullScreen) {
        return 'onwebkitfullscreenchange';
    } else if (document.documentElement.mozRequestFullScreen) {
        return 'onmozfullscreenchange';
    } else if (document.documentElement.msRequestFullscreen) {
        return 'onmsfullscreenchange';
    }
}

export const fullscrrenEvent = getOnfullscreEnevt()

/** 
 * @Author: 王林 
 * @Date: 2021-07-11 21:45:06 
 * @Desc: 全屏 
 */
export const fullScreen = (element) => {
    if (element.requestFullScreen) {
        element.requestFullScreen();
    } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    }
}