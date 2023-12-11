import ColDesign from '@/components/ColDesign'
import { API } from '@/api/generalAPI'

let apiColName = 'usertabletemplatedetail'
export default {
  components: { ColDesign },
  data() {
    return {
      column: [],
      columnDetail: [],
      tableShow: false,
      detailTableShow: false
    }
  },
  created() {
    this.getCol()
  },
  methods: {
    /** 获取主表、明细表 表头数据 */
    getCol() {
      if (this.colName) {
        API.getForm(apiColName, this.colName).then(res => {
          this.column = res
          this.tableShow = true
        })
      }
      if (this.detailColName) {
        API.getForm(apiColName, this.detailColName).then(res => {
          this.columnDetail = res
          this.detailTableShow = true
        })
      }
    },

    /** 重置主表列自定义数据设置 */
    resetCol(val) {
      this.column = val
      this.$nextTick(function () {
        this.tableShow = true
      })
      this.$refs.table.$refs.table.clearSelection()
    },

    /** 重置明细表列自定义数据设置 */
    resetColDetail(val) {
      this.columnDetail = val
      this.$nextTick(function () {
        this.detailTableShow = true
      })
    }
  }
}
