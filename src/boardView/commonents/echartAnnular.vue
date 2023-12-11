<template>
  <div class="echart-wrapper">
    <div class="title">
      <span class="title1">{{ title1 }}</span>
      <span class="title2">{{ title2 }}</span>
    </div>
    <div class="line">
      <div class="line-left" />
      <div class="line-middle" />
      <div class="line-right" />
    </div>
    <div class="annular-view">
      <div class="annularLeft-view">
        <div class="box">
          <div class="span-top">
            <span>{{ occupy.name }}</span>
            <div class="line line-background1" />
          </div>
          <div class="span-middle span-color1">
            <span>{{ occupyPrecent }}%</span>
          </div>
          <div class="span-bottom">
            <span>共{{ occupy.value }}个库位</span>
          </div>
        </div>
      </div>
      <div class="annularMiddle-view">
        <div class="circle-outBox">
          <div class="arcBox">
            <div class="arc1" />
          </div>
          <div class="circle-outBox2">
            <div class="circle-outBox3">
              <div class="arcBox2">
                <div class="arc2" />
              </div>
              <div class="arcBox3">
                <div class="arc3" />
              </div>
              <div class="arcBox4">
                <div class="arc4" />
              </div>
              <div class="dashed-circle">
                <div class="small-circle1">
                  <div class="small-circle2">
                    <div class="lineStyle top-line">
                      <div class="blue-block" />
                    </div>
                    <div class="lineStyle bottom-line">
                      <div class="blue-block" />
                    </div>
                    <div class="lineStyle right-line">
                      <div class="blue-block" />
                    </div>
                    <div class="lineStyle left-line">
                      <div class="blue-block" />
                    </div>
                    <div ref="myChart" class="myChartStyle" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="annularRight-view">
        <div class="box">
          <div class="span-top">
            <span>{{ unoccupied.name }}</span>
            <div class="line line-background2" />
          </div>
          <div class="span-middle span-color2">
            <span>{{ unoccupiedPrecent }}%</span>
          </div>
          <div class="span-bottom">
            <span>共{{ unoccupied.value }}个库位</span>
          </div>
        </div>
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
  mounted() {
    this.myChart = echarts.init(this.$refs.myChart)
    this.$nextTick(() => {
      this.initEchart(this.unoccupied, this.occupy)
    })
  },
  methods: {
    initEchart(unoccupied, occupy) {
      this.myChart.resize({ width: 200, height: 200 })
      this.myChart.setOption({
        backgroundColor: '#ffffff00',
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['41%', '50%'],
            avoidLabelOverlap: false,
            label: {
              // 饼图中间文字设置
              show: false,
              fontSize: '40',
              fontWeight: 'bold',
              position: 'center',
              color: '#2D62A7',
              formatter: params => {
                this.unoccupiedPrecent = 100 - params.percent
                this.occupyPrecent = params.percent
                return `{valStyle|${params.percent}}{tStyle|%} \n {txtStyle|总累计占比}`
              },
              rich: {
                valStyle: {
                  color: '#2D62A7',
                  fontSize: '44',
                  fontWeight: 'bold'
                },
                tStyle: {
                  color: '#2D62A7',
                  fontSize: '20',
                  padding: [10, 2, 2, 5]
                },
                txtStyle: {
                  color: '#2DA777',
                  fontSize: '14'
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
                value: unoccupied.value,
                name: unoccupied.name,
                itemStyle: {
                  color: {
                    // 完成的圆环的颜色
                    colorStops: [
                      {
                        offset: 0,
                        color: '#2D62A7' // 0% 处的颜色
                      },
                      {
                        offset: 0.5,
                        color: '#2D62A7' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#2D62A7' // 100% 处的颜色
                      }
                    ]
                  }
                }
              },
              {
                value: occupy.value,
                name: occupy.name,
                itemStyle: {
                  color: {
                    // 完成的圆环的颜色
                    colorStops: [
                      {
                        offset: 0,
                        color: '#2DA777' // 0% 处的颜色
                      },
                      {
                        offset: 0.5,
                        color: '#2DA777' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#2DA777' // 100% 处的颜色
                      }
                    ]
                  }
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

.title {
  position: relative;
  margin-left: 0px;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 100%;
  overflow-y: hidden;
  .title1 {
    font-size: 18px;
    color: transparent;
    background-image: linear-gradient(0deg, #cbe7ff, #dcefff 40%, #f4f7f9);
    background-clip: text;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-weight: bold;
  }
  .title2 {
    display: inline-block;
    position: relative;
    bottom: -3px;
    color: #7797b9;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-size: 12px;
    font-weight: bold;
    margin-left: -10px;
    -webkit-transform: scale(0.82);
    transform: scale(0.82);
  }
}
.line {
  position: relative;
  width: 100%;
  height: 4px;
  margin-top: 5px;
  .line-left {
    position: absolute;
    top: -1px;
    left: 0px;
    width: 18px;
    height: 4px;
    background-color: #254d7e;
  }
  .line-middle {
    margin-top: 0px;
    width: 100%;
    border: 0.5px solid #254d7e;
  }
  .line-right {
    position: absolute;
    top: -1px;
    right: 0px;
    width: 18px;
    height: 4px;
    background-color: #254d7e;
  }
}
.annular-view {
  width: 600px;
  height: 260px;
  display: flex;
  justify-content: center;
  .annularLeft-view {
    margin: 0 auto;
    width: 180px;
    height: 100%;
  }
  .annularMiddle-view {
    margin: 0 auto;
    width: 225px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .circle-outBox {
      position: relative;
      width: 215px;
      height: 215px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      .circle-outBox2 {
        position: relative;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        border: 1px solid #122030;
        display: flex;
        justify-content: center;
        align-items: center;
        .circle-outBox3 {
          position: relative;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          .arcBox2 {
            position: absolute;
            top: 20px;
            right: -5px;
            width: 60px;
            height: 75px;
            overflow: hidden;
            .arc2 {
              position: relative;
              top: -20px;
              right: 123px;
              width: 180px;
              height: 180px;
              border-radius: 50%;
              border: 1px solid #1c385c;
            }
          }
          .arcBox3 {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 60px;
            height: 60px;
            overflow: hidden;
            .arc3 {
              position: relative;
              top: 0px;
              left: 0px;
              width: 180px;
              height: 180px;
              border-radius: 50%;
              border: 1px solid #1c385c;
            }
          }
          .arcBox4 {
            position: absolute;
            bottom: -1px;
            left: 0px;
            width: 120px;
            height: 60px;
            overflow: hidden;
            .arc4 {
              position: relative;
              bottom: 120px;
              left: 0px;
              width: 180px;
              height: 180px;
              border-radius: 50%;
              border: 1px solid #1c385c;
            }
          }
        }
        .dashed-circle {
          width: 140px;
          height: 140px;
          margin: 20px auto;
          border-radius: 50%;
          border: 1px dashed #1c385c;
          .small-circle1 {
            width: 130px;
            height: 130px;
            margin: 4.2px auto;
            border-radius: 50%;
            border: 1px solid #1c385c;
          }
          .small-circle2 {
            position: relative;
            margin: 9.3px auto;
            width: 110px;
            height: 110px;
            border-radius: 50%;
            border: 1px solid #202f44;
            display: flex;
            justify-content: center;
            align-items: center;
            .lineStyle {
              position: absolute;
              width: 1px;
              height: 23px;
              background-color: #202f44;
              .blue-block {
                position: absolute;
                top: -2px;
                left: -0.55px;
                width: 2px;
                height: 3.5px;
                background-color: #2d62a7;
              }
            }
            .top-line {
              top: -5px;
              left: 54px;
            }
            .bottom-line {
              bottom: -5px;
              left: 54px;
              transform: rotate(180deg);
            }
            .right-line {
              top: 40px;
              right: 6px;
              transform: rotate(90deg);
            }
            .left-line {
              top: 40px;
              left: 6px;
              transform: rotate(-90deg);
            }
          }
        }
      }
      .arcBox {
        position: absolute;
        right: 0px;
        top: 0px;
        width: 110px;
        height: 188px;
        overflow: hidden;
        background-color: #fff00000;
        .arc1 {
          position: relative;
          top: 0px;
          left: -105px;
          width: 215px;
          height: 215px;
          border-radius: 50%;
          border: 1px solid #1c385c;
        }
      }
    }
  }
  .annularRight-view {
    margin: 0 auto;
    width: 180px;
    height: 100%;
  }

  .myChartStyle {
    width: 200px;
    height: 200px;
    background-color: #ffffff00;
  }

  .box {
    margin: 60px auto;
    width: 120px;
    height: 145px;
    border: 1px solid #193455;
    padding: 15px;
    .span-top {
      position: relative;
      text-align: center;
      .line {
        position: absolute;
        left: 6px;
        bottom: -6px;
        width: 14px;
        height: 3px;
      }
      span {
        color: #e1e0e1;
        font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
        font-size: 15px;
        font-weight: 500;
      }
    }
    .span-middle {
      text-align: center;
      padding-top: 16px;
      padding-bottom: 13px;
      span {
        font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
        font-size: 36px;
        font-weight: bold;
      }
    }
    .span-bottom {
      text-align: center;
      span {
        color: #e1e0e1;
        font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
        font-size: 8px;
        font-weight: 500;
      }
    }
    .line-background1 {
      background-color: #2da777;
    }
    .span-color1 {
      color: #2da777;
    }

    .line-background2 {
      background-color: #2d62a7;
    }
    .span-color2 {
      color: #2d62a7;
    }
  }
}
</style>
