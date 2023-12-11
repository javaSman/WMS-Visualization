<template>
  <div class="common-wrapper">
    <div class="seat-wrap">
      <div class="seat-order">
        <div class="order-block" />
        <div ref="orderBox" class="order-box" @scroll.passive="orderBoxScroll($event)">
          <div v-for="(orderItem, orderIndex) in locationData.rowArr" :key="'order' + orderIndex">
            <div v-if="orderItem.isSide" class="order-side" />
            <!-- <div v-if="orderItem.row>=locationData.areaHeight+1" class="order" :style="{'height':orderItem.cols[0].height+10+'px'}">{{orderItem.row - locationData.areaHeight }}</div>
            <div v-if="orderItem.row<locationData.areaHeight+1" class="order" :style="{'height':orderItem.cols[0].height+10+'px'}">{{ orderItem.row}}</div> -->
            <!-- <div  v-if="orderItem.row>=locationData.areaHeight+1" class="order"
              :style="{ 'height': orderItem.cols[0].height + 10 + 'px' }">{{ tenSmall(orderItem,orderIndex) }}</div> -->
            <div v-else class="order" :style="{ height: orderItem.cols[0].height + 10 + 'px' }">
              {{ tenSmall(orderItem, orderIndex) }}
            </div>
          </div>
        </div>
      </div>
      <div ref="seatBox" class="seat-box">
        <div class="visualization-width">
          <div ref="seatTopRows" class="seat-top-rows">
            <template v-for="(topItem, topNum) in locationData.firstNum">
              <div
                v-if="!topItem.isSide && locationData.isReverseCol == true"
                :key="'numH' + topNum"
                class="seat-top-number"
                :style="{ 'min-width': topItem.width + 10 + 'px' }"
              >
                {{ locationData.firstNum.length - topNum }}
              </div>
              <div
                v-else-if="!topItem.isSide && locationData.isReverseCol == false"
                :key="'numH' + topNum"
                class="seat-top-number"
                :style="{ 'min-width': topItem.width + 10 + 'px' }"
              >
                {{ topItem.col }}
              </div>
              <div v-else :key="topNum + 'topSide'" class="seat-top-side" />
              <div
                v-if="topNum + 1 === locationData.firstNum.length"
                :key="topNum + 'topLastSide'"
                class="seat-top-number-last"
              />
            </template>
          </div>
        </div>
        <div ref="contentBox" class="visualization-height" @scroll.passive="rowsScroll($event)">
          <div class="scroll-box">
            <div class="divider-line-V-box">
              <template v-for="(itemNum, iNum) in locationData.firstNum">
                <li
                  v-if="!itemNum.isSide"
                  :key="'numH_box' + iNum"
                  class="serial-number"
                  :style="{ 'min-width': itemNum.width + 'px' }"
                />
                <li v-else :key="iNum + 'side'" class="side">
                  <div class="divider-line-v" />
                </li>
              </template>
            </div>
            <div ref="rowsBox" class="rows-box">
              <ul
                v-for="(item, index) in locationData.rowArr"
                :key="'row' + index"
                class="rows"
                :class="{ side: item.isSide }"
              >
                <template v-if="item.isSide">
                  <div class="divider-line-H" />
                </template>
                <template v-else>
                  <template v-for="(item2, i2) in item.cols">
                    <el-popover v-if="!item2.isSide" :key="i2 + 'item'" placement="bottom-start" width="374"
                      trigger="hover"
                      :open-delay="500">
                      <div class="detail-box">
                        <div class="detail-item">
                          <div class="detail-title">托盘编号：</div>
                          <div class="detail-content">{{ item2.boxID }}</div>
                        </div>
                        <div class="detail-item">
                          <div class="detail-title">入库时间：</div>
                          <div class="detail-content">{{ item2.inTime }}</div>
                        </div>
                        <div class="detail-item">
                          <div class="detail-title">在库时间：</div>
                          <div class="detail-content">{{ item2.stayTime }}</div>
                        </div>
                        <div class="detail-item">
                          <div class="detail-title">库位编号：</div>
                          <div class="detail-content">{{ item2.number }}</div>
                        </div>
                        <div class="detail-item">
                          <div class="detail-title">仓库类型：</div>
                          <div class="detail-content">{{ item2.warehouseType }}</div>
                        </div>
                        <div class="detail-item">
                          <div class="detail-title">温度：</div>
                          <div class="detail-content">{{ item2.temperature }}</div>
                        </div>
                        <div class="detail-item">
                          <div class="detail-title">预计出库时间：</div>
                          <div class="detail-content">{{ item2.expectOutTime }}</div>
                        </div>
                        <div class="detail-item">
                          <div class="detail-title">库位状态：</div>
                          <div class="detail-content">{{ item2.status }}</div>
                        </div>
                        <!-- <div class="button">
                          <el-button
                            class="el-button"
                            type="primary"
                            icon="el-icon-top"
                            size="mini"
                            @click="stationNotice(item2)"
                            >补入站通知</el-button
                          >
                          <el-button
                            class="el-button"
                            type="danger"
                            icon="el-icon-top"
                            size="mini"
                            @click="handleInStock(item2)"
                            >禁止入库</el-button
                          >
                          <el-button
                            class="el-button"
                            type="primary"
                            icon="el-icon-top"
                            size="mini"
                            @click="handleAllowIn(item2)"
                            >允许入库</el-button
                          >
                          <el-button
                            class="el-button"
                            type="primary"
                            icon="el-icon-top"
                            size="mini"
                            @click="handleStopInAndOut(item2)"
                            >库位禁用</el-button
                          >
                          <el-button
                            class="el-button"
                            type="primary"
                            icon="el-icon-top"
                            size="mini"
                            @click="handleAllowInAndOut(item2)"
                            >库位启用</el-button
                          >
                          <el-button
                            class="el-button"
                            type="danger"
                            icon="el-icon-shopping-cart-full"
                            size="mini"
                            @click="handleForceOutStock(item2)"
                            >强制出库</el-button
                          >
                          <el-button type="success" icon="el-icon-edit" size="mini" @click="handleUpdate(item2, i2)"
                            >修改</el-button
                          >
                        </div> -->
                        <div class="button">
                          <CrudOperation
                            :button-items="locationData.btnItems"
                            @toUpdate="handleUpdate(item2)"
                            @toAddBoxInSend="stationNotice(item2)"
                            @toStopIn="handleInStock(item2)"
                            @toAllowIn="handleAllowIn(item2)"
                            @toStopInAndOut="handleStopInAndOut(item2)"
                            @toAllowInAndOut="handleAllowInAndOut(item2)"
                            @toForceOutStockt="handleForceOutStock(item2)"
                          />
                        </div>
                      </div>
                      <li
                        slot="reference"
                        class="seat-item"
                        :style="{
                          'background-color': item2.color,
                          'width': item2.width + 'px',
                          'height': item2.height + 'px',
                          'line-height': item2.height + 'px'
                        }"
                      >
                        {{ item2.showText }}
                      </li>
                    </el-popover>
                    <li v-else :key="i2 + 'side'" class="side" />
                    <li v-if="i2 === item.cols.length - 1" :key="i2 + 'lastSide'" class="lastSide" />
                  </template>
                </template>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CrudOperation from '../../components/Crud/CRUD.operation.vue'
