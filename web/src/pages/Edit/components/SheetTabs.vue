<template>
  <div class="sheet-tabs" :class="{ isDark: isDark }" v-if="sheets.length > 0">
    <span class="sheet-tabs-label">{{ $t('edit.sheet') }}：</span>
    <div class="sheet-tabs-list">
      <div
        v-for="(sheet, index) in sheets"
        :key="sheet.id"
        class="sheet-tab"
        :class="{ active: index === activeIndex }"
        @click="onSelect(index)"
        @dblclick="onStartRename(index)"
      >
        <span v-if="editingIndex !== index" class="sheet-tab-name">{{
          sheet.name
        }}</span>
        <input
          v-else
          ref="renameInput"
          v-model="editingName"
          class="sheet-tab-input"
          @blur="onEndRename"
          @keydown.enter="onEndRename"
          @keydown.esc="cancelRename"
          @click.stop
        />
        <span
          v-if="editingIndex !== index && sheets.length > 1"
          class="sheet-tab-close"
          :title="$t('edit.deleteSheet')"
          @click.stop="onDelete(index)"
        >×</span>
      </div>
      <button
        type="button"
        class="sheet-tab-add"
        :title="$t('edit.addSheet')"
        @click="onAdd"
      >
        +
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SheetTabs',
  props: {
    sheets: {
      type: Array,
      default: () => []
    },
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapState({
      isDark: state => state.localConfig.isDark
    })
  },
  data() {
    return {
      editingIndex: -1,
      editingName: ''
    }
  },
  methods: {
    onSelect(index) {
      if (this.editingIndex >= 0) return
      this.$emit('select', index)
    },
    onAdd() {
      this.$emit('add')
    },
    onDelete(index) {
      if (this.editingIndex >= 0) return
      this.$emit('delete', index)
    },
    onStartRename(index) {
      this.editingIndex = index
      this.editingName = (this.sheets[index] && this.sheets[index].name) || ''
      this.$nextTick(() => {
        const input = this.$refs.renameInput && this.$refs.renameInput[0]
        if (input) {
          input.focus()
          input.select()
        }
      })
    },
    onEndRename() {
      if (this.editingIndex < 0) return
      const name = (this.editingName || '').trim() || this.$t('edit.sheet')
      this.$emit('rename', this.editingIndex, name)
      this.editingIndex = -1
      this.editingName = ''
    },
    cancelRename() {
      this.editingIndex = -1
      this.editingName = ''
    }
  }
}
</script>

<style lang="less" scoped>
.sheet-tabs {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 36px;
  background: #f5f7fa;
  border-top: 1px solid #e4e7ed;
  display: flex;
  align-items: center;
  z-index: 500;
  padding: 0 12px;
  gap: 8px;
}
.sheet-tabs-label {
  flex-shrink: 0;
  font-size: 12px;
  color: #606266;
}
.sheet-tabs-list {
  display: flex;
  align-items: center;
  gap: 4px;
  overflow-x: auto;
  flex: 1;
  min-width: 0;
  padding: 2px 0;
}
.sheet-tab {
  flex-shrink: 0;
  padding: 4px 8px 4px 12px;
  cursor: pointer;
  border-radius: 4px 4px 0 0;
  border: 1px solid transparent;
  border-bottom: none;
  margin-bottom: -1px;
  background: #eef1f6;
  color: #606266;
  font-size: 12px;
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  user-select: none;
  display: flex;
  align-items: center;
}
.sheet-tab-name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sheet-tab:hover {
  background: #e4e7ed;
}
.sheet-tab.active {
  background: #fff;
  color: #303133;
  border-color: #e4e7ed;
  z-index: 1;
}
.sheet-tab-close {
  margin-left: 6px;
  padding: 0 2px;
  font-size: 14px;
  line-height: 1;
  color: #909399;
  cursor: pointer;
  border-radius: 2px;
  flex-shrink: 0;
}
.sheet-tab-close:hover {
  color: #f56c6c;
  background: rgba(245, 108, 108, 0.1);
}
.sheet-tab-input {
  width: 100%;
  min-width: 80px;
  max-width: 120px;
  padding: 0 4px;
  border: 1px solid #409eff;
  border-radius: 2px;
  font-size: 12px;
  outline: none;
}
.sheet-tab-add {
  flex-shrink: 0;
  width: 32px;
  height: 28px;
  padding: 0;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #fff;
  color: #606266;
  font-size: 18px;
  font-weight: bold;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sheet-tab-add:hover {
  color: #409eff;
  border-color: #409eff;
  background: #ecf5ff;
}

/* 深色主题联动 */
.sheet-tabs.isDark {
  background: #262a2e;
  border-top-color: #3d4248;
}
.sheet-tabs.isDark .sheet-tabs-label {
  color: #c0c4cc;
}
.sheet-tabs.isDark .sheet-tab {
  background: #363b3f;
  color: #c0c4cc;
}
.sheet-tabs.isDark .sheet-tab:hover {
  background: #3d4248;
}
.sheet-tabs.isDark .sheet-tab.active {
  background: #262a2e;
  color: #e4e7ed;
  border-color: #3d4248;
}
.sheet-tabs.isDark .sheet-tab-close {
  color: #909399;
}
.sheet-tabs.isDark .sheet-tab-close:hover {
  color: #f56c6c;
  background: rgba(245, 108, 108, 0.15);
}
.sheet-tabs.isDark .sheet-tab-input {
  background: #363b3f;
  border-color: #409eff;
  color: #e4e7ed;
}
.sheet-tabs.isDark .sheet-tab-add {
  background: #363b3f;
  border-color: #3d4248;
  color: #c0c4cc;
}
.sheet-tabs.isDark .sheet-tab-add:hover {
  color: #409eff;
  border-color: #409eff;
  background: #3d4248;
}
</style>
