<template>
  <el-upload
    ref="imageUpload"
    action
    list-type="picture-card"
    :before-upload="beforeFileUpload"
    :on-change="imgPreview"
    :on-remove="handleRemove"
    :headers="headers"
    :file-list="photolist"
    :limit="1"
    :on-exceed="handleExceed"
    :auto-upload="false"
    accept="image/jpeg, image/jpg, image/png"
  >
    <i class="el-icon-plus" />
  </el-upload>
</template>
<script>
import { getToken } from '@/utils/auth'
export default {
  name: 'UploadImg',
  props: {
    // 文件列表
    photolist: {
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
      imgForm: {
        fileType: '',
        file: null
      }
    }
  },
  methods: {
    // 删除文件时的钩子
    handleRemove(file, fileList) {
      this.imgForm.file = null
      console.log('删除', this.imgForm)
      //   this.$emit('deleteFile')
    },

    // 上传文件之前的钩子
    beforeFileUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },

    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      this.$message.warning('只能上传一张图片')
    },

    // 添加文件时的钩子
    imgPreview(file, fileList) {
      const fileName = file.name
      const regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/
      if (regex.test(fileName.toLowerCase())) {
        // 判断上传图片的类型
        this.imgForm.file = file.raw
        this.imgForm.fileType = this.type
        this.uploadFile()
      } else {
        this.$message.error('请选择图片文件')
      }
    },

    // 上传文件
    uploadFile() {
      console.log('提交:', this.imgForm)
      // 提交成功返回路径
      // this.$message.success('上传成功！')
      this.$emit('getFileUrl', '图片url')

      // 提交失败提示失败
      // this.$message.error('上传失败,请重新上传！')
    }
  }
}
</script>
