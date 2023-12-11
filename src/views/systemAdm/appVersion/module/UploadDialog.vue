<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="上传文件"
      :width="dialogWidth + 'px'"
      :visible.sync="show"
      custom-class="customWidth"
      :close-on-click-modal="false"
      @close="cancel"
    >
      <Form
        ref="formList"
        :form-data="form"
        :form-list="formList"
        :is-handle="false"
        :layout="{ span: 24 }"
        size="small"
        :label-width="90"
      />
      <el-form label-width="70px">
        <!-- <el-form-item label="版本号">
          <el-input v-model="version" placeholder="请输版本号" clearable />
        </el-form-item>
        <el-form-item label="版本描述">
          <el-input v-model="versionDesc" placeholder="请输版本描述" clearable />
        </el-form-item>-->
        <el-upload
          ref="upload"
          drag
          class="upload-demo"
          action="#"
          :limit="1"
          multiple
          accept=".apk"
          :on-change="handleChange"
          :on-remove="handleRemove"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :http-request="uploadFile"
          :auto-upload="false"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div slot="tip" class="el-upload__tip">只能上传1个apk文件</div>
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="hasTemplate" type="success" size="mini" @click="handleTemplate">下载导入模板</el-button>
        <el-button :loading="formLoading" type="primary" size="mini" @click="submitUpload">上传到服务器</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Form from '@/components/Form'
import { API } from '@/api/generalAPI'
import { formList } from '../config'
export default {
  name: 'UploadDialog',
  components: { Form },
  mixins: [],
  props: {
    dialogVisible: { type: Boolean }, // 弹窗显示
    dialogWidth: { type: Number, default: 400 }, // 弹窗宽度
    formData: { type: Object, default: () => {} }, // 表单数据
    hasTemplate: { type: Boolean, default: false }, // 是否有导入模板
    templatePath: { type: String, default: '' }, // 导入模板路径
    apiName: { type: String, default: '' } // 请求后端的api的控制器名称
  },
  data() {
    return {
      formList,
      // version: '',
      // versionDesc: '',
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
  methods: {
    /** 弹窗关闭 */
    cancel() {
      this.show = false
      this.$refs.upload.clearFiles()
    },
    /** 下载导入模板 */
    handleTemplate() {
      var url = window.globalConfig.base.ip + ':' + window.globalConfig.base.backend_port + this.templatePath
      // window.location.href = url
      window.open(url)
      this.$notify({
        title: '成功',
        message: '导入模板下载成功',
        type: 'success',
        duration: 2000
      })
    },
    /** 自定义上传功能 */
    uploadFile(file) {
      this.fileData.append('files', file.file)
    },
    /** 自定义上传功能 */
    submitUpload() {
      if (this.fileList.length === 0) {
        this.$message({
          message: '请先选择文件',
          type: 'warning'
        })
      } else {
        this.formLoading = true
        let fileData = new FormData()
        this.fileList.forEach(file => {
          fileData.append('file', file.raw, file.raw.name)
        })
        API.bothPost(this.apiName, this.formData, fileData, 'Import')
          .then(res => {
            if (res.success) {
              this.$notify({
                title: '成功',
                message: '数据导入成功',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify({
                title: '失败',
                message: '数据导入失败,' + res.message,
                type: 'error',
                duration: 4000
              })
            }
            this.formLoading = false
            this.show = false
            this.$refs.upload.clearFiles()
            // 刷新数据，清空查询条件
            this.$emit('reset', 0)
          })
          .catch(() => {
            this.$notify({
              title: '失败',
              message: '数据导入失败',
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
        `当前限制选择1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    /** 监控上传文件列表,判断是否已存在 */
    handleChange(file, fileList) {
      let existFile = fileList.slice(0, fileList.length - 1).find(f => f.name === file.name)
      if (existFile) {
        this.$message.error('当前文件已经存在!')
        fileList.pop()
      }
      this.fileList = fileList
    }
  }
}
</script>
