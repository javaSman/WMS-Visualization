<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse
        :form-items="inventoryReportItems"
        :list-query.sync="listQuery"
        @query="getList"
        @reset="reset"
      />
      <CrudOperation
        :selection="multipleSelection"
        :permission-crud="inventoryReportCrud"
        :button-items="inventoryReportBtnItems"
        :download-loading.sync="downloadLoading"
        @toExport="handleDownload()"
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
  </div>
</template>
<script>
import Table from '@/components/Table'
import { API } from '@/api/generalAPI'
import colDesign from '@/mixins/colDesign'
import CrudOperation from '@/components/Crud/CRUD.operation'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import { inventoryReportItems, inventoryReportCrud, inventoryReportBtnItems } from './config'
export default {
  name: 'MaterialResume',
  components: { Table, CrudOperation },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'InventoryReportDto',
      apiName: 'inventoryreport',
      dialogTitle: '批量下架', // '物料报表,
      inventoryReportItems,
      inventoryReportCrud,
      inventoryReportBtnItems,
      downloadLoading: false,
      exportParams: {},
      isEdit: true
    }
  },
  created() {
    this.getWarehouse()
  },
  methods: {
    getWarehouse() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        // let arr = []
        res.items.forEach(item => {
          // arr.push(item.warehouseID)
          item.label = item.warehouseName
          item.value = item.warehouseID
        })
        this.inventoryReportItems[0].options = res.items
      })
    }
  }
}
</script>
