<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="queryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
      <CrudOperation
        :permission-crud="lineCacheCrud"
        :selection="multipleSelection"
        @toAdd="handleCreate"
        @toEdit="handleUpdate()"
        @toDelete="handleDelete()"
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
      :cbg-filter="optFilter"
      @create="handleCreate"
      @cancel="cancel"
      @reset="reset"
    />
  </div>
</template>
<script>
import Table from '@/components/Table'
import { API } from '@/api/generalAPI'
import EditForm from '@/components/EditDialog'
import CrudOperation from '@/components/Crud/CRUD.operation'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import combogrid from '@/mixins/combogrid'
import { formList, queryItems, lineCacheCrud } from './config'
export default {
  name: 'ConveyerLine',
  components: { Table, EditForm, CrudOperation },
  mixins: [colDesign, filterContainer, basics, combogrid],
  data() {
    return {
      colName: 'lineCache',
      apiName: 'lineCache',
      dialogTitle: '缓存位',
      formList,
      queryItems,
      lineCacheCrud,

      form: {},
      dialogFormVisible: false,

      exportParams: {},

      formTitle: '',
      isEdit: false
    }
  },
  created() {
    this.getDict()
  },
  methods: {
    getDict() {
      API.getDict('dict', { name: 'LineCache_CalModel' }).then(res => {
        this.formList[2].options = res.details
      })
    },
    handleCreate() {
      this.dialogOpen()
      this.form = {}
    },
    handleUpdate() {
      this.getForm(this.multipleSelection[0].id)
    },
    getForm(id) {
      this.formTitle = this.$t('dialog.edit') + this.dialogTitle // '编辑'
      this.isEdit = true
      API.getForm(this.apiName, id).then(res => {
        this.form = res
        this.dialogFormVisible = true
      })
    }
  }
}
</script>
