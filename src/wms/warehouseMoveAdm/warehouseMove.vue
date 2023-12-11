<template>
  <div class="app-container">
    <div>
      <iframe id="cocosIframe" :src="cocosUrl" frameborder="0" width="1920px" height="1080px" />
    </div>
  </div>
</template>
<script>
import { API } from '@/api/generalAPI'
// import colDesign from '@/mixins/colDesign'
// import filterContainer from '@/mixins/filterContainer'
// import basics from '@/mixins'
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
      cocosUrl: window.globalConfig.basic.url
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
    // 监听cocos发送过来的消息
    getCocosMessage() {
      let _that = this
      // web端接受COCOS 数据
      window.addEventListener(
        'message',
        function (event) {
          if (event.data.type === 'cocosReady') {
            _that.setSwitchBtns() // cocos准备好后获取字典设置按钮
          } else if (event.data.type === 'boxID') {
            _that.getBoxDetail(event.data.data) // cocos点击了货物,获取货物的详细信息
          } else if (event.data.type === 'cocosChangeBg') {
            _that.getMoveData(event.data.data) // 切换传送带,重新调用接口
          }
        },
        false
      )
    },
    // 发送消息给cocos
    sendDataToCocos(data) {
      const _iframe = document.getElementById('cocosIframe').contentWindow
      _iframe.postMessage(data, '*')
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

    // 设置地图切换的按钮文案
    setSwitchBtns() {
      API.getDict('dict', { name: 'ConverlineArea' }).then(res => {
        let obj = {
          type: 'switchBtns',
          data: res.details
        }
        this.sendDataToCocos(obj)
      })
    }
  }
}
</script>
