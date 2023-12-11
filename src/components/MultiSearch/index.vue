<template>
  <div>
    <el-dialog title="多条件筛选" :visible.sync="visible" width="700px" :before-close="cancel">
      <el-input
        v-model="formData.textarea"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 10 }"
        @input="submitDomain"
      />
      <div v-for="(domain, index) in formData.domains" :key="domain.key" class="box">
        <span class="title">关键字{{ index + 1 }}：</span>
        <el-input v-model="domain.value" style="width: 70%" @input="changeDomain" />
        <el-button type="danger" plain @click.prevent="removeDomain(domain)">删除</el-button>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'MultiSearch',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        domains: [],
        textarea: ''
      }
    }
  },
  methods: {
    // 取消
    cancel() {
      this.formData = {
        domains: [],
        textarea: ''
      }
      this.$emit('closeMultiSearch')
    },
    // 确定
    handleSubmit() {
      this.$emit('saveMultiSearch', this.formData.domains)
      this.formData = {
        domains: [],
        textarea: ''
      }
    },
    // 生成多个文本框
    submitDomain() {
      this.formData.domains = []
      if (this.formData.textarea.length > 0) {
        this.formData.textarea.split('\n').forEach(item => {
          this.formData.domains.push({
            value: item,
            key: Date.now() + Math.random()
          })
        })
      }
    },
    // 修改选项
    changeDomain() {
      const dataArray = []
      this.formData.domains.forEach(item => {
        dataArray.push(item.value)
      })
      this.formData.textarea = dataArray.join('\n')
    },
    // 删除选项
    removeDomain(item) {
      var index = this.formData.domains.indexOf(item)
      if (index !== -1) {
        this.formData.domains.splice(index, 1)
      }
      this.changeDomain()
    }
  }
}
</script>
<style lang="less" scoped>
.box {
  margin-top: 10px;
  .title {
    display: block;
    width: 15%;
    height: 32px;
    line-height: 32px;
    text-align: center;
    font-size: 15px;
    float: left;
  }
}
</style>
