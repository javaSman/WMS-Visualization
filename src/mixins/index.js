// 一般业务 复用方法
import { API } from '@/api/generalAPI'
import functions from '@/utils/functions'
export default {
  data() {
    return {
      list: null, // 表格数据
      listLoading: false, // 表格数据加载状态
      listQuery: {
        // 查询参数
        Sorting: null,
        SkipCount: 0,
        MaxResultCount: 20
      },
      api: null,
      page: 1, // 页码
      totalCount: 0, // 表格数据总数
      multipleSelection: [], // 表格选中行数据
      dictGather: [] // 字典集合
    }
  },
  created() {
    this.getList()
    this.getDictGather()
  },
  methods: {
    /** 获取字典集合 */
    getDictGather() {
      API.getData('dict', { IsPage: false }).then(res => {
        this.dictGather = res.items
      })
    },
    /** 查询 */
    getList(val) {
      this.listLoading = true
      if (val) {
        this.page = val.page
        if (val.limit) {
          this.listQuery.SkipCount = (this.page - 1) * val.limit
        } else {
          this.listQuery.SkipCount = (this.page - 1) * 10
        }
      }
      API.getData(this.apiName, this.listQuery).then(res => {
        // 当页数据量为0，搜索结果总数不为零时-删除最后一页全部数据时，刷新后页数往前跳一页
        if (res.items.length === 0 && res.totalCount !== 0) {
          console.log('表格刷新原页数为：', this.page, '现页数为：', this.page - 1)
          this.listQuery.SkipCount = (this.page - 2) * this.listQuery.MaxResultCount
          this.getList()
        } else {
          this.list = res.items // 刷新、获取数据
          this.totalCount = res.totalCount
          this.listLoading = false
        }
      })
      if (this.exportParams !== undefined) {
        this.exportParams = Object.assign({}, this.listQuery)
        this.exportParams.isPage = false // 用于有导出功能时更新现有数据
      }
    },

    /** 获取明细 */
    getDetail(row) {
      this.detailListLoading = true
      this.formTitle = this.$t('dialog.edit') + this.dialogTitle // '编辑'
      this.isEdit = true
      API.getForm(this.apiName, row.id).then(res => {
        this.detailTable = res.details
        this.editDetailTable = res.details
        this.form = res.header
        this.detailListLoading = false
      })
    },

    /** 新增，默认form为空 */
    handleCreate() {
      this.form = {}
      this.dialogOpen()
    },
    dialogOpen() {
      this.formTitle = this.$t('dialog.add') + this.dialogTitle // '新增'
      this.isEdit = false
      this.dialogFormVisible = true
      this.editDetailTable = []
    },

    /** 编辑，默认以id字段提交 */
    handleUpdate() {
      this.getForm(this.multipleSelection[0].id)
    },
    getForm(id) {
      this.formTitle = this.$t('dialog.edit') + this.dialogTitle // '编辑'
      this.isEdit = true
      API.getForm(this.apiName, id).then(res => {
        this.form = res
        this.dialogFormVisible = true
      })
    },

    /** 删除，默认以id字段提交 */
    handleDelete() {
      this.delete('id', API.dataPost) // 可在页面自定义
    },
    delete(id, api, isReset) {
      var params = []
      this.multipleSelection.forEach(res => {
        params.push(res[`${id}`]) // 删除：根据选中行 multipleSelection.id ，提交后台删除，后刷新表格getList()
      })
      // '确认删除选中项','提示'
      this.$confirm(this.$t('dialog.deleteTips'), this.$t('dialog.tip'), {
        confirmButtonText: this.$t('button.confirm'), // '确认'
        cancelButtonText: this.$t('button.cancel'), // '取消'
        type: 'warning'
      })
        .then(() => {
          api(this.apiName, params, 'Delete').then(res => {
            this.$notify({
              title: this.$t('notify.success'), // '成功'
              message: this.$t('notify.delSuccess'), // '删除成功'
              type: 'success',
              duration: 2000
            })
            // 组织机构重置查询条件，重新获取树形控件数据
            if (isReset) {
              if (this.listQuery.id === params[0]) {
                this.listQuery = {
                  Sorting: null,
                  SkipCount: 0,
                  MaxResultCount: 20
                }
              }
              this.getList()
              this.getOrgs()
            } else {
              this.getList()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('notify.delFailure') // '未删除成功'
          })
        })
    },

    /** 导出，默认名为“列表” */
    // 系统管理模块使用（暂）
    handleExport() {
      this.exportExcel(this.exportParams) // 全部数据导出
    },
    exportExcel(params, subFilename) {
      this.downloadLoading = true

      API.getData(this.apiName, params)
        .then(res => {
          const listData = res.items
          const tHeader = []
          const filterVal = []
          for (var i = 0; i < this.column.length; i++) {
            tHeader[i] = this.column[i].label
            filterVal[i] = this.column[i].prop
          }
          if (listData.length) {
            import('@/vendor/Export2Excel').then(excel => {
              let filename = subFilename || this.dialogTitle + this.$t('dialogHeader.list') // '列表'
              const data = functions.formatJson(filterVal, listData)
              excel.export_json_to_excel({
                header: tHeader,
                data,
                filename: filename
              })
            })
          } else {
            this.$message({
              message: this.$t('notify.exportEmpty'), // 当前表格为空
              type: 'warning'
            })
          }
          this.downloadLoading = false
        })
        .catch(() => {
          this.downloadLoading = false
        })
    },

    /** 导出（后端实现） */
    handleDownload() {
      this.export(this.apiName, this.exportParams)
    },
    export(name, params, otherExport) {
      this.downloadLoading = true
      let other = otherExport || 'Export'
      API.getData(name, params, other)
        .then(res => {
          if (res !== '') {
            var url = window.globalConfig.base.ip + ':' + window.globalConfig.base.backend_port + res
            window.location.href = url
            this.$notify({
              title: this.$t('notify.success'), // '成功'
              message: this.$t('notify.exportSuccess'), // '导出成功'
              type: 'success',
              duration: 2000
            })
          } else {
            this.$message({
              message: this.$t('notify.exportEmpty'), // '当前表格为空'
              type: 'warning'
            })
          }
          this.downloadLoading = false
        })
        .catch(() => {
          this.downloadLoading = false
        })
    },
    /** 关闭弹窗*/
    cancel(val) {
      this.dialogFormVisible = false
      if (val.isSave || val.hasAdd) {
        if (val.isEdit) {
          // 编辑时 查询条件保留
          this.reset()
        } else {
          // 新增时 查询条件清空位默认值
          this.reset(0)
        }
      }
    }
  }
}
