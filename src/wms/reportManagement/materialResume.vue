<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="resumeQueryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
      <CrudOperation
        :permission-crud="materialResumeCrud"
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
      :total="totalCount"
      :page.sync="page"
      :limit.sync="listQuery.MaxResultCount"
      :is-sort="true"
      :sorting.sync="listQuery.Sorting"
      :has-selection="false"
      :dict-gather="dictGather"
      @pagination="getList"
      @tableSort="getList"
    />
  </div>
</template>
<script>
import Table from '@/components/Table'
// import { API } from '@/api/generalAPI'
import colDesign from '@/mixins/colDesign'
import CrudOperation from '@/components/Crud/CRUD.operation'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import { resumeQueryItems, materialResumeCrud } from './config'
export default {
  name: 'MaterialResume',
  components: { Table, CrudOperation },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'MaterialResume',
      apiName: 'materialresume',
      dialogTitle: this.$t('dialogHeader.materialResume'), // '物料履历',

      resumeQueryItems,
      materialResumeCrud,

      downloadLoading: false,
      exportParams: {}
    }
  },
  created() {
    // this.getDict()
  },
  methods: {
    // getDict() {
    //   API.getDict('dict', { name: 'BoxStatus' }).then(res => {
    //     this.resumeQueryItems[0].options = res.details
    //   })
    //   API.getDict('dict', { name: 'PositionStatus' }).then(res => {
    //     this.resumeQueryItems[1].options = res.details
    //   })
    //   API.getDict('dict', { name: 'MaterialPosition' }).then(res => {
    //     this.resumeQueryItems[2].options = res.details
    //   })
    //   API.getDict('dict', { name: 'MobileType' }).then(res => {
    //     this.resumeQueryItems[3].options = res.details
    //   })
    // }
  }
}
</script>