export default {
  name: 'Annular',
  components: { CrudOperation },
  mixins: [],
  props: {
    childEvent: { type: Function, default: () => {} },
    locationData: { type: Object, default: () => {} }, // 传入的布局位置数据
    locationCrud: { type: Object, default: () => {} },
    buttonsItem: { type: Array, default: () => [] }
  },
  data() {
    return {
      statusColor: '#999999',
      rowArr: [],
      firstNum: []
    }
  },
  computed: {
    tenSmall() {
      // return function(val){
      //   var count = 0;
      //   count =  val + this.locationData.areaHeight -val
      //   return count
      // }
      return function (item, val) {
        if (item.row < this.locationData.areaHeight + 1) {
          var count = 0
          var m = val % this.locationData.areaHeight
          count = this.locationData.areaHeight - m
          return count
        }
        if (item.row >= this.locationData.areaHeight + 1) {
          var count = 0
          var m = val % this.locationData.areaHeight
          if (m === 0) {
            m = this.locationData.areaHeight
          }
          count = this.locationData.areaHeight - m + 1
          return count
        }
      }
    }
  },
  watch: {},
  mounted() {},
  created() {},
  methods: {
    stationNotice(item) {
      this.$emit('stationNotice', item)
    },
    handleUpdate(item) {
      this.$emit('handleUpdate', item)
    },
    handleInStock(item) {
      this.$emit('handleInStock', item)
    },
    handleAllowIn(item) {
      this.$emit('handleAllowIn', item)
    },
    handleStopInAndOut(item) {
      this.$emit('handleStopInAndOut', item)
    },
    handleAllowInAndOut(item) {
      this.$emit('handleAllowInAndOut', item)
    },
    handleForceOutStock(item) {
      this.$emit('handleForceOutStock', item)
    },
    // stationNotice(){
    //       this.childEvent()
    //   },
    rowIf(val) {
      if (val >= this.locationData.areaHeight) {
        // let val = 0
        return (val = 0)
      }
    },
    // 序号跟随内容滚动
    rowsScroll(event) {
      this.$refs.seatTopRows.scrollLeft = event.target.scrollLeft
      this.$refs.orderBox.scrollTop = event.target.scrollTop
    },
    // 内容跟随序号滚动
    orderBoxScroll(event) {
      this.$refs.contentBox.scrollTop = event.target.scrollTop
    },
    // 获取状态颜色
    getStatusColor(type) {
      let colorStr = ''
      switch (type) {
        case '满库位':
          colorStr = '#ed9f1b'
          break
        case '禁用库位':
          colorStr = '#999999'
          break
        case '空库位':
          colorStr = '#3888EF'
          break
        case '仅可出':
          colorStr = '#B95EFF'
          break
        case '实托在库':
          colorStr = '#1BED83'
          break
        case '仅可入':
          colorStr = '#FF5EC8'
          break
        case '空托在库':
          colorStr = '#FFEA5E'
          break
        case '工装在库':
          colorStr = '#2DCEF0'
          break
        case '超时库位':
          colorStr = '#FF5E5E'
          break
        default:
          colorStr = '#999999'
          break
      }
      return colorStr
    }
  }
}
</script>
<style scoped>
.el-button + .el-button {
  margin-left: 0px !important;
}
</style>
<style scoped lang="scss">
.common-wrapper {
  height: 100%;
  background-color: #fffafa;
  // background-color: #ffffff00;
  z-index: 100;
  font-size: 12px;
}

