<template>
  <div>
    <!-- 模糊查询输入框-清除时调查询事件 -->
    <el-input
      v-if="item.type === 'Blur' && !item.isHide"
      v-model="listQuery[item.prop]"
      class="filter-item"
      :placeholder="setInputText(item)"
      :style="item.filterStyle || 'width:240px'"
      :prefix-icon="item.leftIcon"
      clearable
      @clear="handleFilter"
      @keyup.enter.native="handleFilter"
    >
      <el-button
        slot="suffix"
        type="text"
        style="padding: 0"
        :icon="item.rightIcon || 'el-icon-search'"
        @click="handleFilter"
      />
    </el-input>
    <!-- 输入框 -->
    <el-input
      v-if="item.type === 'Input' && !item.isHide"
      v-model="listQuery[item.prop]"
      class="filter-item"
      :placeholder="setInputText(item)"
      :style="item.filterStyle || 'width:' + filterWidth + 'px'"
      :suffix-icon="item.rightIcon"
      :prefix-icon="item.leftIcon"
      clearable
      @clear="handleFilter"
      @keyup.enter.native="handleFilter"
    />
    <!-- 下拉框单选 -->
    <el-select
      v-if="item.type === 'Select' && !item.isHide"
      v-model="listQuery[item.prop]"
      class="filter-item"
      :placeholder="setSelectText(item)"
      :style="item.filterStyle || 'width:' + filterWidth + 'px'"
      :clearable="item.clearable !== undefined ? item.clearable : true"
      filterable
      @change="item.change ? item.change(listQuery[item.prop]) : handleFilter()"
    >
      <el-option v-for="op in item.options" :key="op.value" :label="op.label" :value="op.value" />
    </el-select>
    <!-- 下拉框多选-selects-存储选中数据 -->
    <el-select
      v-if="item.type === 'Selects' && !item.isHide"
      v-model="selects[item.prop]"
      class="filter-item selects"
      :style="item.filterStyle || 'width:' + filterWidth + 'px'"
      :collapse-tags="item.collapse !== undefined ? item.collapse : true"
      multiple
      filterable
    >
      <el-option v-for="op in item.options" :key="op.value" :label="op.label" :value="op.value" />
    </el-select>
    <!-- 级联选择器 -->
    <el-cascader
      v-if="item.type === 'Cascader' && !item.isHide"
      v-model="listQuery[item.prop]"
      class="filter-item"
      :style="item.filterStyle || 'width:' + filterWidth + 'px'"
      :options="item.options"
      :placeholder="setSelectText(item)"
      :collapse-tags="item.collapse || false"
      :show-all-levels="item.showAllLevels !== undefined ? item.showAllLevels : true"
      filterable
      clearable
      :props="
        item.propsConfig || {
          value: item.valueProp || 'id', //选择值对应的prop，原框架默认value
          expandTrigger: item.expandTrigger || 'click', // 次级菜单的展开方式/hover
          emitPath: item.emitPath || false, // 选中值|true：数组,false:字符串-该节点的值
          multiple: item.multiple || false, // 是否多选
          // 是否严格的遵守父子节点不互相关联 |单选时,true只能选最后一级,false可选选择任意一级
          checkStrictly: item.checkStrictly !== undefined ? item.checkStrictly : false,
          lazy: item.lazy !== undefined ? item.lazy : true, // 是否动态加载子节点
          lazyLoad(node, resolve) {
            // 加载动态数据的方法
            lazyLoadOpts(node, node)
            resolve(node)
          }
        }
      "
      @change="item.change ? item.change(listQuery[item.prop]) : ''"
    />
    <!-- 树级下拉列表 -->
    <treeselect
      v-if="item.type === 'TreeSelect' && !item.isHide"
      v-model="listQuery[item.prop]"
      class="filter-item treeSelect"
      :append-to-body="true"
      :multiple="item.multiple ? item.multiple : false"
      :options="item.options"
      :load-options="loadOptions"
      :placeholder="setSelectText(item)"
      :style="item.filterStyle || 'width:' + filterWidth + 'px'"
      no-results-text="无匹配数据"
      no-options-text="无数据"
      no-children-text="无数据"
      @input="item.change ? item.change(listQuery[item.prop]) : handleFilter()"
    />
    <!-- 待确认 -->
    <!-- 日期起始范围选择 -->
    <!-- <div v-if="item.type === 'DateRange' && !item.isHide" class="filter-item">
      <el-date-picker
        v-model="listQuery[item.startProp]"
        :placeholder="setSelectText(item)"
        :style="item.filterStyle || 'width:'+filterWidth + 'px'"
        value-format="yyyy-MM-dd"
        @change="dataRangeChange(item,'start')"
      />
      <span>至</span>
      <el-date-picker
        v-model="listQuery[item.endProp]"
        :style="item.filterStyle || 'width:'+filterWidth + 'px'"
        :placeholder="setSelectText(item)"
        value-format="yyyy-MM-dd"
        @change="dataRangeChange(item,'end')"
      />
    </div> -->

    <!-- 日期选择器-单个时间prop-date -->
    <el-date-picker
      v-if="item.type === 'DateTime' && !item.isHide"
      v-model="listQuery[item.prop]"
      :style="item.filterStyle || 'width:' + filterWidth + 'px'"
      :placeholder="setSelectText(item)"
      :type="item.dateType || 'date'"
      :value-format="item.valueFormat || 'yyyy-MM-dd'"
      :format="item.labelFormat || 'yyyy-MM-dd'"
      @change="item.change ? item.change(listQuery[item.prop]) : handleFilter()"
    />

    <!-- 起止日期时间-yyyy-MM-dd HH:mm:ss -传值为数组 -->

    <el-date-picker
      v-if="item.type === 'DateTimeRange' && !item.isHide"
      v-model="listQuery[item.prop]"
      :style="'width:' + (item.width || '100%')"
      :start-placeholder="item.startPlaceholder || '开始日期'"
      :end-placeholder="item.endPlaceholder || '结束日期'"
      :range-separator="item.separatorStr || '-'"
      :type="item.dateType || 'datetimerange'"
      :value-format="item.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
      :format="item.labelFormat || 'yyyy-MM-dd HH:mm:ss'"
      :picker-options="item.pickerOpts || ''"
      :default-time="item.defaultTime || ['00:00:00', '23:59:59']"
      @change="item.change ? item.change(formData[item.prop]) : ''"
    />

    <!-- 日期起始范围选择器-传参格式待确定-未使用 -->
    <el-date-picker
      v-if="item.type === 'DateRangeBasis' && !item.isHide"
      v-model="listQuery[item.prop]"
      type="daterange"
      :style="item.filterStyle || 'width:' + filterWidth + 'px'"
      :placeholder="setSelectText(item)"
      :range-separator="item.separatorStr || '至'"
      :value-format="item.valueFormat || 'yyyy-MM-dd'"
      :format="item.labelFormat || 'yyyy-MM-dd'"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @change="item.change ? item.change(listQuery[item.prop]) : handleFilter()"
    />

    <!-- 日期起始范围选择器-封装-显示'yyyy-MM-dd传值 date-time-两个单独prop
         用于只选开始结束日期，时间默认赋值， 开始赋00:00:00，结束赋23:59:59 -->
    <DateRange
      v-if="item.type === 'DateRangeSelf' && !item.isHide"
      :item="item"
      :form-data="listQuery"
      @handleFilter="handleFilter"
    />

    <!-- 日期起始范围选择器-封装-显示'yyyy-MM-dd 传值-date-两个单独prop
         开始和结束添加时间大小判断提示 -->
    <DateRangePart
      v-if="item.type === 'DateRangePart' && !item.isHide"
      :item="item"
      :filter-width="filterWidth"
      :form-data="listQuery"
      @handleFilter="handleFilter"
    />

    <!-- 批量输入框 -->
    <el-input
      v-if="item.type === 'BatchInput' && !item.isHide"
      v-model="listQuery[item.prop]"
      class="filter-item batch-Input"
      :style="item.filterStyle || 'width:' + filterWidth + 'px'"
      :placeholder="setInputText(item)"
      @keyup.enter.native="handleFilter"
    >
      <el-button slot="append" size="mini" @click="batchClick(item)">更多</el-button>
    </el-input>
    <div>
      <el-dialog
        v-dialogDrag
        class="batch-dialog"
        :title="'请输入' + batchTitle"
        width="350px"
        :visible.sync="dialogFormVisible"
        @close="batchReset"
      >
        <el-input v-model="textarea" type="textarea" :rows="8" resize="none" />
        <div slot="footer" class="dialog-footer">
          <!-- '取消' -->
          <el-button size="mini" @click="batchCancel">{{ $t('button.cancel') }}</el-button>
          <!-- '清空' -->
          <el-button size="mini" @click="batchReset">{{ $t('button.reset') }}</el-button>
          <!-- '确认' -->
          <el-button type="primary" size="mini" @click="batchConfirm">{{ $t('button.confirm') }}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import DateRange from './DateRange'
