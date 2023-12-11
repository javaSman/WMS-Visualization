<template>
  <div class="components-container">
    <div class="head-container">
      <filter-collapse :form-items="boxQueryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
    </div>
    <CrudOperation
      :permission-crud="boxCrud"
      :button-items="boxBtnItems"
      :selection="multipleSelection"
      :download-loading.sync="downloadLoading"
      @toAdd="handleCreate"
      @toEdit="handleUpdate()"
      @toDelete="handleDelete()"
      @toBatchOutShelves="handleBatchOutShelves()"
      @toAlleyOutShelves="handleAlleyOutShelves()"
      @toImport="handleImport()"
      @toExport="handleDownload()"
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
          <!-- '托盘明细' -->
          <h4>{{ $t('dialogHeader.boxDetails') }}</h4>
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
            :data-list="multipleSelection.length === 1 ? detailTable11 : []"
            :column="columnDetail"
            :has-selection="false"
            :page-hidden="true"
            :dict-gather="dictGather"
          />
        </template>
      </split-pane>
    </div>
    <EditDetailOptDialog
      :dialog-form-visible.sync="dialogFormVisible"
      :layout="layout"
      :form-title="formTitle"
      :form-data="form"
      :detail-table.sync="editDetailTable"
      :is-edit="isEdit"
      :form-list="boxFormList"
      :table-list="boxTableList"
      :api-name="apiName"
      :detail-title="detailTitle"
      :col-detail-name="colDetailName"
      :api-detail-name="apiDetailName"
      :detail-query-items="materialQueryItems"
      :check-params="checkParams"
      :dict-gather="dictGather"
      @create="handleCreate"
      @reset="reset"
      @cancel="cancel"
    />
    <UploadDialog
      :dialog-visible.sync="uploadDialogVisible"
      :api-name="apiName"
      :has-template="true"
      :template-path="templatePath"
      @reset="reset"
      @cancel="dialogCancel"
    />
    <EditBatchDialog
      :dialog-visible.sync="batchDialogVisible"
      :form-title="formTitle"
      :form-data="batchForm"
      :batch-form-list="batchFormList"
      :data-list="tableList"
      :detail-table.sync="list"
      api-name="outshelves"
      :batch-table-list="column"
      :dict-gather="dictGather"
      @reset="reset"
      @cancel="dialogCancel"
    />
    <EditAlleyOutShelves
      :dialog-visible.sync="alleyDialogVisible"
      :form-title="formTitle"
      :form-list="AlleyFormList"
      :form-data="form"
      api-name="outshelves"
      @reset="reset"
      @cancel="dialogCancel"
    />
  </div>
</template>
<script>
import Table from '@/components/Table'
import UploadDialog from '@/components/Upload/UploadDialog'
import EditDetailOptDialog from '@/components/EditDetailOptDialog'
import EditBatchDialog from './module/EditBatchDialog'
import EditAlleyOutShelves from './module/EditAlleyOutShelves'
import { API } from '@/api/generalAPI'
import CrudOperation from '@/components/Crud/CRUD.operation'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import splitPane from '@/mixins/splitPane'
import basics from '@/mixins'
import {
  boxQueryItems,
  boxFormList,
  boxTableList,
  boxBtnItems,
  boxCrud,
  materialQueryItems,
  batchFormList,
  AlleyFormList
} from './config'
export default {
  name: 'Box',
  components: { Table, EditDetailOptDialog, EditBatchDialog, EditAlleyOutShelves, CrudOperation, UploadDialog },
  mixins: [colDesign, filterContainer, basics, splitPane],
  data() {
    return {
      colName: 'Box',
      detailColName: 'BoxDetails',
      apiName: 'box',
      dialogTitle: this.$t('dialogHeader.box'), // '托盘',
      templatePath: '/Temp/box.xlsx',

      boxQueryItems,
      boxFormList,
      boxTableList,
      batchFormList,
      AlleyFormList,
      boxBtnItems,
      boxCrud,

      checkParams: 'materialID',
      colDetailName: 'Materials',
      apiDetailName: 'materials',

      detailTitle: this.$t('dialogHeader.materials'), // '物料',

      materialQueryItems,
      layout: { span: 8 },

      form: {},
      dialogFormVisible: false,

      batchForm: {},
      tableList: [],
      editDetailTable: [],

      batchDialogVisible: false,
      uploadDialogVisible: false,

      alleyDialogVisible: false,

      formTitle: '',
      isEdit: false,

      detailQuery: {
        boxID: null
      },
      detailTable11: [],

      listLoading: true,
      detailListLoading: false,

      downloadLoading: false,
      exportParams: {}
    }
  },
  created() {
    this.getDict()
  },
  methods: {
    handleUpdate() {
      this.getForm(this.multipleSelection[0].id)
      this.getDetail(this.multipleSelection[0])
    },
    getDetail(row) {
      this.detailListLoading = true
      this.detailQuery.boxID = row.boxID
      API.getData('boxDetails', this.detailQuery).then(res => {
        this.detailTable11 = res
        this.editDetailTable = res

        this.detailListLoading = false
      })
    },
    getDict() {
      API.getDict('dict', { name: 'BoxType' }).then(res => {
        this.boxQueryItems[1].options = this.boxFormList[1].options = res.details // 获取箱子类型
      })
      API.getDict('dict', { name: 'BoxState' }).then(res => {
        this.AlleyFormList[3].options = this.boxQueryItems[2].options = this.boxFormList[2].options = res.details
      })
      API.getDict('dict', { name: 'MaterialType' }).then(res => {
        this.materialQueryItems[2].options = res.details
      })
      API.getDict('dict', { name: 'MaterialStatus' }).then(res => {
        this.boxFormList[5].options = res.details
      })
      API.getDict('dict', { name: 'StationInfo' }).then(res => {
        this.boxFormList[3].options = this.boxFormList[4].options  = this.boxFormList[6].options= res.details
      })
      // API.getDict('dict', { name: 'PositionStatus' }).then(res => {
      //   this.boxQueryItems[4].options = this.boxFormList[3].options = res.details
      // })
    },
    getOpts() {
      API.getData('wharf', { IsPage: false }).then(res => {
        res.items.forEach(item => {
          item.label = item.name
          item.value = item.wharfID
        })
        this.AlleyFormList[1].options = this.batchFormList[0].options = res.items
      })
    },
    handleBatchOutShelves() {
      this.getOpts()
      this.formTitle = this.$t('dialog.batchShelves') + this.dialogTitle // '批量下架'
      this.batchForm = { boxIDs: [] }
      this.tableList = JSON.parse(JSON.stringify(this.multipleSelection))
      this.batchDialogVisible = true
    },
    handleAlleyOutShelves() {
      this.getOpts()
      this.formTitle = '按巷道下架'
      this.form.statusID = 'Empty'
      this.alleyDialogVisible = true
    },

    // 导入
    handleImport() {
      this.uploadDialogVisible = true
    },

    dialogCancel(val) {
      this.uploadDialogVisible = false
      this.batchDialogVisible = false
      this.alleyDialogVisible = false
      this.form = {}
    }
  }
}
</script>

