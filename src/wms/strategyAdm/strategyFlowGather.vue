// 2、策略流程模板
<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="gatherQueryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
      <CrudOperation
        :permission-crud="StrategyFlowGatherCrud"
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
    <EditDetailDialog
      :dialog-form-visible.sync="dialogFormVisible"
      :form-title="formTitle"
      :form-data="form"
      :detail-table.sync="detailTable"
      :is-edit="isEdit"
      :api-name="apiName"
      :form-list="gatherFormList"
      :table-list="gatherTableList"
      :dialog-width="1200"
      :layout="{ span: 8 }"
      :dict-gather="dictGather"
      @create="handleCreate"
      @reset="reset"
      @cancel="cancel"
    />
  </div>
</template>
<script>
import Table from '@/components/Table'
import EditDetailDialog from './module/strategyFlowGatherEdit'
import CrudOperation from '@/components/Crud/CRUD.operation'
import { API } from '@/api/generalAPI'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import { gatherFormList, gatherTableList, gatherQueryItems, StrategyFlowGatherCrud } from './config'
export default {
  name: 'StrategyFlowGather',
  components: { Table, CrudOperation, EditDetailDialog },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'StrategyFlowGather',
      apiName: 'strategyflowgather',
      dialogTitle: this.$t('dialogHeader.strategyFlowGather'), // '策略流程模板',

      gatherFormList,
      gatherTableList,
      gatherQueryItems,
      StrategyFlowGatherCrud,

      cbgAttr: gatherFormList[2],
      form: {},
      dialogFormVisible: false,
      formTitle: '',
      isEdit: false,
      // 明细表
      detailListLoading: false,
      detailTable: [], // 主页明细表
      rowIndex: 0
    }
  },
  created() {
    this.getDict()
  },
  methods: {
    handleCreate() {
      this.rowIndex = 0

      this.form = {}
      this.dialogOpen()
      this.editDisabled(this.isEdit)
    },
    handleUpdate() {
      this.getDetail(this.multipleSelection[0].gatherID)
    },
    getDetail(param) {
      this.formTitle = this.$t('dialog.edit') + this.dialogTitle // '编辑'
      this.isEdit = true
      API.getData(this.apiName, { GatherID: param, IsPage: false }).then(res => {
        let count = res.totalCount
        this.form = res.items[0]
        this.detailTable = res.items
        this.dialogFormVisible = true
        this.editDisabled(this.isEdit, count)
      })
    },
    editDisabled(isEdit, count) {
      this.rowIndex = count
      this.gatherTableList[1].disabled = []
      if (isEdit) {
        this.gatherFormList[0].disabled = true
        for (let i = 0; i < count; i++) {
          this.gatherTableList[0].disabled.push(true)
        }
      } else {
        this.gatherFormList[0].disabled = false
      }
    },
    // // 复选框是否可选
    // selectable(row, index) {
    //   if (index < this.rowIndex) {
    //     row.selectDisable_ = true
    //     return false
    //   } else {
    //     row.selectDisable_ = false
    //     return true
    //   }
    // },
    getDict() {
      API.getDict('dict', { name: 'Strategy' }).then(res => {
        this.gatherTableList[2].options = JSON.parse(JSON.stringify(res.details))
        this.gatherTableList[2].options.forEach(item => {
          item.strategyName = item.label
          item.label = item.value
          console.log(item.label)
        })
      })
    }
  }
}
</script>