html,
body {
  scroll-behavior: smooth;
}

.seat-wrap {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
}

.seat-order {
  ::-webkit-scrollbar {
    display: none;
  }

  .order-block {
    position: relative;
    min-width: 32px;
    height: 28px;
    margin: 5px 5px 12px;
    line-height: 18px;
    text-align: center;
  }

  .order-box {
    max-height: 520px;
    padding-bottom: 6px;
    overflow-x: hidden;
  }

  .order-side {
    padding: 0px 0px 0px 0px;
    width: 100%;
    height: 20px;
  }

  .order {
    position: relative;
    min-width: 32px;
    //height: 40px;
    border-radius: 3px;
    padding: 5px;
    line-height: 18px;
    font-size: 15px;
    color: #717f8f;
    text-align: center;
    border: 0px solid #000000;
  }
}

.rows {
  display: flex;
  justify-content: flex-start;
  z-index: 2;
}

.seat-item {
  // min-width: 32px;
  // height: 18px;
  border-radius: 3px;
  margin: 5px 5px;
  line-height: 18px;
  text-align: center;
  border: 0px solid #000000;
  overflow: hidden;
  white-space: nowrap;
  // text-overflow: ellipsis;
}

.serial-number {
  // min-width: 32px;
  height: 18px;
  margin: 5px 5px;
  line-height: 18px;
  text-align: center;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.seat-box ul.side {
  position: relative;
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 20px;
}

.seat-box li.side {
  min-width: 80px;
}

.lastSide {
  min-width: 80px;
}

.visualization-width {
  ::-webkit-scrollbar {
    display: none;
  }

  .seat-top-rows {
    display: flex;
    justify-content: flex-start;
    z-index: 2;
    max-width: 1280px;
    padding-bottom: 10px;
    overflow-y: hidden;
  }

  .seat-top-number {
    //min-width: 110px;
    height: 28px;
    padding: 5px;
    line-height: 28px;
    font-size: 15px;
    color: #717f8f;
    text-align: center;
  }

  .seat-top-number-last {
    min-width: 90px;
    height: 28px;
  }

  .seat-top-side {
    min-width: 80px;
  }
}

.visualization-height {
  max-height: 520px;
  max-width: 1280px;
  overflow: auto;
  position: relative;
}

.scroll-box {
  position: relative;
  width: auto;
  height: auto;
}

.visualization-height .divider-line-H {
  position: absolute;
  margin-top: 10px;
  max-width: 1280px;
}

.divider-line-V-box {
  position: absolute;
  width: 100%;
  height: 100%;
  padding-bottom: 10px;
  z-index: 1;
  display: flex;
  justify-content: left;

  li {
    list-style: none;
    height: 100%;
    margin-top: 5px;
  }

  .divider-line-v {
    height: 100%;
    margin-left: 14px;
  }
}

.rows-box {
  position: relative;
  width: 100%;
  z-index: 3;
}

.detail-box {
  width: 100%;
  height: auto;
  padding: 8px 8px 0px;

  .button {
    width: 100%;
    margin: 0 auto;
    display: flex;
    // align-items: center;
    // align-content: flex-start;
    flex-direction: row;
    justify-content: flex-end;
    flex-wrap: wrap;
    .el-button {
      width: 31%;
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }

  /deep/ .crud-opts-left {
    width: 100%;
    margin: 0 auto;
    display: flex;
    // align-items: center;
    // align-content: flex-start;
    flex-direction: row;
    justify-content: flex-end !important;
    flex-wrap: wrap;

    .el-button {
      width: 31% !important;
      margin: 0 0 5px 5px;
    }
  }

  .detail-item {
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 8px;

    .detail-title {
      width: 35%;
      font-size: 14px;
      color: #666666;
    }

    .detail-content {
      width: 65%;
      min-height: 30px;
      max-height: 40px;
      color: #5e6063;
      font-size: 16px;
      background-color: #e6edf6;
      padding: 6px;
      border-radius: 4px;
      overflow: auto;
    }
  }
}
</style>
