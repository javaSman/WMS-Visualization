<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="queryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
      <CrudOperation
        :permission-crud="WharfCrud"
        :selection="multipleSelection"
        :button-items="instockRequestBtnItems"
        @toAdd="handleCreate"
        @toEdit="handleUpdate()"
        @toDelete="handleDelete()"
        @toExport="handleExport()"
        @toInstockRequest="handleInstockRequest()"
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
    <InstockRequestForm
      :form-title="dialogTitle"
      :dialog-form-visible="instockRequestFormVisible"
      :form-list="ttInstockRequestForm"
      :form-data="instockRequestData"
      :is-edit="notShowContine"
      :submit="submitInstockRequest"
      @cancel="dialogCancel"
    />
  </div>
</template>
<script>
import Table from '@/components/Table'
import { API } from '@/api/generalAPI'
import EditForm from '@/components/EditDialog'
import InstockRequestForm from '@/components/EditDialog'
import CrudOperation from '@/components/Crud/CRUD.operation'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import combogrid from '@/mixins/combogrid'
import { formList, queryItems, WharfCrud, instockRequestBtnItems, ttInstockRequestForm } from './config'
export default {
  name: 'Wharf',
  components: { Table, EditForm, CrudOperation, InstockRequestForm },
  mixins: [colDesign, filterContainer, basics, combogrid],
  data() {
    return {
      colName: 'Wharf',
      apiName: 'wharf',
      dialogTitle: this.$t('dialogHeader.wharf'), // '码头',

      ttInstockRequestForm,
      instockRequestFormVisible: false,
      instockRequestBtnItems,
      instockRequestData: {},
      wharfId: '',
      notShowContine: true,

      formList,
      queryItems,
      WharfCrud,

      form: {},
      dialogFormVisible: false,

      exportParams: {},

      formTitle: '码头',
      isEdit: false
    }
  },
  created() {
    this.getDict()
    this.getStacker()
    this.getWarehouse()
  },
  methods: {
    getDict() {
      API.getDict('dict', { name: 'WharfType' }).then(res => {
        this.formList[4].options = this.queryItems[3].options = res.details
      })
      API.getDict('dict', { name: 'NewState' }).then(res => {
        this.formList[5].options = this.queryItems[5].options = res.details
      })
      API.getDict('dict', { name: 'LineCode' }).then(res => {
        this.formList[9].options = res.details
      })
      API.getDict('dict', { name: 'Wharf-SubjoinFun' }).then(res => {
        this.formList[10].options = res.details
      })
    },
    getStacker() {
      API.get('device', {IsPage: false, DeviceID: 'stacker' }, 'all').then(res => {
        res.items.forEach(item => {
          item.label = item.deviceName + '[' + item.alley + ']'
          item.value = item.deviceID
        })
        this.queryItems[6].options = this.formList[3].options = res.items
      })
    },
    getWarehouse() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        res.items.forEach(item => {
          item.label = item.warehouseName
          item.value = item.warehouseID
        })
        this.queryItems[0].options = this.formList[2].options = res.items
      })
    },
    handleCreate() {
      this.dialogOpen()
      this.form = {}
    },
    handleUpdate() {
      this.getForm(this.multipleSelection[0].id)
    },
    // 弹窗：请求入库
    handleInstockRequest() {
      this.dialogTitle = '申请入库'
      let row = this.multipleSelection[0]
      if (row.wharfType !== 'Wharf-In') {
        this.$message({
          title: this.$t('notify.failure'),
          message: '请选择入库码头发起请求',
          type: 'error',
          duration: 2000
        })
      } else {
        this.wharfId = row.wharfID
        this.instockRequestFormVisible = true
      }
    },
    dialogCancel() {
      this.instockRequestFormVisible = false
      this.dialogFormVisible = false
    },
    async submitInstockRequest() {
      let params = {
        boxID: [],
        wharfID: ''
      }
      params.wharfID = this.wharfId
      params.boxID = this.instockRequestData.boxId
      await API.dataPost('Webapi', params, 'inStockOrJumpStation')
        .then(res => {
          if (res.success) {
            this.instockRequestFormVisible = false
            this.$notify({
              title: this.$t('notify.success'), // '成功'
              message: this.$t('notify.operateSuccess') + ',' + res.message, // '操作成功',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: this.$t('notify.failure'), // '失败'
              message: this.$t('notify.operateFailure') + ',' + res.message, // '操作失败',
              type: 'error',
              duration: 2000
            })
          }
        })
        .catch(() => {
          this.instockRequestFormVisible = false
        })
      return true
    }
  }
}
</script>
