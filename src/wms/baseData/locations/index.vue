<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="queryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
      <CrudOperation
        :permission-crud="LocationsCrud"
        :selection="multipleSelection"
        :download-loading.sync="downloadLoading"
        :button-items="btnItems"
        @toAdd="handleCreate"
        @toEdit="handleUpdate()"
        @toDelete="handleDelete()"
        @toImport="handleImport()"
        @toExport="handleDownload()"
        @toAddBoxInSend="handleAddBoxInSend()"
        @toStopIn="handleStopIn()"
        @toAllowIn="handleAllowIn()"
        @toStopInAndOut="handleStopInAndOut()"
        @toAllowInAndOut="handleAllowInAndOut()"
        @toForceOutStockt="handleForceOutStock()"
      />
    </div>
    <ColDesign :col-list="column" :table-show.sync="tableShow" @resetCol="resetCol" />
    <Table
      v-if="tableShow"
      ref="table"
      v-loading="listLoading"
      :height="-1"
      :data-list="list"
      :column="column"
      :selection.sync="multipleSelection"
      :total="totalCount"
      :page.sync="page"
      :limit.sync="listQuery.MaxResultCount"
      :is-sort="true"
      :sorting.sync="listQuery.Sorting"
      :dict-gather="dictGather"
      @pagination="getList"
      @tableSort="getList"
    />
    <EditForm
      :dialog-form-visible="dialogFormVisible"
      :form-title="formTitle"
      :form-list="formList"
      :form-data="form"
      :is-edit="isEdit"
      :api-name="apiName"
      :dialog-width="950"
      :layout="layout"
      :cbg-remote="cbgRemote"
      :cbg-filter="optFilter"
      @create="handleCreate"
      @cancel="cancel"
      @reset="reset"
    />
    <EditBatchDialog
      :dialog-visible.sync="batchDialogVisible"
      :form-title="formTitle"
      :form-data="form"
      :batch-form-list="batchFormList"
      :data-list="tableList"
      :detail-table.sync="list"
      :api-name="apiName"
      :batch-table-list="column"
      :dict-gather="dictGather"
      @reset="reset"
      @cancel="dialogCancel"
    />
    <UploadDialog
      :dialog-visible.sync="uploadDialogVisible"
      :api-name="apiName"
      :has-template="true"
      :template-path="templatePath"
      @reset="reset"
      @cancel="dialogCancel"
    />
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import Table from '@/components/Table'
import { API } from '@/api/generalAPI'
import UploadDialog from '@/components/Upload/UploadDialog'
import EditBatchDialog from '@/components/EditBatchDialog'
import EditForm from '@/components/EditDialog'
import CrudOperation from '@/components/Crud/CRUD.operation'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import combogrid from '@/mixins/combogrid'
import { formList, batchFormList, queryItems, LocationsCrud, btnItems } from './config'
export default {
  name: 'Locations',
  components: { Table, EditForm, CrudOperation, EditBatchDialog, UploadDialog },
  mixins: [colDesign, filterContainer, basics, combogrid],
  data() {
    return {
      colName: 'Locations',
      apiName: 'locations',
      dialogTitle: this.$t('dialogHeader.locations'), // '货位',
      templatePath: '/Temp/Locations.xlsx',
      setLocaState: '0',

      formList,
      queryItems,
      batchFormList,
      LocationsCrud,
      btnItems,
      tableList: [],
      form: {},
      dialogFormVisible: false,
      uploadDialogVisible: false,
      batchDialogVisible: false,
      formTitle: '',
      isEdit: false,
      layout: { gutter: undefined, span: 12, xs: 24, sm: 12, md: 8, xl: 6 },
      downloadLoading: false,
      exportParams: {},
      boxcbgAttr: formList[3], // 远程
      cbgAttr: formList[2] // 下拉网配置字段
    }
  },
  created() {
    this.formChange()
    this.getDict()
    this.getWarehouse()
    this.formList.forEach(item => {
      switch (item.prop) {
        case 'boxID': {
          item.change = row => {
            if (!row) {
              this.cbgRemote('boxID')
            }
          }
          break
        }
        case 'warehouseID': {
          item.change = row => {
            this.inputWHName(row)
          }
          break
        }
      }
    })
  },
  methods: {
    /** 下拉框失焦获值*/
    formChange() {
      this.formList.forEach(item => {
        switch (item.prop) {
          case 'locationID': {
            item.blur = row => {
              if (row !== undefined) {
                var arrSelect = row.split('-')
                this.$set(this.form, 'alley', arrSelect[0])
                this.$set(this.form, 'row', arrSelect[1])
                this.$set(this.form, 'col', arrSelect[2])
                this.$set(this.form, 'floor', arrSelect[3])
              }
            }
            item.change = () => {
              this.$set(this.form, 'floor', '')
              this.$set(this.form, 'alley', '')
              this.$set(this.form, 'row', '')
              this.$set(this.form, 'col', '')
            }
            break
          }
        }
      })
    },
    getDict() {
      API.getDict('dict', { name: 'state' }).then(res => {
        this.formList[1].options = this.queryItems[2].options = res.details
      })
      API.getDict('dict', { name: 'productType' }).then(res => {
        this.formList[10].options = this.queryItems[8].options = res.details
      })
      API.getDict('dict', { name: 'LocalUse' }).then(res => {
        this.formList[11].options = this.queryItems[9].options = res.details
      })
    },
    handleCreate() {
      this.form = {}
      this.formList[9].isHide = true
      this.getOpts()
      this.dialogOpen()
      this.getNewWarehouse()
      this.getNewBox()
    },
    handleUpdate() {
      this.formList[9].isHide = false
      this.getOpts()
      this.getForm(this.multipleSelection[0].id)
      this.getNewWarehouse()
      this.getNewBox()
    },
    getOpts() {
      this.getCbgRemoteOpts(this.boxcbgAttr, 'box')
      this.getCbgOpts('warehouse', { IsPage: false })
    },
    handleAddBoxInSend() {
      var rows = this.multipleSelection
      if (rows.lenght === 0 || rows.lenght > 1) {
        this.$message({
          message: '请选择一项！',
          type: 'warning'
        })
        return
      }

      var success = true
      var list = []
      for (const i in rows) {
        var row = rows[i]
        if (row.boxID.lenght < 10) {
          this.$message({
            message: '请选择包含箱号的记录',
            type: 'warning'
          })
          success = false
          break
        } else {
          list.push(row.boxID)
        }
      }

      if (success) {
        this.$confirm('确定执行通知通知入库？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            API.dataPost('WebApi', list, 'SendToBoxIn').then(res => {
              if (res.success) {
                this.$message({
                  message: '进站通知成功。',
                  type: 'success'
                })
                this.getList()
              } else {
                this.$message({
                  message: res.message,
                  type: 'warning'
                })
              }
            })
          })
      }
    },
    handleForceOutStock() {
      var rows = this.multipleSelection
      if (rows.lenght === 0 || rows.lenght > 1) {
        this.$message({
          message: '请选择一项！',
          type: 'warning'
        })
        return
      }

      var success = true
      var list = []
      for (const i in rows) {
        var row = rows[i]
        if (row.boxID.lenght < 10) {
          this.$message({
            message: '请选择包含箱号的记录',
            type: 'warning'
          })
          success = false
          break
        } else {
          list.push(row.boxID)
        }
      }

      if (success) {
        this.$confirm('确定执行强制出库？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            API.dataPost('WebApi', list, 'SendToBoxOut').then(res => {
              if (res.success) {
                this.$message({
                  message: res.message,
                  type: 'success'
                })
                this.getList()
              } else {
                this.$message({
                  message: res.message,
                  type: 'warning'
                })
              }
            })
          })
      }
    },
    handleStopIn() {
      this.setLocaState = '01'
      this.submitT()
    },
    handleAllowIn() {
      this.setLocaState = '11'
      this.submitT()
    },
    handleStopInAndOut() {
      this.setLocaState = '02'
      this.submitT()
    },
    handleAllowInAndOut() {
      this.setLocaState = '12'
      this.submitT()
    },
    submitT() {
      var rows = this.multipleSelection
      if (rows.lenght === 0) {
        this.$message({
          message: '请至少选择一项！',
          type: 'warning'
        })
        return
      }

      var list = []
      for (const i in rows) {
        var row = rows[i]
        var param = {
          WarehouseID: '',
          LocationID: '',
          StateType: ''
        }
        param.WarehouseID = row.warehouseID
        param.LocationID = row.locationID
        param.StateType = this.setLocaState
        param.CustomerEditorID = Cookies.get('CustomerUser')
        list.push(param)
      }

      this.$confirm('确定执行？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          API.dataPost(this.apiName, list, 'UpdateLocaState').then(res => {
            if (res.success) {
              this.$message({
                message: res.message,
                type: 'success'
              })
              this.getList()
            } else {
              this.$message({
                message: res.message,
                type: 'warning'
              })
            }
          })
        })
    },
    // 给区域和仓库赋值
    // inputWarehouse(val) {
    //   this.formList[2].options.forEach(item => {
    //     if (item.name === val) {
    //       this.form.whId = item.whid
    //     }
    //   })
    // },
    handleImport() {
      this.uploadDialogVisible = true // 导入
    },
    dialogCancel(val) {
      this.uploadDialogVisible = false
      this.batchDialogVisible = false
    },
    inputWHName(val) {
      this.formList[2].options.forEach(item => {
        if (item.value === val) {
          this.form.whName = item.warehouseName
        } else if (val === '') {
          this.form.whName = ''
          this.getNewWarehouse()
        }
      })
    },
    cbgRemote(node, str) {
      if (node === this.boxcbgAttr.prop) {
        this.getCbgRemoteSearch(this.boxcbgAttr, 'box', { BoxID: str })
      }
    },
    getWarehouse() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        // let arr = []
        res.items.forEach(item => {
          // arr.push(item.warehouseID)
          item.label = item.warehouseName
          item.value = item.warehouseID
        })
        this.queryItems[0].options = res.items
      })
    },
    // 下拉框获取新的仓库编码options
    getNewWarehouse() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        // let arr = []
        res.items.forEach(item => {
          // arr.push(item.warehouseID)
          item.label = item.warehouseName
          item.value = item.warehouseID
        })
        this.formList[2].options = res.items
      })
    },
    getNewBox() {
      API.get('box', { IsPage: false }, 'all').then(res => {
        res.items.forEach(item => {
          // arr.push(item.warehouseID)
          item.label = item.boxID
          item.value = item.boxID
        })
        this.formList[3].options = res.items
      })
    }
  }
}
</script>
