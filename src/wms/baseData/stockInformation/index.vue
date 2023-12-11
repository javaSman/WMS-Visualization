<template>
  <div class="app-container">
    <div class="header">
      <span>设备编号：</span>
      <el-select v-model="value" placeholder="请选择" @change="valueChange">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-button type="primary" @click="refresh()">刷新</el-button>
    </div>
    <div v-loading="loading" class="cover-wrapper" element-loading-text="拼命加载中...">
      <div class="top-view">
        <div class="left-view">
          <div class="status-up-view">
            <div class="title">
              <span>当前库位状态</span>
            </div>
            <div class="content">
              <div v-for="(item, index) in statusArr" :key="'statusItem' + index" class="status-item">
                <div class="status-cube" :style="{ 'background-color': item.color }" />
                <span>{{ item.name }}({{ item.count }})</span>
              </div>
            </div>
          </div>
          <div class="status-bottom-view">
            <div class="title">
              <span>{{ echartData1.title1 }}</span>
            </div>
            <div class="content">
              <div class="status-item">
                <div class="status-cube" style="background-color: #3888ef" />
                <span>{{ echartData1.occupy.name }}({{ unoccupiedPrecent.toFixed(1) }}%)</span>
              </div>
              <div class="status-item">
                <div class="status-cube" style="background-color: #1bed83" />
                <span>{{ echartData1.unoccupied.name }}({{ occupyPrecent.toFixed(1) }}%)</span>
              </div>
            </div>
            <div class="annluar-box">
              <echartAnnular2
                ref="annularRef"
                :echart-data="echartData1"
                :init-switch="initSwitch"
                :title1="echartData1.title1"
                :title2="echartData1.title2"
                :unoccupied="echartData1.unoccupied"
                :occupy="echartData1.occupy"
              />
            </div>
          </div>
        </div>
        <locationSorting
          :location-data="layoutData"
          @stationNotice="stationNotice"
          @handleUpdate="handleUpdate"
          @handleInStock="handleInStock"
          @handleAllowIn="handleAllowIn"
          @handleStopInAndOut="handleStopInAndOut"
          @handleAllowInAndOut="handleAllowInAndOut"
          @handleForceOutStock="handleForceOutStock"
        />
        <EditForm
          :dialog-form-visible="dialogFormVisible"
          :form-title="formTitle"
          :form-list="detailsformList"
          :form-data="form"
          :is-edit="isEdit"
          :submit="submit"
          @cancel="cancel"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import EditForm from '../../../components/EditDialog'
