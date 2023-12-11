import splitPane from 'vue-splitpane'
export default {
  components: { splitPane },
  data() {
    return {
      topTableH: 0, // 上表格高度
      splitArea: 0, // 分割区域的总高度
      extraH: 0 // 额外高度消耗
    }
  },
  // 64为分页部分高度
  computed: {
    bottomTableH() {
      let topH = this.topH || 80 // 顶部查询条及按钮高度
      let bottomH = this.bottomH || 0 // 下表格按钮高度
      if (this.splitArea === 0) {
        return 150
      }
      let _div = this.$refs.splitArea.clientHeight
      let _h = _div - this.topTableH - topH - bottomH - 64 - this.extraH
      return _h
    }
  },
  mounted() {
    this.splitArea = this.$refs.splitArea.clientHeight // 这里是分割区域的总高度 因为table的设置高度单位是PX 高度获取要在mounted获取
    this.topTableH = this.splitArea * 0.7 - 64 - this.extraH
    let _this = this
    window.onresize = function () {
      _this.resize()
    }
  },
  destroyed() {
    window.onresize = null
  },
  methods: {
    /** 拖动splitBar */
    resize() {
      let _this = this.$refs.table
      let _topH = _this.$parent.$el.clientHeight // splitter-paneL 上面表格的外部容器高度，包含了表格和分页
      this.topTableH = _topH - 64 - this.extraH // 减去分页高度为表格实际高度
    }
  }
}
