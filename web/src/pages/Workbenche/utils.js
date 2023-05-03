import { v4 as uuid } from 'uuid'

// 打开新的编辑窗口
export const create = () => {
    window.electronAPI.create(uuid())
}