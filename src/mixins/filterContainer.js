import FilterContainer from '@/components/FilterContainer'
import FilterCollapse from '@/components/FilterCollapse'
export default {
  components: { FilterContainer, FilterCollapse },

  methods: {
    /** 重置
     * 清空所有查询条件-传参:0-新增、导入、重置操作；
     * 保留原有查询条件-不传参-修改、批量修改等不影响数据条数的操作；删除操作；
     */
    reset(val) {
      if (val === 0) {
        // 清空所有查询条件，修改为默认值
        this.page = 1
        if (this.$refs.table) {
          this.$refs.table.$refs.table.clearSort()
        }
        this.listQuery = {
          Sorting: null,
          SkipCount: 0,
          MaxResultCount: this.listQuery.MaxResultCount
        }
      } else if (val === 1) {
        // 查询条件不修改、仅页码修改为第一页,查询为第一页
        this.page = 1
        this.listQuery.SkipCount = 0
      }
      // 不传参，保留原有查询条件、页码
      this.getList()
    },
    /** 刷新，查询状态不变，页码不变 */
    refresh() {
      this.getList()
    }
  }
}
