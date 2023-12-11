<template>
  <div>
    <!-- '上传文件' -->
    <el-dialog
      v-dialogDrag
      :title="this.$t('upload.uploadFiles')"
      :width="dialogWidth + 'px'"
      :visible.sync="show"
      custom-class="customWidth"
      :close-on-click-modal="false"
      @close="cancel"
    >
      <el-form label-width="100px">
        <el-upload
          ref="upload"
          drag
          class="upload-demo"
          action="#"
          :limit="fileNum"
          multiple
          :accept="fileType"
          :on-change="handleChange"
          :on-remove="handleRemove"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :http-request="uploadFile"
          :auto-upload="false"
        >
          <i class="el-icon-upload" />
          <!-- '将文件拖到此处，或点击上传' -->
          <div class="el-upload__text">
            {{ $t('upload.dragFile') }}
            <em>{{ $t('upload.clickUpload') }}</em>
          </div>
          <!-- 只能上传'.xls,.xlsx'文件，且上限数量为'1'-->
          <div slot="tip" class="el-upload__tip">
            {{ $t('upload.uploadTips1') }}{{ fileType }} {{ $t('upload.uploadTips2') }}{{ fileNum }}
          </div>
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- '下载导入模板'
        <el-button v-if="hasTemplate" type="success" size="mini" @click="handleTemplate">
          {{ $t('upload.downloadTemplate') }}
        </el-button> -->
        <!-- '上传到服务器' -->
        <el-button :loading="formLoading" type="primary" size="mini" @click="submitUpload">
          {{ $t('upload.uploadToServer') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { API } from '@/api/generalAPI'
export default {
  name: 'UploadDialog',
  components: {},
  mixins: [],
  props: {
    dialogVisible: { type: Boolean, default: false }, // 弹窗显示
    dialogWidth: { type: Number, default: 400 }, // 弹窗宽度
    fileNum: { type: Number, default: 1 }, // 最大允许上传个数
    fileType: { type: String, default: '.xls,.xlsx' }, // 接受上传的文件类型
    hasTemplate: { type: Boolean, default: false }, // 是否有导入模板
    templatePath: { type: String, default: '' }, // 导入模板路径
    apiName: { type: String, default: '' }, // 请求后端的api的控制器名称
    api: { type: Object, default: () => {} } // 非标接口，如角色管理和用户管理
  },
  data() {
    return {
      fileList: [], // 上传的文件列表
      formLoading: false // 上传按钮加载状态
    }
  },
  computed: {
    show: {
      get() {
        return this.dialogVisible
      },
      set(val) {
        return this.$emit('cancel', val)
      }
    }
  },
  methods: {
    /** 弹窗关闭，清空已选中的文件列表（ */
    cancel() {
      this.show = false
      this.$refs.upload.clearFiles()
    },
    /** 下载导入模板 */
    handleTemplate() {
      var url = window.globalConfig.base.ip + ':' + window.globalConfig.base.backend_port + this.templatePath
      window.location.href = url
      this.$notify({
        title: this.$t('notify.success'), // '成功'
        message: this.$t('upload.downloadSuccess'), // '导入模板下载成功',
        type: 'success',
        duration: 2000
      })
    },
    /** 自定义上传功能 */
    uploadFile(file) {
      this.fileData.append('files', file.file)
    },

    /** 上传至服务器，判断是否非标接口路由 */
    submitUpload() {
      if (this.api) {
        this.handleSubmit(this.api)
      } else {
        this.handleSubmit(API)
      }
    },
    /** 上传至服务器 */
    handleSubmit(api) {
      if (this.fileList.length === 0) {
        this.$message({
          message: this.$t('upload.pleaseSelect'), // '请先选择文件',
          type: 'warning'
        })
      } else {
        this.formLoading = true
        var formData = new FormData()
        this.fileList.forEach(file => {
          formData.append('file', file.raw, file.raw.name)
        })
        api
          .dataPost(this.apiName, formData, 'Import')
          .then(res => {
            if (res.success) {
              this.$notify({
                title: this.$t('notify.success'), // '成功'
                message: this.$t('upload.importSuccess'), // '数据导入成功'
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify({
                title: this.$t('notify.failure'), // '失败'
                message: this.$t('upload.importFailure') + ',' + res.message, // '数据导入失败，**'
                // 接口返回数据，待中英配置
                type: 'error',
                duration: 4000
              })
            }
            this.formLoading = false
            this.show = false
            this.$refs.upload.clearFiles()
            // 重置方法，调用父组件的自定义事件，清空查询条件为默认值
            this.$emit('reset', 0)
          })
          .catch(() => {
            this.$notify({
              title: this.$t('notify.failure'), // '失败'
              message: this.$t('upload.importFailure'), // '数据导入失败'
              type: 'error',
              duration: 2000
            })
            this.formLoading = false
          })
      }
    },
    /** 文件列表移除文件 */
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    /** 选取文件超过数量提示,
     * `当前限制选择'2'个文件，本次选择了'3'个文件，共选择了'3'个文件`
     */
    handleExceed(files, fileList) {
      this.$message.warning(
        `${this.$t('upload.exceededTips1')}${this.fileNum}${this.$t('upload.exceededTips2')}${files.length}
        ${this.$t('upload.exceededTips3')}${files.length + fileList.length}${this.$t('upload.exceededTips4')}`
      )
    },
    /** 监控上传文件列表,判断是否已存在 */
    handleChange(file, fileList) {
      let existFile = fileList.slice(0, fileList.length - 1).find(f => f.name === file.name)
      if (existFile) {
        this.$message.error(this.$t('upload.fileExists')) // '当前文件已经存在！'
        fileList.pop()
      }
      this.fileList = fileList
    }
  }
}
</script>
