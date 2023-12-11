<template>
  <div class="components-container">
    <div class="head-container">
      <filter-collapse :form-items="returnQueryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
    </div>
    <div ref="splitArea" class="splitArea">
      <split-pane split="horizontal" :min-percent="25.5" :default-percent="70" @resize="resize">
        <template slot="paneL">
          <ColDesign :col-list="column" :table-show.sync="tableShow" @resetCol="resetCol" />
          <Table
            v-if="tableShow"
            ref="table"
            v-loading="listLoading"
            :height="topTableH"
            :data-list="list"
            :column="column"
            :selection.sync="multipleSelection"
            :total="totalCount"
            :page.sync="page"
            :limit.sync="listQuery.MaxResultCount"
            :is-sort="true"
            :sorting.sync="listQuery.Sorting"
            :has-selection="false"
            @getDetail="getDetail"
            @pagination="getList"
            @tableSort="getList"
          />
        </template>
        <template slot="paneR">
          <!-- '退货单明细' -->
          <h4>{{ $t('dialogHeader.returnOrderDetails') }}</h4>
          <ColDesign
            tid="DetailTable"
            :col-list="columnDetail"
            :table-show.sync="detailTableShow"
            @resetColDetail="resetColDetail"
          />
          <Table
            v-if="detailTableShow"
            ref="tableDetail"
            v-loading="detailListLoading"
            :height="bottomTableH"
            :data-list="multipleSelection.length === 1 ? detailTable : []"
            :column="columnDetail"
            :has-selection="false"
            :page-hidden="true"
            :dict-gather="dictGather"
          />
        </template>
      </split-pane>
    </div>
  </div>
</template>
<script>
import Table from '@/components/Table'
import filterContainer from '@/mixins/filterContainer'
import splitPane from '@/mixins/splitPane'
import basics from '@/mixins'
import colDesign from '@/mixins/colDesign'
import { returnQueryItems } from './config'
export default {
  name: 'Return',
  components: { Table },
  mixins: [colDesign, filterContainer, basics, splitPane],
  data() {
    return {
      colName: 'ReturnHeader',
      detailColName: 'ReturnDetails',
      apiName: 'return',

      returnQueryItems,

      detailListLoading: false,
      detailTable: []
    }
  }
}
</script>
