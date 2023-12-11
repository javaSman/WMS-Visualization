<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="queryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
      <CrudOperation
        :permission-crud="WcsCrud"
        :button-items="wcsBtnItems"
        :selection="multipleSelection"
        :download-loading.sync="downloadLoading"
        @toEdit="handleUpdate()"
        @toExport="handleDownload()"
        @toPriority="handlePriority()"
        @toExecute="handleExecute()"
        @toReportTask="handleReportTask()"
        @toBatchCancel="handleBatchCancel()"
        @toResend="handleResend()"
        @toCancel="handleCancel()"
        @toForceUpdateTaskState="handleForceUpdateTaskState()"
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
      @tableSort="getList"
      @pagination="getList"
    />
    <EditForm
      :dialog-form-visible="dialogFormVisible"
      :form-title="formTitle"
      :form-list="wcsFormList"
      :form-data="form"
      :is-edit="isEdit"
      :api-name="apiName"
      @create="handleCreate"
      @cancel="cancel"
      @reset="reset"
    />
    <ReportTaskDialog
      :dialog-form-visible="reportDialogVisible"
      :form-list="reportFormList"
      :form-data="form"
      :dialog-width="500"
      :layout="{ span: 20 }"
      form-title="报工"
      :api="API"
      api-name="WebApi"
      api-method="SetTaskInfoState"
      @cancel="dialogCancel"
      @reset="reset"
    />
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import CrudOperation from '@/components/Crud/CRUD.operation'
import Table from '@/components/Table'
import EditForm from '@/components/EditDialog'
import ReportTaskDialog from './module/reportTaskDialog'
import { API } from '@/api/generalAPI'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import { queryItems, wcsFormList, reportFormList, wcsBtnItems, WcsCrud } from './config'
import permission from '@/directive/permission/index.js'
export default {
  name: 'WCSTask',
  components: { Table, EditForm, CrudOperation, ReportTaskDialog },
  directives: { permission },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'TaskInfo',
      apiName: 'TaskInfo',
      dialogTitle: this.$t('dialogHeader.wcsTask'), // 'wcs任务',
      queryItems,
      wcsFormList,
      reportFormList,
      wcsBtnItems,
      WcsCrud,
      API,
      // defaultSort: 'priority',
      defaultSort: '',
      listQuery: {
        // Sorting: 'priority',
        Sorting: '',
        SkipCount: 0,
        MaxResultCount: 20
      },

      form: {},
      dialogFormVisible: false,
      formTitle: '',
      isEdit: false,

      reportDialogVisible: false,

      downloadLoading: false,
      exportParams: {}
    }
  },
  created() {
    this.getDict()
    this.getWarehouse()
    this.queryItems.forEach(item => {
      switch (item.prop) {
        case 'WarehouseID': {
          item.change = () => {
            // console.log(111)
            var storage = window.localStorage
            var shelfLabel = this.listQuery.WarehouseID
            storage.setItem('shelfLabel', shelfLabel)
          }
        }
      }
    })
    this.getLocalstorage()
  },
  methods: {
    getDict() {
      API.getDict('dict', { name: 'TaskState' }).then(res => {
        this.reportFormList[0].options = this.queryItems[3].options = res.details
      })
      API.getDict('dict', { name: 'TaskType' }).then(res => {
        this.queryItems[4].options = res.details
      })
      // /  API.getDict('dict', { name: 'Warehouse' }).then(res => {
      // /    this.queryItems[3].options = res.details
      // /  })
    },
    getWarehouse() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        // let arr = []
        res.items.forEach(item => {
          // arr.push(item.warehouseID)
          item.label = item.warehouseName
          item.value = item.warehouseID
        })
        this.queryItems[0].options = res.items
      })
    },
    reset(val) {
      if (val === 0) {
        // 查询条件修改为默认值
        this.page = 1
        if (this.$refs.table) {
          this.$refs.table.$refs.table.clearSort()
        }
        this.listQuery = {
          Sorting: '',
          SkipCount: 0,
          MaxResultCount: this.listQuery.MaxResultCount
        }
      } else if (val === 1) {
        // 查询条件不修改,仅页码修改为第一页,查询为第一页
        this.page = 1
        this.listQuery.SkipCount = 0
      }
      // 不传参，保留原有查询条件、页码
      this.getList()
    },
    /** 优先 */
    handlePriority() {
      var row = this.multipleSelection[0]
      if (row.state === '创建' || row.state === '下发') {
        API.post(this.apiName, { id: this.multipleSelection[0].id, CustomerEditorID: Cookies.get('CustomerUser') }, 'Priority').then(res => {
          if (res) {
            this.$message({
              message: this.$t('notify.hasPrioritized'), // '已优先',
              type: 'success'
            })
            this.getList()
          }
        })
      } else {
        this.$message({
          message: this.$t('notify.selectCreateOrAssign'), // '请选择状态为“创建”或“下发”的数据',
          type: 'warning'
        })
      }
    },
    /** 报工 */
    handleReportTask() {
      var row = this.multipleSelection[0]
      if (row.state !== '完成' && row.state !== '取消') {
        API.getForm(this.apiName, this.multipleSelection[0].id).then(res => {
          this.form = {
            state: '',
            taskId: res.taskId,
            remark: res.remark
          }
          // this.reportTaskTitle = '报工'
          this.reportDialogVisible = true
        })
      } else {
        this.$message({
          message: '取消或完成状态无法报工',
          type: 'warning'
        })
      }
    },
    /** 报工 */
    handleForceUpdateTaskState() {
      var row = this.multipleSelection[0]
      if (row.state !== '完成' && row.state !== '取消') {
        API.getForm(this.apiName, this.multipleSelection[0].id).then(res => {
          this.form = {
            state: '',
            taskId: res.taskId,
            remark: res.remark,
            forceUpdateTaskState: 'forceUpdateTaskState'
          }
          // this.reportTaskTitle = '强制更新任务状态'
          this.reportDialogVisible = true
        })
      } else {
        this.$message({
          message: '取消或完成状态无法报工',
          type: 'warning'
        })
      }
    },
    /** 取消 */
    handleCancel() {
      var row = this.multipleSelection[0]
      if (row.state === '创建' || row.state === '运行') {
        this.updateState({ TaskId: row.taskId, State: 'Cancel' }, this.$t('notify.hasCanceled')) // '已取消'
      } else {
        this.$message({
          message: this.$t('notify.selectCreateOrRun'), // '请选择状态为“创建”或“运行”的数据',
          type: 'warning'
        })
      }
    },
    /** 批量取消 */
    handleBatchCancel() {
      var rows = this.multipleSelection
      if (rows.lenght === 0) {
        this.$message({
          message: '请至少选择一项！',
          type: 'warning'
        })
        return
      }

      var success = true
      var list = []
      for (const i in rows) {
        var row = rows[i]
        if (row.state !== '创建' && row.state !== '下发' && row.state !== '运行' &&
          row.state !== '异常' && row.state !== '去取货' && row.state !== '取货中' &&
          row.state !== '去放货' && row.state !== '放货中') {
          this.$message({
            message: '取消或完成状态无法执行取消',
            type: 'warning'
          })
          success = false
          break
        } else {
          list.push(row.taskId)
        }
      }

      if (success) {
        this.$confirm('确定对 ' + list.length + ' 个任务执行批量取消？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            API.dataPost(this.apiName, list, 'BatchCancel').then(res => {
              if (res) {
                this.$message({
                  message: '取消成功！',
                  type: 'success'
                })
                this.getList()
              }
            })
          })
      }
    },
    updateState(params, msg) {
      params.CustomerEditorID = Cookies.get('CustomerUser')
      API.dataPost(this.apiName, params, 'UpdateState').then(res => {
        if (res) {
          this.$message({
            message: msg,
            type: 'success'
          })
          this.getList()
        }
      })
    },
    dialogCancel() {
      this.reportDialogVisible = false
    },
    getLocalstorage() {
      let shelfLabel = window.localStorage.getItem('shelfLabel')
      this.$set(this.listQuery, 'WarehouseID', shelfLabel)
    }
  }
}
</script>