import locationSorting from '../../../boardView/commonents/locationSorting.vue'
import echartAnnular2 from '../../../boardView/commonents/echartAnnular2.vue'
import { locationJson, annularJson, statusArr, detailsformList, btnItems } from './config/config'
import { API } from '@/api/generalAPI'
export default {
  name: 'stockInformation',
  inject: ['reload'],
  components: {
    locationSorting,
    echartAnnular2,
    EditForm
  },
  mixins: [],
  data() {
    return {
      apiName: 'locations',
      detailsformList,
      form: {},
      statusArr: [],
      unoccupiedPrecent: 0,
      occupyPrecent: 0,
      initSwitch: 0,
      locationJson,
      layoutData: {
        isReverseCol: false,
        rowArr: [],
        firstNum: [],
        areaWidth: 0,
        areaHeight: 0,
        totalLength: 0,
        btnItems:btnItems
      },
      echartData1: {
        title1: '',
        title2: '',
        unoccupied: {},
        occupy: {}
      },
      showOccupyStatus: {},
      dataArray: {},
      value: '',
      options: [],
      dialogFormVisible: false,
      formTitle: '修改',
      isEdit: true,
      setLocaState: '0',
      loading: false
    }
  },
  computed: {
    //   unoccupied(){
    //   var count = 0
    //   if(this.echartData1.unoccupied.value != 0){
    //   count = (100/this.echartData1.unoccupied.value) * this.echartData1.unoccupied.value
    //   }
    //   return count
    // },
    //  occupy(){
    //   var count = 0
    //   if(this.echartData1.occupy.value != 0){
    //   count = (100/this.echartData1.occupy.value) * this.echartData1.occupy.value
    //   }
    //   return count
    //  }
  },
  mounted() {
    this.setLayoutData() // 库位数据
  },
  created() {
    this.getDict()
    this.getStacker()
    this.getWarehouse()
    // this.initAnnularData() //饼图
  },
  methods: {
    refresh() {
      this.getList(this.value)
      // this.reload()
    },
    cancel() {
      this.dialogFormVisible = false
    },
    submit() {
      let data = this.form
      API.dataPut(this.apiName, data, 'Update').then(res => {
        if (res) {
          this.$message({
            message: '修改成功。',
            type: 'success'
          })
          this.dialogFormVisible = false
          this.getList()
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      })
      return true
    },
    handleUpdate(item, index) {
      this.dialogFormVisible = true
      // this.form = Object.assign({}, item) // copy obj
      this.getNewBox()
      this.getCellLocation(item.id)
    },
    // 补入站通知
    stationNotice(item) {
      API.dataPost('WebApi', [item.boxID], 'SendToBoxIn').then(res => {
        if (res.success) {
          this.$message({
            message: '进站通知成功。',
            type: 'success'
          })
          this.getList()
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      })
    },
    // 禁止入库
    handleInStock(item) {
      this.setLocaState = '01'
      this.submitT(item)
    },
    // 允许入库
    handleAllowIn(item) {
      this.setLocaState = '11'
      this.submitT(item)
    },
    handleStopInAndOut(item) {
      this.setLocaState = '02'
      this.submitT(item)
    },
    handleAllowInAndOut(item) {
      this.setLocaState = '12'
      this.submitT(item)
    },
    submitT(item) {
      let data = {
        warehouseID: item.warehouseID,
        LocationID: item.number,
        StateType: this.setLocaState,
        CustomerEditorID : Cookies.get('CustomerUser')
      }
      this.$confirm('确定执行？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          API.dataPost(this.apiName, [data], 'UpdateLocaState').then(res => {
            if (res.success) {
              this.$message({
                message: res.message,
                type: 'success'
              })
              this.getList()
            } else {
              this.$message({
                message: res.message,
                type: 'warning'
              })
            }
          })
        })
    },
    handleForceOutStock(item) {
      this.$confirm('确定执行强制出库？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          API.dataPost('WebApi', [item.boxID], 'SendToBoxOut').then(res => {
            if (res.success) {
              this.$message({
                message: res.message,
                type: 'success'
              })
              this.getList()
            } else {
              this.$message({
                message: res.message,
                type: 'warning'
              })
            }
          })
        })
    },
    getDict() {
      API.getDict('dict', { name: 'state' }).then(res => {
        this.detailsformList[1].options = res.details
      })
      API.getDict('dict', { name: 'productType' }).then(res => {
        this.detailsformList[10].options = res.details
      })
      API.getDict('dict', { name: 'LocalUse' }).then(res => {
        this.detailsformList[11].options = res.details
      })
    },
    valueChange(val) {
      this.getList(val)
    },
    getList(val) {
      if (val) {
        var text = val
      } else {
        var text = this.value
      }
      this.loading = true
      API.dataPost('ShowLocation', { deviceID: text }, 'GetShowLocationsByStacker').then(res => {
        if (res.data) {
          this.loading = false
          this.dataArray = res.data
          this.showOccupyStatus = this.dataArray.showOccupyStatus
          this.statusArr = this.dataArray.statusArr
          this.initAnnularData()
          this.initLoactionData()
        }
      })
    },
    // 初始化库位布局数据
    initLoactionData() {
      // let data = this.locationJson.data
      // console.log(data)
      this.layoutData.isReverseCol = this.dataArray.isReverseCol
      this.layoutData.areaWidth = this.dataArray.layout.areaWidth
      this.layoutData.areaHeight = this.dataArray.layout.areaHeight
      this.layoutData.totalLength = this.dataArray.layout.areaWidth
      let machineList = this.dataArray.machineList
      let lump = 1
      let lumpLength = Math.ceil(this.layoutData.totalLength / this.layoutData.areaWidth)// 列数除以一块区域等于巷道区域
      // console.log('*----*', lumpLength)
      let col = 0
      let row = 1
      let area = 1
      let rows = Math.ceil(machineList.length / this.layoutData.totalLength) // 总数除以列数等于行数
      // console.log(rows, '行数')
      let layoutData = []
      for (let v = 0; v < rows; v++) {
        let obj = {
          area: 0,
          row: 0,
          cols: []
        }
        layoutData.push(obj)
      }
      // console.log(layoutData, '模块')
      machineList.forEach((item, index) => {
        col += 1
        item.col = col
        item.row = row
        item.area = area
        item.lump = lump
        layoutData[row - 1].area = area
        layoutData[row - 1].row = row
        layoutData[row - 1].cols.push(item)

        if (col !== this.layoutData.totalLength && col % this.layoutData.areaWidth === 0) {
          layoutData[row - 1].cols.push({
            isSide: true,
            area: area,
            row: row
          })
          lump += 1
        }

        if (index + 1 === this.layoutData.totalLength * row) {
          col = 0
          lump = 1 + lumpLength * (area - 1)
          row += 1
        }
        if (row - 1 === this.layoutData.areaHeight * area) {
          area += 1
          lump = 1 + lumpLength * (area - 1)
        }
      })
      this.increaseRowIsSide(layoutData)
    },

    // 增加空白分隔行
    increaseRowIsSide(layoutData) {
      let arr = []
      let area = 0
      layoutData.forEach((item, index) => {
        if (area !== 0 && item.area !== area) {
          arr.push({
            isSide: true,
            cols: [],
            area: item.area
          })
        }
        if (item.row === 1) {
          this.layoutData.firstNum = item.cols
        }
        area = item.area
        arr.push(item)
      })
      this.layoutData.rowArr = arr
    },
    // 设置库位UI数据
    setLayoutData() {
      for (let index = 0; index < this.layoutData.rowArr.length; index++) {
        const rowArr = this.layoutData.rowArr[index]
        for (let j = 0; j < rowArr.cols.length; j++) {
          rowArr.cols.forEach((item, k) => {
            if (!item.isSide) {
              item.number = item.row + '-' + item.col + '-' + item.lump
            }
          })
        }
      }
    },
    // 初始化饼图数据
    initAnnularData() {
      this.echartData1.title1 = this.showOccupyStatus.title
      this.echartData1.title2 = this.showOccupyStatus.titleEN
      this.echartData1.unoccupied = this.showOccupyStatus.unoccupied
      this.echartData1.occupy = this.showOccupyStatus.occupy
      let date = new Date()
      this.initSwitch = date.getTime()
      this.$nextTick(() => {
        this.occupyPrecent = this.$refs.annularRef.occupyPrecent
        this.unoccupiedPrecent = this.$refs.annularRef.unoccupiedPrecent
      })
    },
    getStacker() {
      API.get('device', { IsPage: false, DeviceID: 'stacker' }, 'all').then(res => {
        res.items.forEach(item => {
          item.label = item.deviceName + '[' + item.alley + ']'
          item.value = item.deviceID
        })
        this.options = res.items
        this.value = this.options[0].value
        this.getList()
      })
    },
    // 获取仓库
    getWarehouse() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        res.items.forEach(item => {
          item.label = item.warehouseName
          item.value = item.warehouseID
        })
        this.detailsformList[2].options = res.items
      })
    },
    // 获取仓库
    getCellLocation(id) {
      API.get('locations', {}, id).then(res => {
        this.form = Object.assign({}, res)
      })
    },
     getNewBox() {
      API.get('box', { IsPage: true ,SkipCount:0,MaxResultCount:20 }, 'all').then(res => {
        res.items.forEach(item => {
          // arr.push(item.warehouseID)
          item.label = item.boxID
          item.value = item.boxID
        })
        this.detailsformList[3].options = res.items
      })
    }
  }
}
</script>
<style scoped lang="scss">
.header {
  padding-left: 20px;
}

