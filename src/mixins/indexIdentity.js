// 用户管理 复用方法
import { API, identityAPI } from '@/api/generalAPI'
import functions from '@/utils/functions'
export default {
  data() {
    return {
      list: null,
      listLoading: false,
      listQuery: {
        Sorting: null,
        SkipCount: 0,
        MaxResultCount: 20
      },
      page: 1,
      totalCount: 0,
      multipleSelection: [],
      dictGather: []
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
      identityAPI.getData(this.apiName, this.listQuery, null).then(res => {
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
      identityAPI.getForm(this.apiName, row.id).then(res => {
        this.detailTable = res.details
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
      this.detailTable = []
    },

    /** 编辑，默认以id字段提交 */
    handleUpdate() {
      this.getForm(this.multipleSelection[0].id)
    },
    getForm(id) {
      this.formTitle = this.$t('dialog.edit') + this.dialogTitle // '编辑'
      this.isEdit = true
      identityAPI.getForm(this.apiName, id).then(res => {
        this.form = res
        this.dialogFormVisible = true
      })
    },

    /** 删除，默认以id字段提交 */
    handleDelete() {
      this.delete('id', identityAPI.dataPost) // 可在页面自定义
    },
    delete(id, api) {
      var params = []
      this.multipleSelection.forEach(res => {
        params.push(res[`${id}`]) // 删除：根据选中行 multipleSelection.id ，提交后台删除，后刷新表格getList()
      })
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
            this.getList()
            // 删除成功后，刷新页面数据，保留查询条件且页码跳转到第一页
            // this.reset(1)
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

      identityAPI
        .getData(this.apiName, params, null)
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
      identityAPI
        .getData(name, params, other)
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
