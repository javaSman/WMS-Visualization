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
import Cookies from 'js-cookie'
import { wcsAPI } from '@/api/generalAPI'
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
    formTitle: { type: String, require: true, default: '' }, // 弹窗名称
    formList: { type: Array, default: () => [] }, // 表单字段参数
    formData: { type: Object, default: () => {} }, // 表单数据
    isEdit: { type: Boolean, default: false }, // 是否为编辑弹窗
    apiName: { type: String, default: '' }, // 请求后端的api页面名称
    apiMethod: { type: String, default: '' }, // 请求后端的api页面的方法
    api: { type: Object, default: () => {} }, // 非标接口，如角色管理和用户管理
    lazyLoadOpts: { type: Function, default: () => {} }, // 级联选择器数据动态加载方法
    loadOptions: { type: Function, default: () => {} }, // 树形下拉框数据加载方法
    cbgFilter: { type: Function, default: () => {} }, // 下拉网格 自定义搜索方法
    cbgRemote: { type: Function, default: () => {} }, // 自定义的提交事件
    submit: {
      type: Function,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      formLoading: false // 确认按钮加载状态
    }
  },
  computed: {
    show: {
      get() {
        return this.dialogFormVisible
      },
      set(val) {
        let data = { dialogFormVisible: val }
        return this.$emit('cancel', data)
      }
    }
  },
  created() {},
  methods: {
    /** 弹窗关闭事件，恢复字段初始值，重置表单验证结果，复选框选项 */
    cancel() {
      this.show = false
      this.$refs.formList.$refs.formList.clearValidate()
    },
    /** 表单提交事件 */
    handleSubmit(api) {
      this.$refs.formList.$refs.formList.validate(async valid => {
        if (valid) {
          this.formLoading = true
          this.formData.CustomerEditorID = Cookies.get('CustomerUser')
          if (await this.submit(this.formData)) {
            this.formLoading = false
            return // 表单验证完后，若有自定义方法，则执行
          }
          api
            .dataPost(this.apiName, this.formData, this.apiMethod)
            .then(res => {
              if (res.success) {
                this.formLoading = false
                this.$notify({
                  title: this.$t('notify.success'), // '成功'
                  message: this.$t('notify.operateSuccess'), // '操作成功',
                  type: 'success',
                  duration: 2000
                })
                this.show = false
                this.$emit('reset')
              } else {
                this.formLoading = false
                this.$notify({
                  title: this.$t('notify.failure'), // '失败'
                  message: this.$t('notify.operateFailure') + ',' + res.message, // '操作失败',// 接口返回数据，待中英配置
                  type: 'error',
                  duration: 2000
                })
                this.show = false
              }
            })
            .catch(() => {
              this.formLoading = false
            })
        }
      })
    },
    /** 确定按钮提交表单，判断是否非标接口 */
    save() {
      if (this.api) {
        this.handleSubmit(this.api)
      } else {
        this.handleSubmit(wcsAPI)
      }
    }
  }
}
</script>
