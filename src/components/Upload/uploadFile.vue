<template>
  <el-upload
    ref="fileUpload"
    class="upload-demo"
    action
    :before-remove="handleBeforeRemove"
    :before-upload="beforeFileUpload"
    :on-change="filePreview"
    :on-remove="handleRemove"
    :headers="headers"
    :file-list="filelist"
    :limit="1"
    :on-exceed="handleExceed"
    :auto-upload="false"
  >
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">请上传文件</div>
  </el-upload>
</template>

<script>
import { getToken } from '@/utils/auth'
export default {
  name: 'UploadFile',
  props: {
    // 文件列表
    filelist: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 文件类型
    type: {
      type: String,
      default: function () {
        return ''
      }
    }
  },
  data() {
    return {
      headers: {
        Authorization: getToken()
      },
      files: [],
      fileForm: {
        fileType: '',
        file: null
      }
    }
  },
  methods: {
    // 删除文件时的钩子
    handleRemove(file, fileList) {
      this.fileForm.file = null
      console.log('删除', this.fileForm)
      //   this.$emit('deleteFile')
    },

    // 删除文件前的钩子
    handleBeforeRemove(file, fileList) {
      // for (let i = 0; i < this.files.length; i++) {
      //   if (this.files[i].uid === file.uid) {
      //     return true
      //   }
      // }
    },

    // 上传文件之前的钩子
    beforeFileUpload(file) {
      const extension = file.name.split('.')[1] === 'xls'
      const extension2 = file.name.split('.')[1] === 'xlsx'
      const extension3 = file.name.split('.')[1] === 'doc'
      const extension4 = file.name.split('.')[1] === 'docx'
      const extension5 = file.name.split('.')[1] === 'pdf'
      const isLt2M = file.size / 1024 / 1024 < 50
      if (!extension && !extension2 && !extension3 && !extension4 && !extension5) {
        alert('上传模板格式错误!')
      }
      if (!isLt2M) {
        alert('上传模板大小不能超过 50MB!')
      }
      return extension || extension2 || extension3 || extension4 || (extension5 && isLt2M)
    },

    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      this.$message.warning('只能上传一个文件')
    },

    // 添加文件时的钩子
    filePreview(file, fileList) {
      const fileName = file.name
      const regex = /(.xls|.xlsx|.doc|.docx|.pdf)$/
      if (regex.test(fileName.toLowerCase())) {
        this.fileForm.file = file.raw
        this.fileForm.fileType = this.type
        this.uploadFile()
      } else {
        this.$message.error('文件格式错误，请重新选择文件')
      }
    },

    // 上传文件
    uploadFile() {
      console.log('提交:', this.fileForm)
      // 提交成功,返回路径
      // this.$message.success('上传成功！')
      this.$emit('getFileUrl', '文件url')

      // 提交失败,提示失败
      // this.$message.error('上传失败,请重新上传！')
    }
  }
}
</script>

<style>
</style>