.cover-wrapper {
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 100;
  font-size: 12px;
  overflow-y: hidden;
}

.top-view {
  min-width: 1300px;
  padding: 20px;
  background-color: #fff;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;

  .left-view {
    min-width: 330px;
    max-width: 330px;
    margin-right: 20px;
    height: 480px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 5px 5px 20px 10px #f1f7fd;
    overflow-y: auto; -webkit-overflow-scrolling: touch; white-space: nowrap;
    .status-up-view {
      width: 100%;
      padding: 10px 20px;

      .title {
        padding-bottom: 5px;

        span {
          background-color: #deedff;
          padding: 1px 15px;
          font-size: 16px;
          font-weight: bolder;
          color: #305685;
        }
      }

      .content {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;

        .status-item {
          width: 50%;
          padding: 8px 0px;
          display: flex;
          justify-content: left;
          align-items: center;
          flex-direction: row;

          .status-cube {
            width: 18px;
            height: 8px;
            margin-right: 5px;
          }

          span {
            font-size: 15px;
            color: #666666;
            flex: 1;
            overflow: hidden;
            white-space: wrap;
          }
        }
      }
    }

    .status-bottom-view {
      width: 100%;
      padding: 10px 20px;
      position: relative;

      .annluar-box {
        position: absolute;
        top: 20px;
        right: -70px;
      }

      .title {
        padding-bottom: 5px;

        span {
          background-color: #deedff;
          padding: 1px 15px;
          font-size: 16px;
          font-weight: bolder;
          color: #305685;
        }
      }

      .content {
        .status-item {
          width: 50%;
          padding: 8px 0px;
          display: flex;
          justify-content: left;
          align-items: center;
          flex-direction: row;

          .status-cube {
            width: 18px;
            height: 8px;
            margin-right: 5px;
          }

          span {
            font-size: 15px;
            color: #666666;
            flex: 1;
            overflow: hidden;
            white-space: wrap;
          }
        }
      }
    }
  }
}
</style>
