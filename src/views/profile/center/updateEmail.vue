// 新增--朱志桓
<template>
  <div style="display: inline-block">
    <el-dialog
      v-dialogDrag
      :visible.sync="dialog"
      :close-on-click-modal="false"
      :before-close="cancel"
      :title="title"
      append-to-body
      width="475px"
      @close="cancel"
    >
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="88px">
        <el-form-item label="新邮箱" prop="email">
          <el-input v-model="form.email" auto-complete="on" style="width: 320px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="cancel">取消</el-button>
        <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { validEmail } from '@/utils/validate'
import profileApi from '@/api/system/profile'
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    const validMail = (rule, value, callback) => {
      if (value === '' || value === null) {
        callback(new Error('新邮箱不能为空'))
      } else if (value === this.user.email) {
        callback(new Error('新邮箱不能与旧邮箱相同'))
      } else if (validEmail(value)) {
        callback()
      } else {
        callback(new Error('邮箱格式错误'))
      }
    }
    return {
      loading: false,
      dialog: false,
      title: '修改邮箱',
      form: {
        email: ''
      },
      rules: {
        email: [{ required: true, validator: validMail, trigger: 'blur' }]
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.formData = {
            name: this.user.name,
            email: this.form.email,
            extraProperties: this.user.extraProperties,
            phoneNumber: this.user.phoneNumber,
            surname: this.user.surname,
            userName: this.user.userName
          }
          this.loading = true
          profileApi
            .changeInfo(this.formData)
            .then(() => {
              this.$message.success('修改成功')
              this.$emit('getUserInfo')
              this.loading = false
              this.resetForm()
            })
            .catch(() => {
              this.$message.error('修改失败')
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = { email: '' }
    }
  }
}
</script>

<style scoped>
</style>
