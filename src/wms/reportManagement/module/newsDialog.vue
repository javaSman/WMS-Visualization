<template>
  <el-dialog
    v-dialogDrag
    :width="dialogWidth + 'px'"
    :visible.sync="show"
    :close-on-click-modal="false"
    :title="formTitle"
    @close="cancel"
  >
    <Form
      ref="formList"
      size="small"
      :layout="layout"
      :form-data="formData"
      :form-list="formList"
      :is-handle="false"
      :is-edit="isEdit"
      :label-position="formLabelPosition"
      :load-options="loadOptions"
      :lazy-load-opts="lazyLoadOpts"
      :cbg-filter="cbgFilter"
      :cbg-remote="cbgRemote"
      :label-width="130"
    />
    <div slot="footer" class="dialog-footer">
      <!-- '取消' -->
      <el-button size="small" type="text" @click="show = false">{{ $t('button.cancel') }}</el-button>
      <!-- '确认' -->
      <el-button :loading="formLoading" size="small" type="primary" @click="save">{{ $t('button.confirm') }}</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { API } from '@/api/generalAPI'
// import Table from '@/components/Table'

import Form from '@/components/Form'
export default {
  name: 'EditDialog',
  components: { Form },
  props: {
    layout: {
      type: Object,
      default: () => {
        return {
          gutter: 10,
          span: 12,
          xs: 24,
          sm: 12,
          md: 8,
          xl: 6
        }
      }
    }, // 布局
    dialogFormVisible: { type: Boolean, default: false }, // 弹窗显示
    dialogWidth: { type: Number, default: 750 }, // 弹窗宽度
    formLabelPosition: { type: String, default: 'right' }, // 表单域标签的位置
    formTitle: { type: String, require: true, default: '' }, // 弹窗名称
    formList: { type: Array, default: () => [] }, // 表单字段参数
    formData: { type: Object, default: () => {} }, // 表单数据
    isEdit: { type: Boolean, default: false }, // 是否为编辑弹窗
    apiName: { type: String, default: '' }, // 请求后端的api页面名称
    api: { type: Object, default: () => {} }, // 非标接口，如角色管理和用户管理
    lazyLoadOpts: { type: Function, default: () => {} }, // 级联选择器数据动态加载方法
    loadOptions: { type: Function, default: () => {} }, // 树形下拉框数据加载方法
    cbgFilter: { type: Function, default: () => {} }, // 下拉网格 自定义搜索方法
    cbgRemote: { type: Function, default: () => {} }, // 下拉网格 远程搜索方法
    submit: {
      type: Function,
      default: () => {
        return false
      }
    } // 自定义的提交事件
  },
  data() {
    return {
      formLoading: false, // 确认按钮加载状态
      isSave: false, // 是否保存（用于窗口关闭判断）
      hasAdd: false, // 此次操作是否添加过数据
      addContinue: false // 是否继续增加 ,默认否
    }
  },
  computed: {
    show: {
      get() {
        return this.dialogFormVisible
      },
      set(val) {
        let data = { dialogFormVisible: val, isSave: this.isSave, hasAdd: this.hasAdd, isEdit: this.isEdit }
        return this.$emit('cancel', data)
      }
    }
  },
  created() {},
  methods: {
    /** 弹窗关闭事件，恢复字段初始值，重置表单验证结果，复选框选项 */
    cancel() {
      this.isSave = false
      this.hasAdd = false
      this.show = false
      this.addContinue = false
      this.$refs.formList.$refs.formList.clearValidate()
    },
    /** 表单提交事件 */
    handleSubmit(api) {
      this.$refs.formList.$refs.formList.validate(async valid => {
        if (valid) {
          this.formLoading = true
          if (await this.submit(this.formData)) {
            this.formLoading = false
            return // 表单验证完后，若有自定义方法，则执行
          }
          if (this.isEdit) {
            api
              .update(this.apiName, this.formData)
              .then(res => {
                this.formLoading = false
                this.isSave = true
                this.show = false
                this.$notify({
                  title: this.$t('notify.success'), // '成功'
                  message: this.$t('notify.editSuccess'), // '更新成功'
                  type: 'success',
                  duration: 2000
                })
                // this.$emit('reset')
              })
              .catch(() => {
                this.formLoading = false
              })
          } else {
            api
              .dataPost(this.apiName, this.formData)
              .then(res => {
                this.hasAdd = true
                this.formLoading = false
                this.isSave = true
                this.$notify({
                  title: this.$t('notify.success'), // '成功'
                  message: this.$t('notify.addSuccess'), // '新增成功'
                  type: 'success',
                  duration: 2000
                })
                if (this.addContinue) {
                  this.$emit('create')
                  // this.$emit('reset', 0)
                } else {
                  this.show = false
                  this.addContinue = true
                  // this.$emit('reset', 0)
                }
              })
              .catch(() => {
                this.formLoading = false
              })
          }
        }
      })
    },
    /** 确定按钮提交表单，判断是否非标接口 */
    save() {
      if (this.api) {
        this.handleSubmit(this.api)
      } else {
        this.handleSubmit(API)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
