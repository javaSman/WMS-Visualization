<template>
  <div class="echart-wrapper">
    <div class="annular-view">
      <div class="chart-view">
        <div class="inner-circle">
          <div class="line" />
        </div>
        <div id="chart" ref="myChart" class="myChartStyle" />
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts'

export default {
  name: 'Annular',
  components: {},
  mixins: [],
  props: {
    echartData: { type: Object, default: () => {}},
    initSwitch: { type: Number, default: 0 },
    title1: { type: String, default: null },
    title2: { type: String, default: null },
    unoccupied: { type: Object, default: () => {} },
    occupy: { type: Object, default: () => {} }
  },
  data() {
    return {
      unoccupiedPrecent: '',
      occupyPrecent: ''
    }
  },
  watch: {
    initSwitch() {
      this.initEchart(this.unoccupied, this.occupy)
    }
  },
  beforeDestroy() {
    if (!this.myChart) {
      return
    }
    this.myChart.dispose()
    this.myChart = null
  },
  created() {
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.myChart)
    this.$nextTick(() => {
      this.initEchart(this.unoccupied, this.occupy)
    })
    // this.$nextTick(() => {
    //     this.initChart(this.echartData.unoccupied,this.echartData.occupy)
    //   })
  },
  methods: {
    initEchart(unoccupied, occupy) {
      this.myChart.resize({ width: 200, height: 200 })
      // document.getElementById('chart').removeAttribute('echarts_instance');
      this.myChart.setOption({
        backgroundColor: '#ffffff00',
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['38%', '50%'],
            avoidLabelOverlap: false,
            itemStyle: {
              // 图形样式
              normal: {
                borderColor: '#ffffff',
                borderWidth: 2
              }
            },
            label: {
              // 饼图中间文字设置
              // show: false,
              formatter: params => {
                this.unoccupiedPrecent = 100 - params.percent
                this.occupyPrecent = params.percent
                let str = ''
                if (params.data.name === unoccupied.name) {
                  str = `{valStyle2|${params.percent.toFixed(1)}%}`
                } else {
                  str = `{valStyle|${params.percent.toFixed(1)}%}`
                }
                return str
              },
              position:'inner', 
              rich: {
                valStyle: {
                  color: '#3888EF',
                  fontSize: '14',
                  // padding: [0, -30, 0, 0]
                },
                valStyle2: {
                  color: '#1BED83',
                  fontSize: '14',
                  // padding: [0, 0, 0, -30]
                }
              }
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {
                value: occupy.value,
                name: occupy.name,
                formatter: params => {
                  this.unoccupiedPrecent = 100 - params.percent
                  this.occupyPrecent = params.percent
                  let str = ''
                  if (params.data.name === unoccupied.name) {
                    str = `{valStyle2|${params.percent}%}`
                  } else {
                    str = `{valStyle|${params.percent}%}`
                  }
                  return str
                },
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: '#CEE1FB'
                    },
                    {
                      offset: 1,
                      color: '#3888EF'
                    }
                  ])
                }
              },
              {
                value: unoccupied.value,
                name: unoccupied.name,
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: '#C4FADF'
                    },
                    {
                      offset: 1,
                      color: '#1BED83'
                    }
                  ])
                }
              }
            ]
          }
        ]
      })
    }
  }
}
</script>

<style scoped lang="scss">
.echart-wrapper {
  width: 100%;
  height: 100%;
  background-color: #ffffff00;
  z-index: 100;
  overflow: auto;
  font-size: 12px;
}
.annular-view {
  width: 330px;
  height: 480px;
  display: flex;
  justify-content: center;
  .chart-view {
    position: relative;
    width: 106px;
    height: 106px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 5px 5px 20px 10px #f1f7fd;
    display: flex;
    justify-content: center;
    align-items: center;
    .inner-circle {
      position: absolute;
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background-color: #f1f7fd;
      display: flex;
      align-items: center;
      justify-content: center;
      .line {
        width: 63px;
        height: 63px;
        border-radius: 50%;
        border: 1px dashed #898a8b;
      }
    }
  }
}
</style>
