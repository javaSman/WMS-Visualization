<template>
  <div class="app-container">
    <div>
      <iframe id="cocosIframe" :src="cocosUrl" frameborder="0" width="1920px" height="1080px" />
    </div>
  </div>
</template>
<script>
import { API } from '@/api/generalAPI'
import permission from '@/directive/permission/index.js'
export default {
  name: 'WarehouseMove',
  components: {},
  directives: { permission },
  // mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      API,
      otherWindow: null,
      timer: null,
      cocosUrl: window.globalConfig.basic.url3
    }
  },
  created() {
    this.getCocosMessage()
  },
  beforeDestroy() {
    // 或者destroyed钩子函数中执行清除
    clearInterval(this.timer)
    this.timer = null // 清空内存
  },
  methods: {
    // 获取移动的数据
    getMoveData(data) {
      clearInterval(this.timer)
      this.timer = null // 清空内存
      this.$nextTick(() => {
        this.timer = setInterval(() => {
          API.get('KanBan/DeviceInfo', { warehouseID: data }).then(res => {
            if (res.success) {
              let obj = {
                type: 'DeviceInfo',
                data: res.data
              }
              this.sendDataToCocos(obj)
            }
          })
        }, 3000)
      })
    },
    // 获取BoxID详情返回到cocos
    getBoxDetail(boxID) {
      API.get('KanBan/BoxInfo', { Boxid: boxID }).then(res => {
        if (res.success) {
          let obj = {
            type: 'BoxInfo',
            data: res.data[0]
          }
          this.sendDataToCocos(obj)
        }
      })
    },
    // 监听cocos发送过来的消息
    getCocosMessage() {
      // web端接受COCOS 数据
      window.addEventListener(
        'message',
        event => {
          if (event.data.type === 'cocosReady') {
            this.getMoveData('Warehouse')
          }
          if (event.data.type === 'boxID') {
            this.getBoxDetail(event.data.data)
          }
        },
        false
      )
    },
    // 发送消息给cocos
    sendDataToCocos(data) {
      const _iframe = document.getElementById('cocosIframe').contentWindow
      _iframe.postMessage(data, '*')
    }
  }
}
</script>
