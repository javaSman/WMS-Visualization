<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse
        :form-items="readyMaterialsQueryItems"
        :list-query.sync="listQuery"
        @query="getList"
        @reset="reset"
      />
      <CrudOperation
        :button-items="readyMaterialsHeaderBtnItems"
        :selection="multipleSelection"
        @toOutShelves="handleOutShelves"
      />
    </div>
    <div ref="splitArea" class="splitArea">
      <split-pane split="horizontal" :min-percent="25.5" :default-percent="35" @resize="resize">
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
            @headRowClick="headRowClick"
          />
        </template>
        <template slot="paneR">
          <!-- '备料单明细' -->
          <h4>{{ $t('dialogHeader.readyMaterialsOrderDetails') }}</h4>
          <CrudOperation
            :permission-crud="readyMaterialsCrud"
            :button-items="readyMaterialsBtnItems"
            :selection="treeSelection"
            @toPrint="attrChoose"
            @toBatchOutShelves="handleBatchOutShelves"
          />
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
            row-key="id"
            :height="bottomTableH"
            :data-list="multipleSelection.length === 1 ? detailTable : []"
            :column="columnDetail"
            :tree-selection.sync="treeSelection"
            :has-selection="false"
            :page-hidden="true"
            :expand-all="true"
            :expand-list="columnTree"
            :has-expand-table="true"
            :dict-gather="dictGather"
            @loadExpandData="loadExpandData"
          />
        </template>
      </split-pane>
    </div>
    <OutShelvesForm
      form-title="批量下架托盘"
      :dialog-form-visible="outShelvesDialogVisible"
      :form-list="outShelvesForm"
      :form-data="batchData"
      :is-edit="true"
      :submit="submitOutShelves"
      @cancel="dialogCancel"
    />
    <ChooseForm
      form-title="打印配置"
      :dialog-form-visible="dialogFormVisible"
      :form-list="printForm"
      :form-data="theadData"
      :is-edit="true"
      :submit="submitPrintAttr"
      @cancel="cancel"
    />
    <div v-if="printBegin" id="materialHandover" ref="printTable" style="display: none">
      <PrintTable
        v-for="(item, index) in printData"
        :key="index"
        :data="item"
        :thead="theadData"
        :page="printData.length"
        :current-page="index + 1"
      />
    </div>
  </div>
