// 修改--朱志桓
<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="8" :lg="6" :xl="5" style="margin-bottom: 10px">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>个人信息</span>
          </div>
          <div>
            <div style="text-align: center">
              <div class="el-upload">
                <img :src="Avatar" class="avatar" />
              </div>
            </div>
            <ul class="user-info">
              <li>
                <svg-icon icon-class />用户昵称
                <div class="user-right">{{ user.userName }}</div>
              </li>
              <li>
                <svg-icon icon-class />手机号码
                <div class="user-right">{{ user.phoneNumber }}</div>
              </li>
              <li>
                <svg-icon icon-class />用户邮箱
                <div class="user-right">{{ user.email }}</div>
              </li>
              <li>
                <svg-icon icon-class />安全设置
                <div class="user-right">
                  <a @click="$refs.pass.dialog = true">修改密码</a>
                  <a @click="$refs.email.dialog = true">修改邮箱</a>
                </div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :lg="18" :xl="19">
        <!--    用户资料    -->
        <el-card class="box-card">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="用户资料" name="first">
              <el-form ref="form" :model="form" :rules="rules" style="margin-top: 10px" size="small" label-width="65px">
                <el-form-item label="昵称" prop="userName">
                  <el-input v-model="form.userName" style="width: 35%" />
                  <span style="color: #c0c0c0; margin-left: 10px">用户昵称不作为登录使用</span>
                </el-form-item>
                <el-form-item label="手机号" prop="phoneNumber">
                  <el-input v-model="form.phoneNumber" style="width: 35%" />
                  <span style="color: #c0c0c0; margin-left: 10px">手机号码不能重复</span>
                </el-form-item>
                <el-form-item label>
                  <el-button :loading="saveLoading" size="mini" type="primary" @click="doSubmit">保存配置</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
    <updateEmail ref="email" :user="user" @getUserInfo="getUserInfo" />
    <updatePass ref="pass" />
  </div>
</template>

<script>
import updatePass from './center/updatePass'
import updateEmail from './center/updateEmail'
import { isvalidPhone } from '@/utils/validate'
import Avatar from '../../../static/image/common/logo.png'
import profileApi from '@/api/system/profile'
import Cookies from 'js-cookie'
export default {
  name: 'Center',
  components: {
    updatePass,
    updateEmail
  },
  data() {
    // 自定义验证
    const validPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入电话号码'))
      } else if (!isvalidPhone(value)) {
        callback(new Error('请输入正确的11位手机号码'))
      } else {
        callback()
      }
    }
    return {
      Avatar: Avatar,
      activeName: 'first',
      saveLoading: false,
      user: {},
      form: {},
      rules: {
        userName: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        phoneNumber: [{ required: true, trigger: 'blur', validator: validPhone }]
      }
    }
  },
  computed: {},
  created() {
    this.getUserInfo()
  },
  methods: {
    handleClick(tab, event) {
      if (tab.name === 'second') {
        this.init()
      }
    },
    getUserInfo() {
      profileApi.getInfo({}).then(res => {
        this.user = res
        this.user.userName = Cookies.get('CustomerUser')
        this.form = {
          name: this.user.name,
          email: this.user.email,
          extraProperties: this.user.extraProperties,
          phoneNumber: this.user.phoneNumber,
          surname: this.user.surname,
          userName: this.user.userName
        }
      })
    },
    doSubmit() {
      if (this.$refs['form']) {
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.saveLoading = true
            profileApi
              .changeInfo(this.form)
              .then(() => {
                this.$message.success('修改成功')
                this.saveLoading = false
                this.getUserInfo()
              })
              .catch(() => {
                this.$message.error('修改失败')
                this.saveLoading = false
              })
          }
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
.user-info {
  padding-left: 0;
  list-style: none;
  li {
    border-bottom: 1px solid #f0f3f4;
    padding: 11px 0;
    font-size: 13px;
  }
  .user-right {
    float: right;
    a {
      color: #317ef3;
    }
  }
}
</style>
