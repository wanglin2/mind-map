<template>
  <div class="workbencheContainer">
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
import { vipFileUrl } from '@/config/constant'

export default {
  name: 'Workbenche',
  created() {
    document.title = '思绪思维导图'
    this.getVipInfo()
    this.$bus.$on('refreshVIP', this.getVipInfo)
  },
  beforeDestroy() {
    this.$bus.$off('refreshVIP', this.getVipInfo)
  },
  methods: {
    ...mapMutations(['setIsVIP']),

    // 获取会员信息
    async getVipInfo(showTip = false) {
      try {
        const clientUUID = await window.electronAPI.getClientUUID()
        const { data } = await axios.get(vipFileUrl + '?' + Date.now(), {
          responseType: 'json'
        })
        this.setIsVIP(data.includes(clientUUID))
        if (showTip) {
          this.$message.success('会员状态获取成功')
        }
      } catch (error) {
        console.log(error)
        this.$message.error('会员信息获取失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.workbencheContainer {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
