<template>
  <div>
    <el-cascader
      v-model="dataArr"
      :options="item.options"
      :props="{ expandTrigger: 'hover' }"
      clearable
      filterable
      @change="item.change ? item.change(formData.$index, formData.row[item.prop]) : ''"
    />
  </div>
</template>
<script>
export default {
  props: {
    item: { type: Object, default: () => {} }, // 表格对应列对象
    formData: { type: Object, default: () => {} } // 表格对应行、列对象， $index：对应行的索引、row:对应行的值、column：对应列的信息
  },
  data() {
    return {}
  },
  computed: {
    /** dataArr：组件内选中值对应数组,
     *  this.formData.row[this.item.prop]表格内值对应字符串,
     *  数组与字符串相互转换 */
    dataArr: {
      get() {
        // 获取该项字符串值，以斜杠截取转换为数组
        let arr
        if (this.formData.row[this.item.prop]) {
          arr = this.formData.row[this.item.prop].split('/')
        }
        return arr
      },
      set(val) {
        // 获取该项数组值，以斜杠拼接转换为字符串，赋值于提交值
        let data = ''
        if (val) {
          data = val.join('/')
        }
        this.formData.row[this.item.prop] = data
      }
    }
  },
  created() {},
  mounted() {}
}
</script>
<style>
</style>
