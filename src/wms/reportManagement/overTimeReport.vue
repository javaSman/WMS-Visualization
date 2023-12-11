<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="overTimeReportItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
      <CrudOperation
        :selection="multipleSelection"
        :permission-crud="overTimeReportCrud"
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
      :row-style="rowStyle"
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
import { overTimeReportItems, overTimeReportCrud } from './config'
export default {
  name: 'OverTimeReport',
  components: { Table, CrudOperation },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'OverTimeReportDto',
      apiName: 'OverTimeReport',
      overTimeReportItems,
      overTimeReportCrud,
      downloadLoading: false,
      exportParams: {},
      batchData: {},
      isEdit: true
    }
  },
  created() {
    this.getWarehouse()
    this.overTimeReportItems.forEach(item => {
      switch (item.prop) {
        case 'warehouseID': {
          item.change = () => {
            var storage = window.localStorage
            var timeoutCache = this.listQuery.warehouseID
            storage.setItem('timeoutCache', timeoutCache)
          }
        }
      }
    })
    this.firstLand()
  },
  methods: {
    keepRemark() {
      this.$set(this.listQuery, 'warehouseID', '460_GWJR')
    },
    getWarehouse() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        let arr = []
        res.items.forEach(item => {
          item.label = item.warehouseName
          item.value = item.warehouseID
        })
        this.overTimeReportItems[0].options = res.items
      })
    },
    getLocalstorage() {
      let timeoutCache = window.localStorage.getItem('timeoutCache')
      this.$set(this.listQuery, 'warehouseID', timeoutCache)
    },
    firstLand() {
      var timeoutCache = window.localStorage.getItem('timeoutCache')
      if (timeoutCache === null) {
        this.keepRemark()
      } else {
        this.getLocalstorage()
      }
    },
    rowStyle(row, rowIndex) {
      let styleJson = { }
      if (row.row.warningColor !== '') {
        styleJson = { background: row.row.warningColor }
      }
      return styleJson
    }
  }
}
</script>
