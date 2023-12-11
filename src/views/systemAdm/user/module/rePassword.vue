<template>
  <div>
    <el-dialog
      v-dialogDrag
      width="450px"
      :visible.sync="show"
      :close-on-click-modal="false"
      :title="formTitle"
      @close="cancel"
    >
      <Form
        ref="form"
        :inline="true"
        :form-data="form"
        :form-list="rePasswordFormList"
        :is-handle="false"
        size="small"
        :label-width="130"
        :layout="{ span: 24 }"
      />
      <div slot="footer" class="dialog-footer">
        <!-- '取消' -->
        <el-button size="small" type="text" @click="cancel">{{ $t('button.cancel') }}</el-button>
        <!-- '确认' -->
        <el-button :loading="formLoading" size="small" type="primary" @click="save">{{
          $t('button.confirm')
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Form from '@/components/Form'
import { rePasswordFormList } from '../config'
export default {
  name: 'UpdataDialog',
  components: { Form },
  props: {
    dialogVisible: { type: Boolean },
    formTitle: { type: String, require: true, default: '' },
    formData: { type: Object, default: () => {} },
    apiName: { type: String, default: '' },
    api: { type: Object, default: () => {} },
    formList: { type: Array, default: () => [] }
  },
  data() {
    return {
      rePasswordFormList,
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
    },
    form: {
      get() {
        return this.formData
      },
      set(val) {
        return this.formData
      }
    }
  },
  created() {},
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
          let params = {
            id: this.formData.id,
            password: this.formData.password
          }
          this.api
            .dataPost(this.apiName, params, 'ResetPassword')
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
