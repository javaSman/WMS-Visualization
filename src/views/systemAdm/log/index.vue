<template>
  <div class="app-container">
    <div class="head-container">
      <filter-container
        :form-items="queryItems"
        :list-query.sync="listQuery"
        :has-download="true"
        :download-loading.sync="downloadLoading"
        @query="getList"
        @reset="reset"
        @toExport="handleExport()"
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
      :has-selection="false"
      :has-expand-info="true"
      :expand-list="expandList"
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
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import { formList, queryItems, expandList } from './config'
export default {
  name: 'Log',
  components: { Table },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'Log',
      apiName: 'auditLogging',
      dialogTitle: this.$t('dialogHeader.log'), // '系统日志',

      formList,
      queryItems,
      expandList,

      exportParams: {},
      downloadLoading: false
    }
  },
  created() {
    this.getDict()
  },
  methods: {
    getDict() {
      API.getDict('dict', { name: 'HttpMethod' }).then(res => {
        this.queryItems[1].options = res.details // 获取http
      })
    }
  }
}
</script>
