<template>
  <!--
     日期范围选择器，用于开始结束日期，开始和结束添加时间大小判断提示
     1、查询栏/表单 分别的两个prop
        开始日期prop - startProp
        结束日期prop - endProp
  -->
  <div class="filter-item">
    <el-date-picker
      v-model="formData[item.startProp]"
      :style="item.formStyle || item.filterStyle || 'width:' + filterWidth + 'px'"
      :placeholder="item.placeholder || '请选择'"
      :type="item.dateType || 'date'"
      :value-format="item.valueFormat || 'yyyy-MM-dd'"
      :format="item.labelFormat || 'yyyy-MM-dd'"
      :picker-options="item.pickerOpts || ''"
      :default-time="item.startDefaultTime || '00:00:00'"
      @change="dataRangeChange(item, 'start')"
    />
    <span>{{ item.separatorStr || '至' }}</span>
    <el-date-picker
      v-model="formData[item.endProp]"
      :style="item.formStyle || item.filterStyle || 'width:' + filterWidth + 'px'"
      :placeholder="item.placeholder || '请选择'"
      :type="item.dateType || 'date'"
      :value-format="item.valueFormat || 'yyyy-MM-dd'"
      :format="item.labelFormat || 'yyyy-MM-dd'"
      :picker-options="item.pickerOpts || ''"
      :default-time="item.endDefaultTime || '23:59:59'"
      @change="dataRangeChange(item, 'end')"
    />
  </div>
  <!-- :placeholder="setSelectText(item)"
      @change="item.change ? item.change(formData[item.prop]) : handleFilter()"
  -->
</template>
<script>
export default {
  name: 'DateRangePart',
  props: {
    /** 单条目配置数据 */
    item: { type: Object, default: () => {} }, //
    /** 查询项输入栏宽度（统一） */
    filterWidth: { type: Number, default: 160 }, //
    /** 表单数据 */
    formData: { type: Object, default: () => {} }
  },
  data() {
    return {
      arr: []
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    /** 搜索事件 */
    handleFilter() {
      this.$emit('handleFilter')
    },
    /** 日期选择器 选定的值时触发，判断开始时间是否大于结束时间，并提示 */
    dataRangeChange(item, param) {
      let startTime = new Date(this.formData[item.startProp]).getTime()
      let endTime = new Date(this.formData[item.endProp]).getTime()
      if (startTime > endTime && startTime !== 0 && endTime !== 0) {
        if (param === 'start') {
          this.$message({
            message: '开始时间不能大于结束时间',
            type: 'warning'
          })
        } else {
          this.$message({
            message: '结束时间不能小于开始时间',
            type: 'warning'
          })
        }
      } else {
        this.handleFilter()
      }
    }
  }
}
</script>
<style>
</style>
