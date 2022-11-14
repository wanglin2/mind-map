<template>
  <div class="container">
    <template v-if="show">
      <Toolbar v-if="!isZenMode"></Toolbar>
      <Edit></Edit>
    </template>
  </div>
</template>

<script>
import Toolbar from './components/Toolbar'
import Edit from './components/Edit'
import { mapState, mapActions, mapMutations } from 'vuex'
import { getLocalConfig } from '@/api'

export default {
  name: 'Index',
  components: {
    Toolbar,
    Edit
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    ...mapState({
      isZenMode: state => state.localConfig.isZenMode
    })
  },
  async created() {
    this.initLocalConfig()
    const loading = this.$loading({
      lock: true,
      text: '正在加载，请稍后...'
    })
    await this.getUserMindMapData()
    this.show = true
    loading.close()
  },
  methods: {
    ...mapActions(['getUserMindMapData']),
    ...mapMutations(['setLocalConfig']),

    /**
     * @Author: 王林25
     * @Date: 2022-11-14 19:07:03
     * @Desc: 初始化本地配置
     */
    initLocalConfig() {
      let config = getLocalConfig()
      if (config) {
        this.setLocalConfig({
          ...this.$store.state.localConfig,
          ...config
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
}
</style>
