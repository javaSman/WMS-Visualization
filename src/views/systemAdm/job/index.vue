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
      <CrudOperation
        :permission-crud="JobCrud"
        :selection="multipleSelection"
        @toAdd="handleCreate"
        @toEdit="handleUpdate()"
        @toDelete="handleDelete()"
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
      @create="handleCreate"
      @cancel="cancel"
      @reset="reset"
    />
  </div>
</template>
<script>
import Table from '@/components/Table'
import EditForm from '@/components/EditDialog'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import CrudOperation from '@/components/Crud/CRUD.operation'
import basics from '@/mixins'
import { formList, queryItems, JobCrud } from './config'
export default {
  name: 'Job',
  components: { Table, CrudOperation, EditForm },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'Job',
      apiName: 'job',
      dialogTitle: this.$t('dialogHeader.job'), // '岗位',

      formList,
      queryItems,
      JobCrud,

      form: {},
      dialogFormVisible: false,

      exportParams: {},
      downloadLoading: false,
      formTitle: '',
      isEdit: false,
      layout: { gutter: undefined, span: 12, xs: 24, sm: 12, md: 8, xl: 6 }
    }
  },
  methods: {
    handleCreate() {
      this.form = { sort: 999, enabled: true }
      this.dialogOpen()
    }
  }
}
</script>
