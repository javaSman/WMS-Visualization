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
        size="small"
        :is-handle="false"
        :form-data="form"
        :form-list="formList"
        :label-width="130"
        :layout="layout"
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
import { API } from '@/api/generalAPI'
import Form from '@/components/Form'
export default {
  name: 'EditAlleyOutShelves',
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
    dialogVisible: { type: Boolean },
    dialogWidth: { type: Number, default: 750 }, // 弹窗宽度
    formTitle: { type: String, require: true, default: '' },
    formData: { type: Object, default: () => {} },
    formList: { type: Array, default: () => [] },
    apiName: { type: String, default: '' },
    api: { type: Object, default: () => {} }
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
    handleSubmit(api) {
      this.$refs.form.$refs.formList.validate(valid => {
        if (valid) {
          this.formLoading = true
          console.log(this.formData)
          api
            .dataPost(this.apiName, this.formData, 'AlleyOutShelves')
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
              this.show = false
            })
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
