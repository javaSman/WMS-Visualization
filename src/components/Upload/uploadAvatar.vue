<template>
  <div class="el-upload">
    <el-button @click="toggleShow">上传头像</el-button>
    <myUpload
      v-model="avatarShow"
      :headers="headers"
      :url="updateAvatarApi"
      :width="200"
      :height="200"
      :size="size"
      lang-type="zh"
      img-format="png"
      :no-rotate="false"
      field="Avatar1"
      :with-credentials="true"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
    />
  </div>
</template>
<script>
import myUpload from 'vue-image-crop-upload'
import { getToken } from '@/utils/auth'
export default {
  name: 'UploadAvatar',
  components: {
    myUpload
  },
  data() {
    return {
      // 请求头
      headers: {
        Authorization: getToken()
      },
      avatarShow: false,
      imgDataUrl: '',
      size: 2.1
    }
  },
  computed: {
    updateAvatarApi() {
      return 'https://httpbin.org/post'
    }
  },
  methods: {
    // 上传头像
    toggleShow() {
      this.avatarShow = !this.avatarShow
    },
    // 图片截取完成事件（上传前), 参数( imageDataUrl, field )
    cropSuccess(imgDataUrl, field) {
      console.log('-------- crop success --------', imgDataUrl, field)
    },
    // 上传成功， 参数( jsonData, field )
    cropUploadSuccess(jsonData, field) {
      this.$message.success('上传成功')
      this.imgDataUrl = jsonData.files.Avatar1
      console.log(jsonData)
      console.log('field: ' + field)
    },
    // 上传失败， 参数( status, field )
    cropUploadFail(status, field) {
      this.$message.error('上传失败')
      console.log('field: ' + field + status)
    }
  }
}
</script>
