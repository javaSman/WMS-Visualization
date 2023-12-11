<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="扫描二维码下载"
      :width="dialogWidth + 'px'"
      :visible.sync="show"
      custom-class="customWidth"
      :close-on-click-modal="false"
      @opened="showQRCode"
      @close="cancel"
    >
      <div ref="qrcode" class="qrcode" />
    </el-dialog>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'QRCodeDialog',
  props: {
    dialogVisible: { type: Boolean }, // 弹窗显示
    dialogWidth: { type: Number, default: 400 }, // 弹窗宽度
    downloadPath: { type: String, default: '' } // 文件下载路径
  },
  data() {
    return {}
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
    /** 显示二维码图片 */
    showQRCode() {
      this.creatQrCode()
    },
    /** 转换二维码 */
    creatQrCode() {
      // 清除上一张二维码的缓存
      this.$refs.qrcode.innerHTML = ''
      let qrcode = new QRCode(this.$refs.qrcode, {
        width: 200,
        height: 200,
        render: 'canvas',
        correctLevel: QRCode.CorrectLevel.H
      })
      // 解析所需要的内容
      qrcode.makeCode(this.downloadPath)
      let canvas = document.querySelector('canvas')
      var strDataURI = canvas.toDataURL('image/png')
      canvas.outerHTML = '<img alt="Scan me!" src=' + strDataURI + ' style="display: block;">'
      qrcode.clear()
    },
    /** 弹窗关闭 */
    cancel() {
      this.show = false
    }
  }
}
</script>
<style scoped>
.qrcode {
  margin: 20px;
  background: #9093993d;
  width: 200px;
  height: 200px;
  margin: auto;
  margin-bottom: 30px;
}
</style>
