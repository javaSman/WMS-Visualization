<template>
  <div>
    <el-dialog
      v-dialogDrag
      :width="dialogWidth + 'px'"
      :visible.sync="show"
      :close-on-click-modal="false"
      :title="formTitle"
      @close="cancel"
    >
      <Form
        ref="form"
        :layout="layout"
        :inline="true"
        :form-data="formData"
        :form-list="batchFormList"
        :is-handle="false"
        size="small"
        :label-width="110"
      />
      <Table
        ref="table"
        :height="300"
        :data-list="dataList"
        :column="batchTableList"
        :has-selection="false"
        :dict-gather="dictGather"
      />
      <div slot="footer" class="dialog-footer">
        <!-- '取消' -->
        <el-button size="small" type="text" @click="cancel">{{ $t('button.cancel') }}</el-button>
        <!-- '确认' -->
        <el-button :loading="formLoading" size="small" type="primary" @click="save">
          {{ $t('button.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Table from '@/components/Table'
import Form from '@/components/Form'
import { API } from '@/api/generalAPI'
export default {
  name: 'UpdataDialog',
  components: { Table, Form },
  props: {
    layout: {
      type: Object,
      default: () => {
        return { span: 12 }
      }
    }, // 布局
    dialogVisible: { type: Boolean, default: false }, // 弹窗显示
    dialogWidth: { type: Number, default: 1000 }, // 弹窗宽度
    formTitle: {
      type: String,
      default() {
        return this.$t('dialog.batchUpdate')
      }
    }, // '批量更新'  // 弹窗标题内容
    batchFormList: { type: Array, default: () => [] }, // 表单字段参数
    batchTableList: { type: Array, default: () => [] }, // 表格字段参数
    formData: { type: Object, default: () => {} }, // 表单数据
    dataList: { type: Array, default: () => [] }, // 表格数据
    apiName: { type: String, default: '' }, // 请求后端的api页面名称
    api: { type: Object, default: () => {} }, // 非标接口
    dictGather: { type: Array, default: () => [] }, // 数据字典集合
    submit: {
      type: Function,
      default: () => {
        return false
      }
    } // 自定义的提交事件
  },
  data() {
    return {
      formLoading: false, // 确定按钮加载状态
      isSave: false, // 是否保存（用于窗口关闭判断）
      listLoading: false
    }
  },

  computed: {
    show: {
      get() {
        return this.dialogVisible
      },
      set(val) {
        let data = { dialogVisible: val, isSave: this.isSave }
        // cancel 关闭弹窗父组件执行的方法
        return this.$emit('cancel', data)
      }
    }
  },
  methods: {
    cancel() {
      this.isSave = false
      this.show = false
      this.$refs.form.$refs.formList.clearValidate()
    },
    /** 确定按钮提交表单，判断是否非标接口 */
    save() {
      if (this.api) {
        this.handleSubmit(this.api)
      } else {
        this.handleSubmit(API)
      }
    },
    /** 表单提交事件 */
    handleSubmit(api) {
      this.$refs.form.$refs.formList.validate(async valid => {
        if (valid) {
          let apiMethod = 'BatchUpdate'
          this.formLoading = true
          // if (this.formData.ids) {
          this.dataList.forEach(items => {
            let id = items.id
            this.formData.ids.push(id)
          })
          // }
          if (await this.submit(this.formData, apiMethod)) {
            this.formLoading = false
            return // 表单验证完后，若有自定义方法，则执行
          }
          api
            .dataPost(this.apiName, this.formData, apiMethod)
            .then(res => {
              this.formLoading = false
              if (res === true) {
                this.$notify({
                  title: this.$t('notify.success'), // '成功'
                  message: this.$t('notify.operateSuccess'), // '操作成功',
                  type: 'success',
                  duration: 2000
                })
                this.show = false
              } else {
                this.$notify({
                  title: this.$t('notify.failure'), // '失败'
                  message: this.$t('notify.operateFailure'), // '操作失败',
                  type: 'error',
                  duration: 2000
                })
                this.show = false
              }
              // reset父组件的自定义事件：重置父页刷新数据,不传参数时，查询条件不变
              this.$emit('reset')
            })
            .catch(() => {
              this.formLoading = false
            })
        }
      })
    }
  }
}
</script>
