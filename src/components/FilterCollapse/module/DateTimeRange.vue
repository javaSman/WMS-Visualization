<template>
  <div>
    <!--
     日期时间范围选择器，用于需要选 开始结束 日期及时间
     1、dataArr=[] 原组件内绑定值 - 选中日期时间数组
     2、查询栏/表单 使用分别的两个prop
        开始日期时间prop - startProp
        开始日期时间prop - endProp
    -->
    <el-date-picker
      v-model="dataArr"
      type="datetimerange"
      :style="item.formStyle || item.filterStyle || 'width:' + filterWidth + 'px'"
      :range-separator="item.separatorStr || '至'"
      :value-format="item.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
      :format="item.labelFormat || 'yyyy-MM-dd HH:mm:ss'"
      :start-placeholder="item.startPlaceholder || '开始日期'"
      :end-placeholder="item.endPlaceholder || '结束日期'"
      :default-time="item.defaultTime || ['00:00:00', '23:59:59']"
      :picker-options="item.pickerOpts || ''"
      @change="item.change ? item.change(formData[item.prop]) : handleFilter()"
    />
  </div>
</template>
<script>
export default {
  name: 'DateTimeRange',
  props: {
    /** 单条目配置数据 */
    item: { type: Object, default: () => {} },
    /** 查询项输入栏宽度（统一） */
    filterWidth: { type: Number, default: 160 },
    /** 表单数据 */
    formData: { type: Object, default: () => {} }
  },
  data() {
    return {
      arr: []
    }
  },
  computed: {
    /** dataArr：组件内选中值对应【数组】,arr=['yyyy-MM-dd HH:mm:ss','yyyy-MM-dd HH:mm:ss']
     *  表单传值对应两个字符串
     *  this.formData[this.item.startProp]- 对应开始时间,查询传值yyyy-MM-dd HH:mm:ss
     *  this.formData[this.item.endProp]- 对应结束时间,查询传值yyyy-MM-dd HH:mm:ss
     *  数组与两个对象中属性转换
     * */
    dataArr: {
      get() {
        let arr = []
        if (this.formData[this.item.startProp] && this.formData[this.item.endProp]) {
          arr[0] = this.formData[this.item.startProp]
          arr[1] = this.formData[this.item.endProp]
        } else {
          arr = []
        }
        return arr
      },
      set(val) {
        if (val === null) {
          this.$set(this.formData, this.item.startProp, null)
          this.$set(this.formData, this.item.endProp, null)
        } else {
          this.$set(this.formData, this.item.startProp, val[0])
          this.$set(this.formData, this.item.endProp, val[1])
        }
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    /** 搜索事件 */
    handleFilter() {
      this.$emit('handleFilter')
    }
  }
}
</script>
<style>
</style>