</template>
<script>
import Table from '@/components/Table'
import OutShelvesForm from '@/components/EditDialog'
import ChooseForm from '@/components/EditDialog'
import PrintTable from '@/views/printable-template/materialHanover'
import CrudOperation from '@/components/Crud/CRUD.operation'
import { API } from '@/api/generalAPI'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import splitPane from '@/mixins/splitPane'
import basics from '@/mixins'
import Functions from '@/utils/functions'
import { getLodop } from '@/utils/lodop'
import {
  readyMaterialsQueryItems,
  readyMaterialsCrud,
  outShelvesForm,
  printForm,
  readyMaterialsHeaderBtnItems,
  readyMaterialsBtnItems
} from './config'
export default {
  name: 'ReadyMaterials',
  components: { Table, PrintTable, CrudOperation, OutShelvesForm, ChooseForm },
  mixins: [colDesign, filterContainer, basics, splitPane],
  data() {
    return {
      colName: 'ReadyMaterials',
      detailColName: 'ReadyMaterialsDetails',
      apiName: 'readymaterials',

      readyMaterialsQueryItems,
      readyMaterialsHeaderBtnItems,
      readyMaterialsBtnItems,
      readyMaterialsCrud,
      outShelvesForm,
      printForm,

      detailListLoading: false,
      detailTable: [],

      columnTree: [],
      expandDataList: [],
      treeSelection: [],

      batchData: {},
      outShelvesDialogVisible: false,

      lodop: '',
      printData: [],
      printBegin: false,
      theadData: {},
      dialogFormVisible: false,

      bottomH: 40 // 明细头部有按钮，topH增高
    }
  },
  created() {
    this.getDict()
    this.getTreeCol()
  },
  mounted() {
    this.topTableH = this.splitArea * 0.35 - 64
  },
  methods: {
    /** 获取数据字典-备料状态、配送区域、物料类型 */
    getDict() {
      API.getDict('dict', { name: 'PrepareStatus' }).then(res => {
        this.readyMaterialsQueryItems[3].options = res.details
      })
      API.getDict('dict', { name: 'DeliveryArea' }).then(res => {
        this.printForm[0].options = this.printForm[1].options = res.details
      })
      API.getDict('dict', { name: 'MaterialType' }).then(res => {
        this.printForm[2].options = res.details
      })
    },
    /** 获取下拉位置 下拉选项 */
    getLocationOpts() {
      API.getData('wharf', { IsPage: false }).then(res => {
        res.items.forEach(item => {
          item.label = item.name
          item.value = item.wharfID
        })
        this.outShelvesForm[0].options = res.items
      })
    },
    getTreeCol() {
      API.getForm('usertabletemplatedetail', 'Box').then(res => {
        this.columnTree = res
      })
    },
    /** 获取备料明细 */
    getDetail(row) {
      this.detailListLoading = true
      if (!row.readyMaterialsID) {
        this.detailTable = []
        this.detailListLoading = false
        return
      }
      API.getData(this.apiName, { readyMaterialsID: row.readyMaterialsID }, 'GetDetails').then(res => {
        this.detailTable = res
        if (res) {
          // 加载所有展开行数据
          let i = 0
          this.detailTable.map(row => {
            row.expanded = false // 增加行展开状态
            this.$refs.tableDetail.expandChange(row, i) // rowIndex 在渲染表格 rowClass 时加入，未渲染时，根据数据行顺序 i 写入
            i++
          })
        }
        this.detailListLoading = false
      })
    },
    /* 展开子表逻辑：
（子表 ref=expandTable_i，表格明细表 row 加 rowIndex、expanded、expandDataList，子表 row 加 parentIndex、details）
1、点击主表，获取明细表数据，根据每条明细进行查询请求；
2、查出各自的子表数据，赋值于子表的 row.expandDataList 中，并将子表隐含的 box 明细（用于打印）赋于子表 row.details 中；
3、表格默认全部展开，则在每张子表数据初始获取成功后，设置全选；
4、折叠行后再次展开，已选行未同步，则根据展开行号 rowIndex，查找已选数据中与 parentIndex 对应的行，设置选中状态true；
5、给每行明细数据增加 expanded 的展开状态，在点击展开时切换状态，折叠时直接返回，展开时选中已选行
*/
    loadExpandData(row, index) {
      // 当展开行的行号与已选中行的父行号相同，设置选中（解决重新展开渲染不选中）
      if (row.expandDataList !== undefined) {
        for (let i = 0; i < this.treeSelection.length; i++) {
          let row = this.treeSelection[i]
          if (row.parentIndex === index) {
            this.$nextTick(() => {
              this.$refs.tableDetail.$refs['expandTable_' + index].toggleRowSelection(row, true)
            })
            return
          }
        }
        return // 已加载过数据，不再次请求
      }
      let params = {
        ProjectID: row.projectID,
        StationID: row.stationID,
        OrderID: row.readyMaterialsID,
        MaterialID: row.materialID
      }
      API.getData('box', params, 'GetBoxList').then(res => {
        if (res.datas) {
          let arr = []
          res.datas.map(item => {
            // 转换数据格式，以便打印所展开的子表的明细
            item.box.details = item.details
            // 增加父行号标记
            item.box.parentIndex = index
            arr.push(item.box)
          })
          this.$set(row, 'expandDataList', arr)
          // 获取展开明细后全选
          this.$refs.tableDetail.$refs['expandTable_' + index].toggleAllSelection()
        } else {
          this.$set(row, 'expandDataList', [])
        }
      })
    },
    headRowClick() {
      this.treeSelection = []
      this.$refs.tableDetail.treeRowsObj = {}
    },
    /** 打印功能 */
    attrChoose() {
      // 判断是否需要下载打印控件，不需要则进行配置，再打印
      let LODOP = getLodop()
      if (LODOP.statusHtml) {
        this.$alert(LODOP.statusHtml, '打印提示', {
          dangerouslyUseHTMLString: true,
          showClose: false,
          showConfirmButton: false
        })
        return
      } else {
        this.lodop = LODOP
      }
      this.dialogFormVisible = true
      this.theadData = {}
    },
    /** 打印自定义提交方法 */
    submitPrintAttr(form) {
      this.theadData = form
      this.theadData.orderID = this.multipleSelection[0].orderID
      this.dialogFormVisible = false
      this.print()
      return true
    },
    /** 打印样式 */
    print() {
      this.printBegin = true
      let details = []
      this.treeSelection.map(item => {
        details = details.concat(item.details)
      })
      this.printData = Functions.splitArray(details, 13)
      let strStyle = '<style>'
      strStyle += 'html,body {padding: 0;margin: 0;}'
      strStyle += '.logo {width: 10mm;position: absolute;left:2mm;top:1mm}'
      strStyle += '.page { width: 294mm; page-break-after: always;}'
      strStyle +=
        'table {position:relative;margin: auto;border-collapse: collapse;font-family: 宋体;font-size: 10pt;table-layout: fixed;word-break: break-all;page-break-after:always;}'
      strStyle += '.table td {text-align: left;height: 10mm;border: 1px solid #000;padding: 0 3px;}'
      strStyle += '.td-title td {text-align: center;height: 14mm !important;}'
      strStyle += '.table tr {height: 10mm;}'
      strStyle += '.top-title td { height: 14mm;}'
      strStyle += '.barcode {height: 16mm;position: absolute;top: 17mm;}'
      strStyle +=
        ' .main-title { height: 12mm !important; line-height: 12mm; font-size: 16pt; font-weight: bold;text-align: center !important;border:none !important;border-bottom:1px solid}'
      strStyle +=
        '.top-right {text-align: left;font-size: 9pt;font-weight: normal;position: absolute;right: 1mm;line-height: 4mm;}'
      strStyle += '.col_design {height: 0 !important}'
      strStyle += '.col_design td {height: 0;visibility: hidden;border: none;}'
      strStyle += '.tb-footer td {line-height: 7mm;text-align:right;border: none;}'
      strStyle += '.footer-page {font-family: 宋体; font-size: 10pt; margin: 2mm auto; text-align: center;}'
      strStyle += '</style>'
      let LODOP = this.lodop
      this.$nextTick(() => {
        let strHtml = document.getElementById('materialHandover').innerHTML
        LODOP.PRINT_INIT('物料交接清单打印')
        LODOP.SET_PRINT_PAGESIZE(2, 0, 0, 'A4') // 1纵向、2横向，纸宽，纸高，A4规格
        let printTemplate = strStyle + '<body>' + strHtml + '</body>'
        LODOP.ADD_PRINT_HTM('2mm', '3mm', '293mm', '204mm', printTemplate) // Top,Left,Width,Height
        LODOP.SET_SHOW_MODE('LANDSCAPE_DEFROTATED', 1) // 横向时的正向显示
        LODOP.PREVIEW()
        this.printBegin = false
      })
    },
    /** 下架功能 */
    handleOutShelves() {
      var row = this.multipleSelection[0]
      // '确认下架选中项','提示'
      this.$confirm(this.$t('dialog.outShelvesTips'), this.$t('dialog.tip'), {
        confirmButtonText: this.$t('button.confirm'), // '确认'
        cancelButtonText: this.$t('button.cancel'), // '取消'
        type: 'warning'
      })
        .then(() => {
          API.post('outshelves', { SourceID: row.readyMaterialsID }, 'AutoOutShelves').then(res => {
            if (res.success) {
              this.$notify({
                title: this.$t('notify.success'), // '成功'
                message: this.$t('notify.operateSuccess'), // '操作成功',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify({
                title: this.$t('notify.failure'), // '失败'
                // 接口返回数据，待中英配置
                message: this.$t('notify.operateFailure') + ',' + res.message, // '操作失败',
                type: 'error',
                duration: 2000
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('notify.cancelOutShelves') // '已取消下架'
          })
        })
    },
    /** 批量下架功能 */
    handleBatchOutShelves() {
      this.getLocationOpts()
      this.batchData = {}
      this.outShelvesDialogVisible = true
    },
    /** 批量下架自定义提交方法 */
    async submitOutShelves() {
      // debugger
      let params = {
        boxIDs: [],
        deliverLocation: ''
      }
      let boxIDs = []
      // 获取选中项，将箱号拼接成数组
      this.treeSelection.map(item => {
        boxIDs = params.boxIDs.concat(item.boxID)
      })
      // 箱号数组去重
      params.boxIDs = Array.from(new Set(boxIDs))
      params.deliverLocation = this.batchData.deliverLocation
      await API.dataPost('outshelves', params, 'BoxBatchOutShelves')
        .then(res => {
          if (res.success) {
            this.$notify({
              title: this.$t('notify.success'), // '成功'
              message: this.$t('notify.operateSuccess'), // '操作成功',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: this.$t('notify.failure'), // '失败'
              // 接口返回数据，待中英配置
              message: this.$t('notify.operateFailure') + ',' + res.message, // '操作失败',
              type: 'error',
              duration: 2000
            })
          }
        })
        .catch(() => {
          this.outShelvesDialogVisible = false
        })
      return true
    },
    /** 批量下架对话框关闭 */
    dialogCancel() {
      this.outShelvesDialogVisible = false
    }
  }
}
</script>
