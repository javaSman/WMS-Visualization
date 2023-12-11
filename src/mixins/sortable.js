import Sortable from 'sortablejs'
/**
 * @param tbody 拖动区域
 */
export default {
  data() {
    return {
      sortable: {}
    }
  },
  methods: {
    /** 源表格行拖动，两表格之间拖动
     * tbody 参数为获取要拖动的列表元素 （要能获取到元素）
     * sourceTable 是拖动源表格数据字段名（colTable）,如, :data-list="colTable"
     * targetTable 拖动到目标表格数据字段名  */
    rowDrop(tbody, sourceTable, targetTable) {
      const that = this
      this.sortable = Sortable.create(tbody, {
        group: 'shared',
        animation: 150,
        ghostClass: 'sortable-row',
        onEnd: function (evt) {
          let sourceData = that[`${sourceTable}`]
          let targetData = that[`${targetTable}`]
          if (evt.from !== evt.to) {
            let item = Object.assign({}, sourceData.splice(evt.oldIndex, 1)[0])
            item.show = false
            targetData.splice(evt.newIndex, 0, item)
          } else {
            sourceData.splice(evt.newIndex, 0, sourceData.splice(evt.oldIndex, 1)[0])
            var newArray = sourceData.slice(0)
            // sourceData = []
            that.$nextTick(function () {
              sourceData = newArray
            })
          }
        }
      })
    },
    /** 两表格之间拖动
     * sourceTable 是拖动源表格数据字段名
     * targetTable 拖动到目标表格数据字段名
     */
    groudDrop(tbody, sourceTable, targetTable) {
      const that = this
      Sortable.create(tbody, {
        group: 'shared',
        animation: 150,
        sort: false,
        onEnd: function (evt) {
          let sourceData = that[`${sourceTable}`]
          let targetData = that[`${targetTable}`]
          if (evt.from !== evt.to) {
            let item = Object.assign({}, sourceData.splice(evt.oldIndex, 1)[0])
            item.show = true
            targetData.splice(evt.newIndex, 0, item)
          }
          //   sourceData.splice(evt.newIndex, 0, sourceData.splice(evt.oldIndex, 1)[0])
          //   var newArray = sourceData.slice(0)
          //   // sourceData = []
          //   that.$nextTick(function() {
          //     sourceData = newArray
          //   })
        }
      })
    }
  }
}
