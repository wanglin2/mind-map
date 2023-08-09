import { Loading } from 'element-ui'

let loadingInstance = null

export const showLoading = () => {
  loadingInstance = Loading.service({
    lock: true
  })
}

export const hideLoading = () => {
    if (loadingInstance) {
        loadingInstance.close()
        loadingInstance = null
    }
  }
  