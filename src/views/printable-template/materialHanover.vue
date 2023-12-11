<template>
  <div class="page">
    <table cellspacing="0" cellpadding="0" class="table">
      <thead>
        <tr class="col_design">
          <td style="width: 11mm" />
          <td style="width: 26mm" />
          <td style="width: 29mm" />
          <td style="width: 21mm" />
          <td style="width: 36mm" />
          <td style="width: 18mm" />
          <td style="width: 41mm" />
          <td style="width: 29mm" />
          <td style="width: 21mm" />
          <td style="width: 22mm" />
          <td style="width: 37mm" />
        </tr>
        <tr>
          <td colspan="11" class="main-title">
            <img src="../../../static/image/common/logo.png" class="logo" />
            物料交接清单
            <span class="top-right"> 版次：A3 <br />表单编号：LYH-D-WLC-008</span>
          </td>
        </tr>
        <tr class="top-title">
          <td colspan="3" style="border-bottom: none !important">配送区域：{{ thead.deliveryArea }}</td>
          <td colspan="3" style="border-top: none !important; border-bottom: none !important">
            物料类别：{{ thead.materialType }}
          </td>
          <td colspan="3" style="border-top: none !important; border-bottom: none !important">
            发出区域：{{ thead.initialArea }}
          </td>
          <td colspan="2" rowspan="2" style="border-top: none !important; border-bottom: none !important">
            条码：
            <img id="barcode" class="barcode" />
          </td>
        </tr>
        <tr>
          <td colspan="3" rowspan="2">交接人签名：</td>
          <td colspan="3" rowspan="2">发料人签名：</td>
          <td colspan="3" rowspan="2">项目接收人签名：</td>
        </tr>
        <tr>
          <td>交接清单号</td>
          <td>{{ thead.orderID }}</td>
        </tr>
        <tr class="td-title">
          <td>序号</td>
          <td>托盘编号</td>
          <td>批次号</td>
          <td>工位号</td>
          <td>物料编号</td>
          <td>数量</td>
          <td>物料描述</td>
          <td>物料条码</td>
          <td>ECN号</td>
          <td>项目现场交接数量</td>
          <td>交接点交接数量</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td style="text-align: center">{{ index + 1 }}</td>
          <td>{{ item.boxID }}</td>
          <td>{{ item.batchID }}</td>
          <td>{{ item.stationID }}</td>
          <td>{{ item.materialID }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.materialDesc }}</td>
          <td>{{ item.barcode }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.quantity }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="tb-footer">
          <td colspan="11">
            <div style="float: left">制单人：</div>
            清单打印时间 :
            {{ nowadays | formatDateTime }}
          </td>
        </tr>
      </tfoot>
    </table>
    <div class="footer-page">第{{ currentPage }}页，共{{ page }}页</div>
    <div style="page-break-after: always" />
  </div>
</template>
<script>
import jsbarcode from 'jsbarcode'
export default {
  name: 'MaterialHandover',
  props: {
    data: { type: Array, default: () => [] },
    page: { type: Number, default: 1 },
    currentPage: { type: Number, default: 1 },
    thead: { type: Object, default: () => {} }
  },
  computed: {
    nowadays() {
      return Date()
    }
  },
  mounted() {
    this.creatBarCode()
  },
  methods: {
    creatBarCode() {
      jsbarcode('#barcode', this.thead.orderID, { width: 2, displayValue: false })
    }
  }
}
</script>
<style scoped>
/* 需与打印样式同步 */
html,
body {
  padding: 0;
  margin: 0;
}
.logo {
  width: 10mm;
  position: absolute;
  left: 2mm;
  top: 1mm;
}
.page {
  width: 294mm;
  page-break-after: always;
}
table {
  position: relative;
  margin: auto;
  border-collapse: collapse;
  font-family: 宋体;
  font-size: 10pt;
  table-layout: fixed;
  word-break: break-all;
  page-break-after: always;
}
.table td {
  text-align: left;
  height: 10mm;
  border: 1px solid #000;
  padding: 0 3px;
}
.table tr {
  height: 10mm;
}
.td-title td {
  text-align: center;
  height: 14mm !important;
}
.top-title td {
  height: 14mm;
}
.barcode {
  height: 16mm;
  position: absolute;
  top: 17mm;
}
.main-title {
  height: 12mm !important;
  font-size: 16pt;
  font-weight: bold;
  text-align: center !important;
  line-height: 12mm;
  border: none !important;
  border-bottom: 1px solid;
}
.top-right {
  text-align: left;
  font-size: 9pt;
  font-weight: normal;
  position: absolute;
  right: 1mm;
  line-height: 4mm;
}
.col_design {
  height: 0 !important;
}
.col_design td {
  height: 0 !important;
  visibility: hidden;
  border: none;
}
.tb-footer td {
  line-height: 7mm;
  text-align: right;
  border: none;
}
.footer-page {
  font-family: 宋体;
  font-size: 10pt;
  margin: 2mm auto;
  text-align: center;
}
</style>
