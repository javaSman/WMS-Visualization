<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="inShelvesQueryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
    </div>
    <!-- <div ref="splitArea" class="splitArea">
      <split-pane split="horizontal" :min-percent="25.5" :default-percent="70" @resize="resize">
        <template slot="paneL"> -->
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
      :has-selection="false"
      :dict-gather="dictGather"
      @getDetail="getDetail"
      @pagination="getList"
      @tableSort="getList"
    />
    <!-- </template> -->
    <!-- <template slot="paneR"> -->
    <!-- '上架单明细' -->
    <!-- <h4>{{ $t('dialogHeader.inShelvesOrderDetails') }}</h4> -->
    <!-- <ColDesign
            tid="DetailTable"
            :col-list="columnDetail"
            :table-show.sync="detailTableShow"
            @resetColDetail="resetColDetail"
          />
          <Table
            v-if="detailTableShow"
            v-loading="detailListLoading"
            :height="bottomTableH"
            :data-list="multipleSelection.length === 1 ? detailTable : []"
            :column="columnDetail"
            :has-selection="false"
            :page-hidden="true"
            :dict-gather="dictGather"
          />
        </template>
      </split-pane> -->
    <!-- </div> -->
  </div>
</template>
<script>
import Table from '@/components/Table'
import { API } from '@/api/generalAPI'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
// import splitPane from '@/mixins/splitPane'
import basics from '@/mixins'
import { inShelvesQueryItems } from './config'
export default {
  name: 'InShelves',
  components: { Table },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'InShelves',
      // detailColName: 'InShelvesDetails',
      apiName: 'inshelves',

      inShelvesQueryItems,

      detailListLoading: false,
      // detailTable: [], // 主页明细表，也存放原始明细数据

      topH: 40
    }
  },
  created() {
    this.getDict()
  },
  methods: {
    getDict() {
      API.getDict('dict', { name: 'BoxState' }).then(res => {
        this.inShelvesQueryItems[7].options = res.details
      })
      API.getDict('dict', { name: 'Warehouse' }).then(res => {
        this.inShelvesQueryItems[1].options = res.details
      })
    },
    getDetail(row) {
      this.detailListLoading = true
      API.getData('inshelves', { InShelvesID: row.inShelvesID }).then(res => {
        this.detailTable = res
        this.detailListLoading = false
      })
    }
  }
}
</script>
