<template>
  <div class="app-container">
    <el-card class="card_left" />
    <el-card class="card_right">
      <div class="contentGrid">
        <div class="content_left">
          <div class="block" />
          <div v-for="(item,index) in dataList.row" class="y">{{ item }}</div>
        </div>
        <div class="content_right">
          <div class="seat">
            <div v-for="(item,index) in dataList.col" class="x">{{ item }}</div>
          </div>
          <div class="seatBox">
            <div v-for="(item1,index) in dataList.list" v-if="dataList.row.includes(item1.row)" :key="index" class="box" />
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { API } from '@/api/generalAPI'
import LineChart from './module/LineChart'
import filterContainer from '@/mixins/filterContainer'
// import basics from '@/mixins'
export default {
  name: 'LoctationChart',
  components: { LineChart },
  mixins: [filterContainer],
  data() {
    return {
      API,
      listQuery: {
        WarehouseID: '',
        Alley: 0,
        Row: 0
      },
      // 座位状态数组
      dataList: {
        row: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        col: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        list: [
          {location: 1 - 1, type: 0, row: 1, col: 1},
          {location: 1 - 2, type: 0, row: 1, col: 2},
          {location: 1 - 3, type: 0, row: 1, col: 3},
          {location: 1 - 4, type: 0, row: 1, col: 4},
          {location: 1 - 5, type: 0, row: 1, col: 5},
          {location: 1 - 6, type: 0, row: 1, col: 6},
          {location: 1 - 7, type: 0, row: 1, col: 7},
          {location: 1 - 8, type: 0, row: 1, col: 8},
          {location: 1 - 9, type: 0, row: 1, col: 9},
          {location: 1 - 10, type: 0, row: 1, col: 10},
          {location: 2 - 1, type: 0},
          {location: 2 - 2, type: 1},
          {location: 2 - 3, type: 1},
          {location: 2 - 4, type: 1},
          {location: 2 - 5, type: 1},
          {location: 2 - 6, type: 1},
          {location: 3 - 1, type: 1},
          {location: 4 - 1, type: 1},
          {location: 2 - 5, type: 1},
          {location: 2 - 6, type: 1},
          {location: 2 - 7, type: 1}
        ]
      },
      status: [{color: '#ff8c00', statu: '空闲'}, {color: '#e9967a', statu: '空盘'}, {color: '#ff7f50', statu: '待测OCV8'}, {color: '#483d8b', statu: '待测OCV9'},
        {color: '#9932cc', statu: '成品'}, {color: '#6495ed', statu: '返修包'}, {color: '#8fbc8b', statu: '锁定库位'}],
      lineChartData: {
        hours: [
          '1列', '2列', '3列', '4列', '5列', '6列',
          '7列', '8列', '9列', '10列', '11列', '12列',
          '13列', '14列', '15列', '16列', '17列', '18列',
          '19列', '20列', '21列', '22列', '23列', '24列'
        ],
        days: [
          '1层', '2层', '3层',
          '4层', '5层', '6层', '7层'
        ],
        data: [[0, 0, 5], [0, 1, 1], [1, 1, 6], [2, 1, 4], [3, 1, 6], [4, 2, 2], [5, 5, 3], [6, 4, 3],
          [7, 0, 0], [8, 4, 0], [9, 4, 2], [10, 4, 3], [11, 5, 4], [12, 6, 4], [13, 6, 5], [14, 6, 6], [15, 5, 6], [16, 6, 2]]
      }
    }
  },
  created() {
    for (let i = 0; i < this.list.length; i++) {
      // if(row=)
      this.list[i].location
    }
    // this.getList()
    this.lineChartData.data.map((item) => {
      // console.log([item[1], item[0], item[2] || '-'])
      return [item[1], item[0], item[2] || '-']
    })
  },
  methods: {
    // 点击座位的时候切换图片。
    clickzuowei(val) {
      console.log(val, '座位信息')
      // 循环影厅内座位信息
      this.cinemaInfo.seatList.forEach((item) => {
        // 判断：选中座位和数组内的id是否一致
        if (item.id == val.id) {
          // 一致就判断他的状态是不是0,0代表未选中，如果是未选中，那就改为1,1就是选中状态。
          if (item.type == 0) {
            item.type = 1
            // 如果状态是1，也就是已经选中的状态，点击就会变成未选中
          } else if (item.type == 1) {
            item.type = 0
            // 如果状态2，也就是已经出售的座位，就提示从新选座
          } else if (item.type == 2) {
            alert('此座位已出售，请从新选座')
            // 如果状态3，代表座位损坏，也是提示维修中。
          } else if (item.type == 3) {
            alert('此座位损坏，正在维修中！')
          }
        }
      })
    },
    // 状态颜色
    colorChange(color) {
      let text = 'background:' + color
      return text
    },
    getList() {
      let data = {
        WarehouseID: 'Pack',
        Alley: 0,
        Row: 0
      }
      API.dataGet('Customer', data, 'GetLocationDetailList').then(res => {
        console.log(res)
      })
    }
  }
}
</script>
  <style scoped>
  .app-container{
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
  }
  .card_left{
    width: 30%;
  }
  .card_right{
    width: 70%;
  }
  .card_right .content .x, .text{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .grid{
    width: 30px;
    height: 30px;
    margin-left: 10px;
    background-color: blueviolet;
  }
  .seatClass {
  position: absolute;
}
.box {
  position: relative;
  margin-top: 40px;
}
.seatImgClass {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
}

.contentGrid{
  display: flex;
  /* align-items: center; */
  align-content: center;
  justify-content: flex-start;
}
.contentGrid .content_left{
  width: 50px;
}
.content_left .block,.y{
  width: 42px;
  height: 28px;
  margin: 5px;
  line-height: 28px;
}
.content_right{
 flex:1;
}
.content_right .seat{
  width: 100%;
  height: 28px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.content_right .x{
  width: 42px;
  height: 28px;
  text-align: center;
  margin: 5px;
}
.seatBox{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.seatBox .box{
  width: 42px;
  height: 28px;
  margin: 5px;
  border-radius: 3px;
  background-color: rgb(153, 153, 153);
}
  </style>
