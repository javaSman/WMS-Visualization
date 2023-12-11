<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="deviceShowInfoItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
      <CrudOperation
        :selection="multipleSelection"
        :button-items="deviceShowInfoBtnItems"
        :permission-crud="deviceShowInfoCrud"
        :download-loading.sync="downloadLoading"
        @toEnable="handleEnable()"
        @toDisenable="handleDisenable()"
        @toReset="handleReset()"
        @toReStart="handleReStart()"
        @toGetNewTask="handleGetNewTask()"
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
      :row-style="rowStyle"
      :limit.sync="listQuery.MaxResultCount"
      :is-sort="true"
      :sorting.sync="listQuery.Sorting"
      :dict-gather="dictGather"
      @pagination="getList"
      @tableSort="getList"
    />
  </div>
</template>
<script>
import Table from '@/components/Table'
import { API } from '@/api/generalAPI'
import colDesign from '@/mixins/colDesign'
import CrudOperation from '@/components/Crud/CRUD.operation'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import { deviceShowInfoItems, deviceShowInfoBtnItems, deviceShowInfoCrud } from './config'
export default {
  name: 'DeviceShowInfo',
  components: { Table, CrudOperation },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'DeviceShowInfo_Dto',
      apiName: 'DeviceShowInfo',
      dialogTitle: '',
      deviceShowInfoCrud,
      deviceShowInfoItems,
      deviceShowInfoBtnItems,
      downloadLoading: false,
      isEdit: true,
      dialogVisible: false,
      allWharf: [],
      formData: {},
      order: 0
    }
  },
  created() {
    this.getDict()
  },
  methods: {
    getDict() {
      API.getDict('dict', { name: 'DeviceShowInfoType' }).then(res => {
        this.deviceShowInfoItems[0].options = res.details
      })
      API.getDict('dict', { name: 'WhicOne' }).then(res => {
        this.deviceShowInfoItems[1].options = res.details
      })
    },
    dialogCancel() {
      this.dialogVisible = false
    },
    handleEnable() {
      this.order = 12
      this.submitT()
    },
    handleDisenable() {
      this.order = 11
      this.submitT()
    },
    handleReset() {
      this.order = 21
      this.submitT()
    },
    handleReStart() {
      this.order = 1
      this.submitT()
    },
    handleGetNewTask() {
      this.order = 30
      this.submitT()
    },
    async submitT() {
      let arr = []
      // 获取选中项，将箱号拼接成数组
      this.multipleSelection.forEach(item => {
        let param = {
          whichOne: '',
          deviceId: '',
          deviceType: ''
        }
        param.whichOne = item.whichOne
        param.deviceId = item.deviceId
        param.deviceType = item.deviceType
        param.order = this.order
        arr.push(param)
      })

      await API.dataPost(this.apiName, arr, 'ControlDeviceStatus')
        .then(res => {
          if (res.success) {
            this.outShelvesDialogVisible = false
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
              duration: 3000
            })
          }
        })
        .catch(() => {
          this.$notify({
            title: this.$t('notify.failure'), // '失败'
            // 接口返回数据，待中英配置
            message: this.$t('notify.operateFailure') + ',' + '未知异常', // '操作失败',
            type: 'error',
            duration: 2000
          })
        })
      return true
    },
    // 行样式
    rowStyle(row, rowIndex) {
      let styleJson = {}
      if (row.row.offLineSeconds > 60) {
        styleJson = { background: 'silver' } // 离线 灰
      } else if (row.row.deviceType == '上位机' || row.row.deviceType == 'PLC' || row.row.deviceType == 'DTS') {
        if (row.row.remeber_RunState == false || row.row.run == false) {
          styleJson = { background: 'lightcorol' } // 暂停 粉色
        }
      } else if (row.row.deviceType == '交互码头') {
        if (row.row.hasExp == true) {
          styleJson = { background: 'orangeRed' } // 异常 红
        } else if (row.row.remeber_RunState == false || row.row.run == false) {
          styleJson = { background: 'lightcorol' } // 暂停 粉色
        }
      } else if (row.row.deviceType == '堆垛机') {
        if (row.row.hasExp == true || row.row.deviceStatus == '手动' || row.row.deviceStatus == '未选择') {
          styleJson = { background: 'orangeRed' } // 异常 红
        } else if (row.row.remeber_RunState == false || row.row.run == false) {
          styleJson = { background: 'lightcorol' } // 暂停 粉色
        }
      } else if (row.row.deviceType == '出库码头' || row.row.deviceType == '输送线') {
        if (row.row.remeber_RunState == false) {
          styleJson = { background: 'lightcorol' } // 暂停 粉色
        } else if (row.row.cacheNum == 0) {
          styleJson = { background: 'lightGoldenrodYellow' } // 无缓存 菊黄色
        }
      }
      return styleJson
    },
    // 列样式
    cellStyle(row, column, rowIndex, columnIndex) {
      let styleJson = {}
      if (row.rowIndex === 3) {
        window.console.log(row)
        styleJson = { background: 'red' }
      }
      return styleJson
    }
  }
}
</script>
