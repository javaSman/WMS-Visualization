// 3、策略配置
<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="configQueryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
      <CrudOperation
        :permission-crud="StrategyConfigCrud"
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
      :form-list="configFormList"
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
import EditForm from '@/components/EditDialog'
import CrudOperation from '@/components/Crud/CRUD.operation'
import { API } from '@/api/generalAPI'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import combogrid from '@/mixins/combogrid'
import basics from '@/mixins'
import { configFormList, configQueryItems, StrategyConfigCrud } from './config'
export default {
  name: 'StrategyConfig',
  components: { Table, EditForm, CrudOperation },
  mixins: [colDesign, filterContainer, basics, combogrid],
  data() {
    return {
      colName: 'StrategyConfig',
      apiName: 'strategyconfig',
      dialogTitle: this.$t('dialogHeader.strategyConfig'), // '策略配置',

      configFormList,
      configQueryItems,
      StrategyConfigCrud,

      cbgAttr: configFormList[2],
      form: {},
      dialogFormVisible: false,
      formTitle: '',
      isEdit: false
    }
  },
  created() {
    this.configFormList.forEach(item => {
      switch (item.prop) {
        case 'flowID': {
          item.change = row => {
            this.inputFlowName(row)
          }
          break
        }
      }
    })
  },
  methods: {
    handleCreate() {
      this.form = { status: true }
      this.dialogOpen()
      this.getOpts()
    },
    handleUpdate() {
      this.getForm(this.multipleSelection[0].id)
      this.getOpts()
    },
    getOpts() {
      // 接口非标
      API.getData('strategyFlow', null, 'GetFlowList')
        .then(res => {
          this.cbgDataAll = res
          this.cbgAttr.optTotal = res.length
          this.cbgAttr.options = this.formatOpts(this.cbgDataAll, this.cbgAttr)
        })
        .catch(error => {
          console.log(error)
        })
    },
    inputFlowName(val) {
      this.configFormList[2].options.forEach(item => {
        if (item.value === val) {
          this.form.flowName = item.flowName
        } else if (val === '') {
          this.form.flowName = ''
        }
      })
    }
  }
}
</script>
