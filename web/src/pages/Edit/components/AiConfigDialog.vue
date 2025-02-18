<template>
  <el-dialog
    class="aiConfigDialog"
    title="AI配置"
    :visible.sync="aiConfigDialogVisible"
    width="550px"
    append-to-body
  >
    <div class="aiConfigBox">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleFormRef"
        label-width="100px"
      >
        <p class="title">火山方舟大模型配置：</p>
        <p class="desc">
          目前仅支持火山方舟大模型，需要自行去获取key，详细操作步骤见：<a
            href=""
            >教程</a
          >。
        </p>
        <el-form-item label="API Key" prop="key">
          <el-input v-model="ruleForm.key"></el-input>
        </el-form-item>
        <el-form-item label="推理接入点" prop="model">
          <el-input v-model="ruleForm.model"></el-input>
        </el-form-item>
        <el-form-item label="接口" prop="api">
          <el-input v-model="ruleForm.api"></el-input>
        </el-form-item>
        <el-form-item label="请求方式" prop="method">
          <el-select v-model="ruleForm.method" placeholder="请选择">
            <el-option key="POST" label="POST" value="POST"></el-option>
            <el-option key="GET" label="GET" value="GET"></el-option>
          </el-select>
        </el-form-item>
        <p class="title">思绪思维导图客户端配置：</p>
        <el-form-item label="端口" prop="port">
          <el-input v-model="ruleForm.port"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="confirm">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      aiConfigDialogVisible: false,
      ruleForm: {
        api: '',
        key: '',
        model: '',
        port: '',
        method: ''
      },
      rules: {
        api: [{ required: true, message: '请输入接口', trigger: 'blur' }],
        key: [{ required: true, message: '请输入API Key', trigger: 'blur' }],
        model: [
          { required: true, message: '请输入推理接入点', trigger: 'blur' }
        ],
        port: [{ required: true, message: '请输入端口', trigger: 'blur' }],
        method: [{ required: true, message: '请选择', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapState(['aiConfig'])
  },
  watch: {
    visible(val) {
      this.aiConfigDialogVisible = val
    },
    aiConfigDialogVisible(val, oldVal) {
      if (!val && oldVal) {
        this.close()
      }
    }
  },
  created() {
    this.initFormData()
  },
  methods: {
    ...mapMutations(['setLocalConfig']),

    close() {
      this.$emit('change', false)
    },

    initFormData() {
      Object.keys(this.aiConfig).forEach(key => {
        this.ruleForm[key] = this.aiConfig[key]
      })
    },

    cancel() {
      this.close()
      this.initFormData()
    },

    confirm() {
      this.$refs.ruleFormRef.validate(valid => {
        if (valid) {
          this.close()
          this.setLocalConfig({
            ...this.ruleForm
          })
          this.$message.success('配置保存成功')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.aiConfigDialog {
  /deep/ .el-dialog__body {
    padding: 12px 20px;
  }

  .aiConfigBox {
    .title {
      margin-bottom: 12px;
      font-weight: bold;
    }

    .desc {
      margin-bottom: 12px;
      padding-left: 12px;
      border-left: 5px solid #ccc;
    }
  }
}
</style>
