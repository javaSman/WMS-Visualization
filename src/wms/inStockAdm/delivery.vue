<template>
  <div class="components-container">
    <div class="head-container">
      <filter-collapse :form-items="deliveryQueryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
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
            :dict-gather="dictGather"
            @getDetail="getDetail"
            @pagination="getList"
            @tableSort="getList"
          />
        </template>
        <template slot="paneR">
          <!-- '收货单明细' -->
          <h4>{{ $t('dialogHeader.deliveryOrderDetails') }}</h4>
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
import { API } from '@/api/generalAPI'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import splitPane from '@/mixins/splitPane'
import basics from '@/mixins'
import { deliveryQueryItems } from './config'
export default {
  name: 'Delivery',
  components: { Table },
  mixins: [colDesign, filterContainer, basics, splitPane],
  data() {
    return {
      colName: 'ReceivingHeader',
      detailColName: 'ReceivingDetails',
      apiName: 'Receivingheader',

      deliveryQueryItems,

      detailTable: [],
      detailListLoading: false,

      topH: 40
    }
  },
  created() {
    this.getDict()
  },
  methods: {
    getDict() {
      API.getDict('dict', { name: 'DeliveryType' }).then(res => {
        this.deliveryQueryItems[2].options = res.details
      })
    }
  }
}
</script>
