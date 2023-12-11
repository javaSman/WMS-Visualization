<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse
        :form-items="boxInStockReportItems"
        :list-query.sync="listQuery"
        @query="getList"
        @reset="reset"
      />
      <CrudOperation
        :selection="multipleSelection"
        :button-items="boxInStockReportBtnItems"
        :permission-crud="boxInStockReportCrud"
        :download-loading.sync="downloadLoading"
        @toBoxInStockReport="handleBatchShelf()"
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
      :row-style="rowStyle"
      :limit.sync="listQuery.MaxResultCount"
      :is-sort="true"
      :sorting.sync="listQuery.Sorting"
      :dict-gather="dictGather"
      @pagination="getList"
      @tableSort="getList"
    />
    <EditForm
      :form-title="dialogTitle"
      :dialog-form-visible="dialogVisible"
      :form-list="formList"
      :form-data="formData"
      :is-edit="isEdit"
      :submit="submitBatch"
      @cancel="dialogCancel"
    />
  </div>
</template>
<script>
import Table from '@/components/Table'
import { API } from '@/api/generalAPI'
import colDesign from '@/mixins/colDesign'
import CrudOperation from '@/components/Crud/CRUD.operation'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import EditForm from '@/components/EditDialog'
import { boxInStockReportItems, boxInStockReportBtnItems, formList } from './config'
export default {
  name: 'OverTimeReport',
  components: { Table, CrudOperation, EditForm },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'BoxInStockReport',
      apiName: 'boxInStockReport',
      dialogTitle: '',
      boxInStockReportItems,
      boxInStockReportBtnItems,
      downloadLoading: false,
      isEdit: true,
      EditForm,
      dialogVisible: false,
      formList,
      allWharf: [],
      formData: {}
    }
  },
  created() {
    this.getDict()
    this.getWarehouse()
  },
  methods: {
    getDict() {
      API.getDict('dict', { name: 'State' }).then(res => {
        this.boxInStockReportItems[4].options = res.details
      })
      API.getDict('dict', { name: 'BoxState' }).then(res => {
        this.boxInStockReportItems[5].options = res.details
      })
      API.getDict('dict', { name: 'StationInfo' }).then(res => {
        this.boxInStockReportItems[6].options = this.boxInStockReportItems[7].options = this.boxInStockReportItems[8].options = res.details
      })
      API.get('wharf', { IsPage: false, WharfType: 'Wharf-Out' }, 'all').then(res => {
        this.allWharf = res.items
      })
    },
    getWarehouse() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        let arr = []
        res.items.forEach(item => {
          item.label = item.warehouseName
          item.value = item.warehouseID
        })
        this.boxInStockReportItems[0].options = res.items
      })
    },
    dialogCancel() {
      this.dialogVisible = false
    },
    handleBatchShelf() {
      let row = this.multipleSelection

      this.dialogTitle = '批量下架'
      let boxarrList = []
      let warehouseList = []
      row.forEach(item => {
        boxarrList.push(item.boxState)
        warehouseList.push(item.warehouseID)
      })
      var newBoxList = Array.from(new Set(boxarrList))
      var newwarehouseList = Array.from(new Set(warehouseList))
      let warehousId = newwarehouseList[0]
      let showWharf = []
      this.allWharf.forEach(item => {
        console.log(item.warehouseID)
        if (item.warehouseID === warehousId) {
          item.label = item.wharfName
          item.value = item.wharfID
          showWharf.push(item)
        }
      })
      this.formList[0].options = showWharf

      this.dialogVisible = true
    },
    async submitBatch() {
      // 批量下架托盘
      let params = {
        boxIDs: [],
        wharfID: ''
      }
      let boxIDs = []
      this.multipleSelection.forEach(item => {
        boxIDs.push(item.boxID)
      })
      // 箱号数组去重
      params.boxIDs = Array.from(boxIDs)
      params.wharfID = this.formData.wharfID
      await API.dataPost('boxInStockReport', params, 'BatchOutShelves')
        .then(res => {
          if (res.success) {
            this.outShelvesDialogVisible = false
            this.$notify({
              title: this.$t('notify.success'), // '成功'
              message: this.$t('notify.operateSuccess'), // '操作成功',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: this.$t('notify.failure'), // '失败'
              // 接口返回数据，待中英配置
              message: this.$t('notify.operateFailure') + ',' + res.message, // '操作失败',
              type: 'error',
              duration: 2000
            })
          }
        })
        .catch(() => {
          this.outShelvesDialogVisible = false
        })
      return true
    },
    rowStyle(row, rowIndex) {
      let styleJson = { }
      if (row.row.stationCodeNext !== row.row.stationCodeNow) {
        styleJson = { background: 'lime' }
      }
      return styleJson
    }
  }
}
</script>