import DateRangePart from './DateRangePart'
import Treeselect from '@riophae/vue-treeselect'
export default {
  name: 'FilterItem',
  components: { Treeselect, DateRange, DateRangePart },
  props: {
    item: { type: Object, default: () => {} },
    listQuery: { type: Object, default: () => {} }, // 查询参数
    filterWidth: { type: Number, default: 160 }, // 查询项输入栏宽度
    lazyLoadOpts: { type: Function, default: () => {} }, // 级联选择器数据动态加载方法
    loadOptions: { type: Function, default: () => {} } // 树形下拉框数据加载方法
  },
  data() {
    return {
      selects: {}, // 单个下拉多选，选中数据存储
      textarea: '', // 批量输入弹窗内文本值
      batchTitle: '', // 批量输入弹窗标题
      dialogFormVisible: false, // 批量输入弹窗显示
      clearable: true
    }
  },
  computed: {
    /** 输入框占位文本 */
    setInputText() {
      return val => {
        return val.placeholder || this.$t('dialog.pleaseEnter') + val.label // '请输入'
      }
    },
    /** 选择器占位文本 */
    setSelectText() {
      return val => {
        return val.placeholder || this.$t('dialog.pleaseSelect') + val.label // '请选择'
      }
    }
  },
  watch: {
    /** 深度监听下拉多选对象，选中数据变化，
     *  selects下保存数组，listQuery下保存字符串
     *  数组转逗号分隔的字符串 赋值给this.listQuery
     * */
    selects: {
      handler(newValue, oldValue) {
        let str = Object.keys(newValue)[0] // 获取改变对象的key值，对应prop的值
        this.$set(this.listQuery, str, newValue[str].join(','))
      },
      deep: true
    }
  },
  methods: {
    /** 批量输入框,点击'更多'按钮,打开弹窗,
     * 获取对应输入框值，且逗号转回车显示 */
    batchClick(val) {
      this.currentItem = val.prop
      this.batchTitle = val.label
      this.dialogFormVisible = true
      if (this.listQuery[val.prop]) {
        let reg = new RegExp(',', 'g')
        this.$set(this, 'textarea', this.listQuery[val.prop].replace(reg, '\n'))
      }
    },
    /** 批量输入框弹窗确定按钮，回车转逗号格式化，赋值对应的输入框,并查询 */
    batchConfirm() {
      let reg = new RegExp('\n', 'g')
      this.$set(this.listQuery, this.currentItem, this.textarea.replace(reg, ','))
      this.handleFilter()
      this.dialogFormVisible = false
    },
    /** 批量输入框弹窗重置按钮，重置弹窗文本 */
    batchReset() {
      this.textarea = ''
    },
    /** 批量输入框弹窗重置按钮,清空弹窗文本,关闭弹窗 */
    batchCancel() {
      this.textarea = ''
      this.dialogFormVisible = false
    },
    /** 回车搜索功能 */
    handleFilter() {
      this.$emit('handleFilter')
    }
  }
}
</script>
<style lang="scss" scoped>
/* 优化批量输入框高度比其他小1px，造成的后一个查询项转行问题 */
.batch-Input {
  margin: 0.5px 0;
  /* 优化批量输入框更多按钮的宽度 */
  /deep/ .el-input-group__append,
  .el-input-group__prepend {
    padding: 0 8px;
  }
}
/* 修改批量弹窗样式 */
.batch-dialog /deep/ .el-dialog__body {
  padding: 15px 20px;
  border-top: 1px #dcdfe6 solid;
}
/** 下拉多选列表*/
.selects {
  /* 下拉多选输入框超出宽度 显示滚动条，滚动条位置调整 */
  /deep/ .el-select__tags {
    margin-left: 3px;
    height: 80%;
    flex-wrap: unset;
    overflow: auto;
  }
  /* 修改下拉多选滚动条宽度高度 */
  /deep/ .el-select__tags::-webkit-scrollbar {
    width: 2px;
    height: 2px;
  }
}
</style>
