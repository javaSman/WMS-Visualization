// 4、策略流程
<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="flowQueryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
      <CrudOperation
        :permission-crud="StrategyFlowCrud"
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
    <EditDialog
      v-if="dialogFormVisible"
      :dialog-form-visible="dialogFormVisible"
      :form-title="formTitle"
      :form-data="form"
      :detail-table.sync="detailTable"
      :detail-all="detailAll"
      :is-edit="isEdit"
      :form-list="flowFormList"
      :table-list="flowTableList"
      :api-name="apiName"
      :dict-gather="dictGather"
      @create="handleCreate"
      @cancel="cancel"
      @reset="reset"
    />
  </div>
</template>
<script>
import Table from '@/components/Table'
import EditDialog from './module/flowEdit'
import { API } from '@/api/generalAPI'
import CrudOperation from '@/components/Crud/CRUD.operation'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import { flowFormList, flowQueryItems, flowTableList, StrategyFlowCrud } from './config'
export default {
  name: 'StrategyFlow',
  components: { Table, CrudOperation, EditDialog },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'StrategyFlow',
      apiName: 'strategyflow',
      dialogTitle: this.$t('dialogHeader.strategyFlow'), // '策略流程',

      flowFormList,
      flowQueryItems,
      flowTableList,
      StrategyFlowCrud,

      form: {},
      dialogFormVisible: false,
      formTitle: '',
      isEdit: false,

      cbgAttr: flowFormList[0],

      detailTable: [],
      detailListLoading: false,
      detailAll: []
    }
  },
  created() {
    this.getFlowId()
    this.getDict()
  },
  methods: {
    loadAllDetail() {
      API.getData('strategyflowgather', { IsPage: false }).then(res => {
        this.detailAll = res.items // 获取所有明细
      })
    },
    getFlowId() {
      API.get('StrategyConfig', { IsPage: false }, 'all').then(res => {
        res.items.forEach(item => {
          item.label = item.stationDesc + '(' + item.flowID + ')'
          item.value = item.flowID
        })
        this.flowQueryItems[0].options = res.items
      })
    },
    handleCreate() {
      this.form = {}
      this.loadAllDetail()
      this.dialogOpen()
      this.getOpts()
    },
    handleUpdate() {
      this.loadAllDetail()
      this.getDetail(this.multipleSelection[0].flowID)
    },
    getDetail(param) {
      this.formTitle = this.$t('dialog.edit') + this.dialogTitle // '编辑'
      this.isEdit = true
      API.getData(this.apiName, { flowID: param, IsPage: false }).then(res => {
        this.form = res.items[0]
        this.detailTable = res.items
        this.dialogFormVisible = true
        console.log(this.detailTable)
      })
    },
    handleDelete() {
      this.delete('flowID', API.dataPost) // 可在页面自定义
    },
    getOpts() {
      // API.getData('strategyDetails', { StrategyID: row.strategyID, IsPage: false }).then(res => {
      //   this.flowTableList[3].options = res.items
      //   this.flowTableList[3].options.forEach(item => {
      //     // console.log(item.strategyValue)
      //     item.value = item.strategyValue
      //     item.label = item.strategyValue
      //   })
      //   // res.items.forEach(item => {
      //   // console.log(res)
      //   //
      //   // console.log(item.strategyValue)
      //   // })
      //   // console.log(this.detailTable[3])
      //   // this.AlleyFormList[1].options = this.batchFormList[0].options = res.items
      // })
    },
    getDict() {
      // API.getDict('dict', { name: 'StrategyType' }).then(res => {
      //   this.flowFormList[2].options = res.details
      // })
      // API.getDict('dict', { name: 'Strategy' }).then(res => {
      //   this.flowTableList[3].options = JSON.parse(JSON.stringify(res.details))
      //   this.flowTableList[3].options.forEach(item => {
      //     // item.strategyName = item.label
      //     item.label = item.value
      //   })
      // })
    }
  }
}
</script>
