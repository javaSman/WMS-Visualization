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
    },
    dialogVisible: { type: Boolean, default: false },
    dialogWidth: { type: Number, default: 1000 },
    formTitle: {
      type: String,
      default() {
        return this.$t('dialog.batchShelves')
      }
    }, // '批量下架'
    batchFormList: { type: Array, default: () => [] },
    batchTableList: { type: Array, default: () => [] },
    formData: { type: Object, default: () => {} },
    dataList: { type: Array, default: () => [] },
    apiName: { type: String, default: '' },
    dictGather: { type: Array, default: () => [] } // 数据字典集合
  },
  data() {
    return {
      formLoading: false,
      isSave: false,
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
    save() {
      this.$refs.form.$refs.formList.validate(valid => {
        if (valid) {
          this.formLoading = true
          this.dataList.forEach(items => {
            let boxIDs = items.boxID
            this.formData.boxIDs.push(boxIDs)
          })
          API.dataPost(this.apiName, this.formData, 'BoxBatchOutShelves')
            .then(res => {
              this.formLoading = false
              if (res.success === true) {
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
                  // 接口返回数据，待中英配置
                  message: this.$t('notify.operateFailure') + ',' + res.message, // '操作失败',
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
