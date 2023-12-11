<template>
  <div class="components-container">
    <div class="head-container">
      <filter-collapse :form-items="inStockQueryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
    </div>
    <CrudOperation
      :permission-crud="inStockCrud"
      :selection="multipleSelection"
      @toAdd="handleCreate"
      @toEdit="handleUpdate()"
      @toDelete="handleDelete()"
    />
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
            :dict-gather="dictGather"
            @getDetail="getDetail"
            @pagination="getList"
            @tableSort="getList"
          />
        </template>
        <template slot="paneR">
          <!-- '入库单明细' -->
          <h4>{{ $t('dialogHeader.inStockOrderDetails') }}</h4>
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
    <EditDetailOptDialog
      v-if="dialogFormVisible"
      :dialog-form-visible.sync="dialogFormVisible"
      :layout="layout"
      :form-title="formTitle"
      :form-data="form"
      :detail-table.sync="detailTable"
      :is-edit="isEdit"
      :form-list="inStockFormList"
      :table-list="inStockTableList"
      :detail-all="detailAll"
      :api-name="apiName"
      :detail-title="detailTitle"
      :col-detail-name="colDetailName"
      :api-detail-name="apiDetailName"
      :detail-query-items="materialQueryItems"
      :check-params="checkParams"
      :selectable="selectable"
      :dict-gather="dictGather"
      @regainDetail="regainDetail"
      @create="handleCreate"
      @reset="reset"
      @cancel="cancel"
    />
  </div>
</template>
<script>
import CrudOperation from '@/components/Crud/CRUD.operation'
import Table from '@/components/Table'
import EditDetailOptDialog from '@/components/EditDetailOptDialog'
import { API } from '@/api/generalAPI'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import splitPane from '@/mixins/splitPane'
import basics from '@/mixins'
import { inStockQueryItems, inStockCrud, inStockFormList, inStockTableList, materialQueryItems } from './config'
export default {
  name: 'InStock',
  components: { Table, EditDetailOptDialog, CrudOperation },
  mixins: [colDesign, filterContainer, basics, splitPane],
  data() {
    return {
      colName: 'InStockHeader',
      detailColName: 'InStockDetails',
      dialogTitle: this.$t('dialogHeader.inStockOrder'), // '入库单',

      apiName: 'instockheader',

      inStockQueryItems,
      inStockCrud,
      inStockFormList,
      inStockTableList,

      checkParams: 'materialID',
      colDetailName: 'Materials',
      apiDetailName: 'materials',
      detailTitle: this.$t('dialogHeader.materials'), // '物料',

      materialQueryItems,
      detailAll: [],
      layout: { span: 8 },
      rowIndex: 0,

      form: {},
      dialogFormVisible: false,
      formTitle: '',
      isEdit: false,

      detailListLoading: false,
      detailTable: [] // 主页明细表
    }
  },
  created() {
    this.getDict()
  },
  methods: {
    regainDetail(data) {
      data.forEach(item => {
        item.unitID = item.baseUnit
      })
    },
    getDict() {
      API.getDict('dict', { name: 'InStockType' }).then(res => {
        this.inStockFormList[2].options = this.inStockQueryItems[2].options = res.details
      })
    },
    handleUpdate() {
      this.getDetail(this.multipleSelection[0])
      this.editDisabled(this.isEdit, this.detailTable.length)
      this.rowIndex = this.detailTable.length
      if (this.form.statusID === 'Finish') {
        this.$notify({
          title: this.$t('notify.failure'), // '失败'
          dangerouslyUseHTMLString: true,
          message: this.$t('notify.banEdit'), // '该单据已完成，无法进行修改',
          type: 'error',
          duration: 3000
        })
        this.dialogFormVisible = false
      } else {
        this.dialogFormVisible = true
      }
    },
    handleCreate() {
      this.rowIndex = 0
      this.form = {}
      this.dialogOpen()
      this.editDisabled(this.isEdit)
    },
    // 是否可编辑
    editDisabled(isEdit, count) {
      for (let i = 0; i < this.inStockTableList.length; i++) {
        if (i < 4 || i > 8) {
          this.inStockTableList[i].disabled = []
        }
      }
      if (isEdit) {
        this.inStockFormList.forEach(item => {
          item.disabled = true
        })
        for (let i = 0; i < this.inStockTableList.length; i++) {
          if (i < 4 || i > 8) {
            for (let j = 0; j < count; j++) {
              this.inStockTableList[i].disabled.push(true)
            }
          }
        }
      } else {
        for (let i = 0; i < this.inStockFormList.length; i++) {
          if (i >= 0 && i < 2) {
            this.inStockFormList[i].disabled = true
          } else {
            this.inStockFormList[i].disabled = false
          }
        }
      }
    },
    // // 复选框是否可选
    selectable(row, index) {
      if (index < this.rowIndex) {
        row.selectDisable_ = true
        return false
      } else {
        row.selectDisable_ = false
        return true
      }
    }
  }
}
</script>
