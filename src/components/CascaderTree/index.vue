<template>
  <div>
    <el-cascader
      v-if="item.type === 'Cascader' && !item.isHide"
      ref="departList"
      v-model="cascaderData"
      :options="item.options"
      :placeholder="item.placeholder ? item.placeholder : '请选择' + item.label"
      :disabled="item.disabled || false"
      :collapse-tags="item.collapse || false"
      :show-all-levels="item.showAllLevels !== undefined ? item.showAllLevels : true"
      filterable
      clearable
      :style="'width:' + (item.width || '100%')"
      :props="
        item.propsConfig || {
          value: item.valueProp || 'id', //选择值对应的prop，原框架默认value
          expandTrigger: item.expandTrigger || 'click', // 次级菜单的展开方式/hover
          emitPath: item.emitPath || false, // 选中值|true：数组,false:字符串-该节点的值
          multiple: item.multiple || false, // 是否多选
          // 是否严格的遵守父子节点不互相关联 |单选时,true只能选最后一级,false可选选择任意一级
          checkStrictly: item.checkStrictly !== undefined ? item.checkStrictly : true,
          lazy: item.lazy !== undefined ? item.lazy : true, // 是否动态加载子节点
          lazyLoad(node, resolve) {
            // 加载动态数据的方法
            lazyLoadOpts(node, node)
            resolve(node)
          }
        }
      "
    />
  </div>
</template>
<script>
export default {
  props: {
    item: { type: Object, default: () => {} }, // 表格对应列对象
    formData: { type: Object, default: () => {} }, // 表格对应行、列对象， $index：对应行的索引、row:对应行的值、column：对应列的信息
    lazyLoadOpts: { type: Function, default: () => {} } // 级联选择器数据动态加载方法
  },
  data() {
    return {
      flag: 0
    }
  },
  computed: {
    cascaderData: {
      get() {
        let arr
        if (this.flag === 0 && this.formData[this.item.prop] !== undefined) {
          // arr = JSON.parse(JSON.stringify(this.formData[this.item.prop]))
          // arr = this.formData[this.item.prop]
          // this.flag = 1
        }
        return arr
      },
      set(val) {
        // console.log('【set】val', val)
        let data = []
        data = this.setData()
        this.formData[this.item.prop] = data
        console.log('【set】this.formData[this.item.prop]', this.formData[this.item.prop])
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 待定
    getB(val) {
      console.log(val)
      console.log('[get]', this.$refs)
      if (this.$refs.departList !== undefined) {
        console.log(this.$refs)
        let CheckedNodes = this.$refs.departList.getCheckedNodes()
        console.log(CheckedNodes)
        console.log('CheckedNodes', CheckedNodes)
      }
    },
    setData(val, item) {
      let arr = []
      console.log(this.$refs)
      let CheckedNodes = this.$refs.departList.getCheckedNodes()
      console.log(CheckedNodes)
      //  过滤出子级全选则只保留父级值, 子级未全选则保留子级值
      // （有父级且父级被选相反--没有父级或者父级未被选（父级子项未全选））
      CheckedNodes = CheckedNodes.filter(option => !(option.parent && option.parent.checked))
      console.log('CheckedNodes', CheckedNodes)
      CheckedNodes.forEach(item => {
        arr.push(item.value)
        console.log(item.label)
      })
      return arr
    }
  }
}
</script>
<style>
</style>
