<template>
  <div>
    <el-form ref="tableForm" :visible="tableShow" :model="tableForm" :inline="true" class="table-form" size="mini">
      <el-table
        ref="table"
        v-tableAdaptive="{ bottomOffset: bottomOffSet }"
        style="width: 100%"
        :data="tableForm.tableData"
        :height="height"
        :row-key="rowKey"
        :stripe="stripe"
        :highlight-current-row="true"
        :header-cell-style="headerColor"
        :row-class-name="rowClassName"
        :row-style="rowStyle"
        :cell-style="cellStyle"
        :border="border"
        :default-expand-all="expandAll"
        :tree-props="treeProps ? treeProps : {}"
        @expand-change="row => expandChange(row)"
        @row-click="handleRowClick"
        @select="handleSelect"
        @selection-change="handleSelectionChange"
        @sort-change="sortChange"
      >
        <!-- 展开行 表格 -->
        <el-table-column v-if="hasExpandInfo" type="expand">
          <template slot-scope="scope">
            <!-- 旧样式 -->
            <!-- <el-form
              v-for="row in scope.row.actions"
              :key="row.id"
              label-position="left"
              inline
              class="table-expand"
            >
              <el-form-item v-for="item in expandList" :key="item.prop" :label="item.label">
                <span>{{ row[item.prop] }}</span>
            </el-form-item>
            </el-form>-->
            <el-table :ref="'expandTable_' + scope.$index" :data="scope.row.actions" border>
              <el-table-column
                v-for="item in expandList"
                :key="item.prop"
                :label="item.label"
                :prop="item.prop"
                :width="item.width ? item.width : null"
                :show-overflow-tooltip="true"
              />
            </el-table>
          </template>
        </el-table-column>
        <!-- 展开行 表格 -->
        <el-table-column v-if="hasExpandTable" type="expand" prop="expandDataList">
          <template slot-scope="scope">
            <el-table
              :ref="'expandTable_' + scope.$index"
              :data="scope.row.expandDataList"
              border
              @row-click="row => treeRowClick(row, 'expandTable_' + scope.$index)"
              @selection-change="rows => treeSelectChange(rows, scope.$index)"
            >
              <el-table-column v-if="hasTreeSelection" type="selection" width="44px" align="center" />
              <el-table-column
                v-for="item in expandList"
                :key="item.prop"
                :label="item.label"
                :prop="item.prop"
                :width="item.width ? item.width : null"
                :show-overflow-tooltip="true"
              />
            </el-table>
          </template>
        </el-table-column>
        <!-- 复选框列 -->
        <el-table-column v-if="hasSelection" type="selection" :selectable="selectable" width="44px" align="center" />
        <!-- 索引列 -->
        <el-table-column v-if="hasIndex" type="index" label="序号" width="55px" align="center">
          <!-- :index="indexMethod" -->
          <template slot-scope="scope">
            <span>{{ indexMethod(scope.$index, scope) }}</span>
          </template>
        </el-table-column>
        <!-- 表格内容 -->
        <el-table-column
          v-for="item in colList"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          :fixed="item.fixed"
          :width="item.width ? item.width : null"
          :min-width="colMinWidth(item.label)"
          :render-header="item.required ? addRedStar : null"
          :show-overflow-tooltip="true"
          :sortable="isSort && item.sortAble === true ? 'custom' : false"
        >
          <!-- 表头 -->
          <template slot="header" slot-scope="scope">
            <el-tooltip
              v-if="!isAddRedStar"
              :disabled="isShowTooltip"
              class="item"
              effect="dark"
              placement="top"
              :content="item.label"
              style="position：relative"
            >
              <span @mouseover="onMouseOver(scope.$index)">
                <span ref="tableHeader">{{ item.label }}</span>
              </span>
            </el-tooltip>
            <span v-else>{{ item.label }}</span>
          </template>
          <template slot-scope="scope">
            <!-- 输入框 -->
            <el-form-item
              v-if="item.type === 'colType/Input'"
              :prop="'tableData.' + scope.$index + '.' + item.prop"
              :rules="item.rules"
            >
              <el-input
                v-model="scope.row[item.prop]"
                :clearable="item.clearable !== undefined ? item.clearable : true"
                size="mini"
                style="width: 100%"
                :placeholder="item.placeholder"
                :disabled="
                  typeof item.disabled === 'object'
                    ? item.disabled[scope.$index]
                    : item.disabled
                      ? item.disabled
                      : false
                "
                @focus="formItemFocus"
                @blur="formItemBlur"
              />
            </el-form-item>
            <!-- 文本域 -->
            <el-form-item
              v-else-if="item.type === 'colType/Textarea'"
              :prop="'tableData.' + scope.$index + '.' + item.prop"
              :rules="item.rules"
            >
              <el-input
                v-model="scope.row[item.prop]"
                type="textarea"
                clearable
                size="mini"
                style="width: 100%"
                :placeholder="item.placeholder"
                :disabled="
                  typeof item.disabled === 'object'
                    ? item.disabled[scope.$index]
                    : item.disabled
                      ? item.disabled
                      : false
                "
                :autosize="{ minRows: item.minRows, maxRows: item.maxRows }"
                @focus="formItemFocus"
                @blur="formItemBlur"
              />
            </el-form-item>

            <!-- 数字输入框 -->
            <el-form-item
              v-else-if="item.type === 'colType/Number'"
              :prop="'tableData.' + scope.$index + '.' + item.prop"
              :rules="item.rules"
            >
              <el-input-number
                v-model="scope.row[item.prop]"
                controls-position="right"
                size="mini"
                style="width: 100%"
                :placeholder="item.placeholder"
                :disabled="
                  typeof item.disabled === 'object'
                    ? item.disabled[scope.$index]
                    : item.disabled
                      ? item.disabled
                      : false
                "
                :min="item.min == undefined ? 0 : item.min"
                :max="item.max"
                @focus="formItemFocus"
                @blur="formItemBlur"
              />
            </el-form-item>

            <!-- 下拉单选 -->
            <el-form-item
              v-else-if="item.type === 'colType/Select'"
              :prop="'tableData.' + scope.$index + '.' + item.prop"
              :rules="item.rules"
            >
              <el-select
                v-model="scope.row[item.prop]"
                size="mini"
                style="width: 100%"
                :disabled="
                  typeof item.disabled === 'object'
                    ? item.disabled[scope.$index]
                    : item.disabled
                      ? item.disabled
                      : false
                "
                clearable
                filterable
                @visible-change="item.visibleChange ? item.visibleChange(scope.$index, scope.row) : ''"
                @change="item.change ? item.change(scope.$index, scope.row[item.prop]) : ''"
              >
                <el-option
                  v-for="option in item.options"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </el-select>
            </el-form-item>

            <!-- 下拉单选-分组 -->
            <el-form-item
              v-else-if="item.type === 'colType/SelectGroup'"
              :prop="'tableData.' + scope.$index + '.' + item.prop"
              :rules="item.rules"
            >
              <el-select v-model="scope.row[item.prop]">
                <el-option-group v-for="group in item.options" :key="group.label" :label="group.label">
                  <el-option
                    v-for="option in group.options"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-option-group>
              </el-select>
            </el-form-item>

            <!-- 级联选择器-表格内值对应字符串、组件内选中值对应数组 -->
            <el-form-item
              v-else-if="item.type === 'colType/Cascader'"
              :prop="'tableData.' + scope.$index + '.' + item.prop"
              :rules="item.rules"
            >
              <Cascader :item="item" :form-data="scope" />
            </el-form-item>

            <!-- 单选按钮 -->
            <el-form-item
              v-else-if="item.type === 'colType/Radio'"
              :prop="'tableData.' + scope.$index + '.' + item.prop"
              :rules="item.rules"
            >
              <el-radio-group v-model="scope.row[item.prop]">
                <el-radio v-for="option in item.options" :key="option.value" :label="option.value">{{
                  option.label
                }}</el-radio>
              </el-radio-group>
            </el-form-item>

            <!--  日期选择器  -->
            <el-form-item
              v-else-if="item.type === 'colType/Date'"
              :prop="'tableData.' + scope.$index + '.' + item.prop"
              :rules="item.rules"
            >
              <el-date-picker
                v-model="scope.row[item.prop]"
                style="width: 100%"
                :disabled="
                  typeof item.disabled === 'object'
                    ? item.disabled[scope.$index]
                    : item.disabled
                      ? item.disabled
                      : false
                "
                :type="item.dateType || 'date'"
                :value-format="item.valueFormat || 'yyyy-MM-dd'"
                :format="item.format || 'yyyy-MM-dd'"
                @focus="formItemFocus"
                @blur="formItemBlur"
              />
            </el-form-item>
            <!-- 标签 +字典格式过滤显示-->
            <el-form-item
              v-else-if="item.type === 'colType/Tag'"
              :prop="'tableData.' + scope.$index + '.' + item.prop"
              :rules="item.rules"
              :style="item.style || 'text-align: center;'"
            >
              <!-- :effect="item.effect || 'light '" -->
              <el-tag
                :size="item.size || 'medium '"
                :type="
                  item.tag[
                    item.tag.findIndex(tag => {
                      return tag.value === scope.row[item.prop]
                    })
                  ].tagType
                "
              >
                <span v-if="item.formatFilter">{{ scope.row[item.prop] | formatDict(item.tag, item.prop) }}</span>
                <span v-else>{{ scope.row[item.prop] }}</span>
              </el-tag>
            </el-form-item>

            <!-- 文字前显示对应标签 -->
            <el-form-item
              v-else-if="item.type === 'colType/TagSpan'"
              :prop="'tableData.' + scope.$index + '.' + item.prop"
              :rules="item.rules"
            >
              <div class="formItem">
                <span v-for="(tag, tagIndex) in item.tag" :key="tagIndex">
                  <span v-if="item.category[scope.$index] && item.category[scope.$index].includes(tagIndex)">
                    <el-tag :type="tag.tagType" :size="item.size || 'mini'">{{ tag.tagLabel }}</el-tag>
                    <span>&nbsp;</span>
                  </span>
                </span>
                <span class="columnStyle">{{ scope.row[item.prop] }}</span>
              </div>
            </el-form-item>

            <!-- 链接 -->
            <span v-else-if="item.type === 'colType/Link'" class="link-type" @click="item.function">
              {{ scope.row[item.prop] }}
            </span>

            <!-- 开关 -->
            <el-switch v-else-if="item.type === 'colType/Switch'" v-model="scope.row[item.prop]" />

            <!-- 按钮-一列可多个 -->
            <el-form-item
              v-else-if="item.type === 'colType/Button'"
              :prop="'tableData.' + scope.$index + '.' + item.prop"
              :rules="item.rules"
            >
              <el-button
                v-for="btn in item.button"
                :key="btn.value"
                :icon="btn.icon"
                :type="btn.btnType"
                :plain="btn.btnStyle === 'plain'"
                :round="btn.btnStyle === 'round'"
                :circle="btn.btnStyle === 'circle'"
                :loading="
                  btn.loading !== undefined && btn.loading[scope.$index] !== undefined
                    ? btn.loading[scope.$index]
                    : false
                "
                size="mini"
                @click="btnClick(btn, scope)"
              >
                <div v-if="btn.reverse !== undefined && btn.reverse[scope.$index] && !btn.isHide">
                  {{ btn.btnLabelReverse }}
                </div>
                <div v-else-if="!btn.isHide">{{ btn.btnLabel }}</div>
              </el-button>
            </el-form-item>

            <!-- 数据字典格式化显示的，显示对应_****字段的值 -->
            <span v-else-if="item.type && item.type.split('/')[0] === 'formatDict'">
              {{ scope.row['_' + item.prop] }}
            </span>

            <!-- 过滤格式化-对应内容显示的格式化，改变显示效果，不改变表格原数据，比如日期、时间、布尔值 -->
            <span v-else-if="item.type === 'formatFilter/Date'">{{ scope.row[item.prop] | formatDate }}</span>

            <span v-else-if="item.type === 'formatFilter/DateTime'">{{ scope.row[item.prop] | formatDateTime }}</span>

            <span v-else-if="item.type === 'formatFilter/Bool'">{{ scope.row[item.prop] | formatBoolean }}</span>

            <span v-else>{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
        <!-- 操作按钮 --fixed功能待优化 -->
        <el-table-column
          v-if="tableBtn !== undefined"
          v-permission="[tableBtn.permission || 'any']"
          :label="tableBtn.label || '操作'"
          :width="tableBtn.width || '100'"
          :fixed="tableBtn.fixed || 'right'"
          class-name="btnColumn"
        >
          <template slot-scope="scope">
            <span v-for="(btn, btnIndex) in tableBtn.btnItem" :key="btnIndex">
              <el-button
                v-if="!btn.isHide[scope.$index]"
                v-permission="[btn.permission || 'any']"
                :icon="btn.icon"
                :type="btn.btnType || ''"
                :plain="btn.btnStyle === 'plain'"
                :round="btn.btnStyle === 'round'"
                :circle="btn.btnStyle === 'circle'"
                :size="btn.size || 'mini'"
                @click="btnClick(btn, scope)"
              >
                <div v-if="btn.reverse !== undefined && btn.reverse[scope.$index] && !btn.isHide[scope.$index]">
                  {{ btn.btnLabelReverse }}
                </div>
                <div v-else-if="!btn.isHide[scope.$index]">{{ btn.btnLabel }}</div>
              </el-button>
              <span
                v-if="!btn.isHide[scope.$index] && btnIndex !== tableBtn.btnItem.length - 1"
                v-permission="[btn.permission || 'any']"
                style="color: #c2c2c2"
              >
                &nbsp;
              </span>
              <!--      && !btn.isHide[scope.$index + 1]        -->
            </span>
          </template>
        </el-table-column>
        <!-- 无数据显示内容 -->
        <template slot="empty">{{ emptyText }}</template>
      </el-table>
    </el-form>
    <!-- 分页 -->
    <div v-show="total > 0" :class="{ hidden: pageHidden }" class="pagination-container">
      <el-pagination
        :background="background"
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
        :layout="layout"
        :page-sizes="pageSizes"
        :total="total"
        v-bind="$attrs"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
        <span v-show="hasSelection" class="alreadySelect">
          当前已选中
          <a class="showColor">{{ selectItems }}</a> 条
        </span>
      </el-pagination>
    </div>
  </div>
</template>
<script>
import permission from '@/directive/permission/index.js'
import { scrollTo } from '@/utils/scroll-to'
import Cascader from '@/components/Cascader'
export default {
  name: 'Table',
  components: { Cascader },
  directives: { permission },
  props: {
    //  表格参数
    dataList: { type: Array, default: () => [] }, // 表格数据
    column: { type: Array, default: () => [] }, // 列字段及参数，表头字段
    tableBtn: { type: Object, default: () => {} }, // 表头字段 表格按钮字段及参数
    treeProps: { type: Object, default: () => {} }, // 表格是否为树形
    rowStyle: { type: Function, default: () => {} },
    cellStyle: { type: Function, default: () => {} },

    height: { type: Number, default: null }, // 表格高度
    rowKey: { type: String, default: null }, // 行key值，sortable/treetable必须
    sortable: { type: Object, default: () => {} }, // 表格为排序及含表单时必须，为sortable，用于选中表单时禁用行拖动
    emptyText: {
      type: String,
      default() {
        return this.$t('table.noData')
      }
    }, // '暂无数据' // 无数据时的显示文本
    sorting: { type: String, default: null }, // 排序方式
    isSort: { type: Boolean, default: null }, // 是否排序
    tableRowClassName: { type: String, default: null }, // 行样式名
    border: { type: Boolean, default: true }, // 是否显示边框
    stripe: { type: Boolean, default: false }, // 是否为斑马纹
    headerColor: {
      type: Object,
      default() {
        return { background: '#fafafa' }
      }
    }, // 增加表格头部颜色
    hasIndex: { type: Boolean, default: () => false }, // 是否有自定义索引序号
    indexMethodNew: {
      type: Function,
      default: () => {
        return 'default'
      }
    }, // 自定义表格序号方法 default 用于判断是否使用默认方法

    // 复选框
    hasSelection: { type: Boolean, default: () => true }, // 是否需要复选框
    selection: { type: Array, default: () => [] }, // 选中行
    selectable: {
      type: Function,
      default: () => {
        return true
      }
    }, // 设置复选框 是否可以勾选方法

    // 插槽
    hasExpandInfo: { type: Boolean, default: () => false }, // 是否需要展开的信息表格插槽
    hasExpandTable: { type: Boolean, default: () => false }, // 是否需要展开的表格插槽
    expandList: { type: Array, default: () => [] }, // 展开的数据
    treeSelection: { type: Array, default: () => [] }, // 展开的选中数据
    expandAll: { type: Boolean, default: false }, // 默认不展开所有数据
    hasTreeSelection: { type: Boolean, default: () => true }, // 展开插槽是否需要复选框

    //  翻页参数
    total: { type: Number, default: 0 }, // 总条目数，数据量
    page: { type: Number, default: 1 }, // 页码
    limit: { type: Number, default: 20 }, // 一页最大显示数
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50, 500]
      }
    }, // 每页显示条目个数，页码数据量尺寸
    background: { type: Boolean, default: true }, // 是否为分页按钮添加背景色
    autoScroll: { type: Boolean, default: true }, // 是否自动滚屏
    pageHidden: { type: Boolean, default: false }, // 是否显示分页
    layout: { type: String, default: 'slot, total, sizes, prev, pager, next, jumper' }, // 分页组件布局

    dictGather: { type: Array, default: () => [] }, // 数据字典集合

    bottomOffSet: { type: Number, default: 90 } // 高度自适应-距底部距离配置
  },
  data() {
    return {
      startIndex: -1, // Ctrl键多选功能中，起点初始为-1
      isPressCtrl: false, // Ctrl键是否按住
      tableForm: {
        tableData: []
      }, // 表格数据
      defaultSort: null, // 初始默认排序
      isAddRedStar: false, // 是否有必填红色星标志
      isShowTooltip: false, // 是否展示悬浮提示
      isRowClick: false, // 用于子母表点击行获取明细时，避免点击行同时选中复选框导致的多次请求（getDetail）
      itemFocus: false, // 是否聚焦文本框
      treeRowsObj: {}, // 所有展开表格的选中值
      selectItems: 0 // 当前选中条数
    }
  },
  computed: {
    /** 当前页 */
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    /** 页码 */
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    },
    /** 排序方式 */
    sortingType: {
      get() {
        return this.sorting
      },
      set(val) {
        this.$emit('update:sorting', val)
      }
    },
    /** 表格数据 */
    tableData: {
      get() {
        return this.dataList
      },
      set(val) {
        return val
      }
    },
    /** 表头信息 */
    colList() {
      var arr = []
      if (this.column.length) {
        this.column.map(item => {
          if (item.show === false) {
            return
          } else {
            arr.push(item)
          }
        })
      }
      return arr
    },
    /** 表格显示 */
    tableShow() {
      if (this.tableData !== null) {
        // 遍历索引,赋值给data序号数据，用于Ctr多选l功能实现
        this.tableData.forEach((item, tableIndex) => {
          item.tableIndex = tableIndex
        })
      }
      // this.tableData为空时，表格数据赋[],其他直接赋值
      if (this.tableData === null) {
        this.$set(this.tableForm, 'tableData', [])
      } else {
        this.$set(this.tableForm, 'tableData', this.tableData)
      }
      // 表格数据不为空时，调用格式化表格数据方法-数据字典-页面刷新、查询时tableShow方法会执行
      if (this.tableData !== null) {
        this.formatTableData()
      }
      return false
    },
    /** 对应默认最小列宽设置 */
    colMinWidth() {
      // 设置字号为14px的最小列宽，避免表头显示不全
      return label => {
        let len = label.toString().length
        return 14 * len + 24 + 20 + 1 + 'px' // 字体像素*字体数量+排序图标宽度+padding  +(若表格有边框线需+1)
      }
    }
  },
  created() {
    this.getDefaultSort()
  },
  mounted() {
    /** Ctrl按键监听 */
    window.addEventListener('keydown', code => {
      // 获取键盘按住事件 // 判断是否按住ctrl键，是就把isPressCtrl赋值为true
      if (code.keyCode === 17 && code.ctrlKey) {
        this.isPressCtrl = true
      }
    })
    window.addEventListener('keyup', code => {
      // 获取键盘松开事件 // 判断是否松开ctrl键，是就把isPressCtrl赋值为false
      if (code.keyCode === 17) {
        this.isPressCtrl = false
      }
    })
  },
  methods: {
    /**  表格数据-根据字典格式化 */
    formatTableData() {
      let CurrentData = this.tableData
      // 遍历表头
      for (let column of this.colList) {
        // 列类型是'表格列字典'
        if (column.type && column.type.split('/')[0] === 'formatDict') {
          // 获取当前列 对应的字典
          let currentDict = this.dictGather.find(opt => opt.name === column.type.split('/')[1])
          // 遍历表格数据
          for (let row of CurrentData) {
            // 找对当前列对应的字典，逐条匹配，赋对应值
            if (currentDict !== undefined && row[column.prop] !== null && row[column.prop] !== undefined) {
              // 匹配表格该项数据，获取对应label
              let str = row[column.prop].toString()
              let optionItem
              if (currentDict.name === 'Enabled' || currentDict.name === 'Boolean') {
                optionItem = currentDict.details.find(opt => opt.value === str.toLowerCase())
              } else {
                optionItem = currentDict.details.find(opt => opt.value === str)
              }
              if (optionItem) {
                this.$set(row, '_' + column.prop, optionItem.label)
              } else {
                this.$set(row, '_' + column.prop, row[column.prop])
              }
            } else {
              // 未找到对当前列对应的字典，逐条赋原值
              this.$set(row, '_' + column.prop, row[column.prop])
            }
          }
        }
      }
    },
    /** 行的className的回调方法， */
    rowClassName({ row, rowIndex }) {
      if (this.tableRowClassName === 'colUpdateRow') {
        if (row.message === 1) {
          return 'row-add'
        } else if (row.message === 2) {
          return 'row-edit'
        }
      }
      // 展开插槽配置为默认展开所有行时，添加箭头隐藏显示样式
      if (this.hasExpandTable && this.expandAll) {
        row.rowIndex = rowIndex // 增加行号
        // 有展开表，但无子项，去除展开箭头样式
        if (!row.hasChildren) {
          return 'row-expand-disabled'
        }
      }
    },
    /** 给表头加必选标识 */
    addRedStar(h, { column }) {
      this.isAddRedStar = true
      return [h('span', { style: 'color: red' }, '*'), h('span', ' ' + column.label)]
    },
    /** [输入框聚焦]（适用于带文本框的排序表），选中文本框时，禁止表格拖动，且不选中行 */
    formItemFocus(event) {
      this.itemFocus = true
      if (this.sortable) {
        this.sortable.option('disabled', true)
        event.currentTarget.select()
      }
    },
    /** [输入框失焦]（适用于带文本框的排序表），选中文本框时，可表格拖动=*/
    formItemBlur() {
      this.itemFocus = false
      if (this.sortable) {
        this.sortable.option('disabled', false)
      }
    },
    /** 当选择项发生变化时会触发该事件 */
    handleSelectionChange(val) {
      if (this.itemFocus) {
        return
      }
      // 设置单选时，行显示高亮
      if (val.length === 1) {
        this.$refs.table.setCurrentRow(val[0])
        if (!this.isRowClick) {
          this.$emit('getDetail', val[0]) // 选中复选框但未点击行，则获取明细
        }
      } else {
        this.$refs.table.setCurrentRow()
      }
      this.$emit('update:selection', val)
      this.selectItems = val.length
    },
    handleRowClick(row, column, event) {
      // 判断该行是否禁用，true：禁用，tableSelectable_为页面selectable方法判断时要添加的字段
      if (row.selectDisable_) {
        return
      }
      if (this.itemFocus) {
        return // 行内表单
      }
      // 选中的是复选框列时
      if (column && column.type === 'selection') {
        // true：复选框未禁用的情况下则可选中，false：禁用状态不可选中
        // if (column.selectable(row)) {
        this.$refs.table.toggleRowSelection(row)
        let item = this.$refs.table.selection
        this.handleSelect(item, row)
        // }
        return // 复选框单元格内，实现与复选框内select方式和样式类似
      }
      this.isRowClick = true
      this.$refs.table.clearSelection()
      this.$refs.table.toggleRowSelection(row)
      this.$emit('getDetail', row)
      this.$emit('headRowClick') // 用于选中主表，清空子树表选中行
      this.isRowClick = false
    },
    /** 手动勾选数据行的 Checkbox 时触发的事件
     * 判断ctrl键是否被按下，记录需要多选的起点和终点完成多选
     */
    handleSelect(item, row) {
      let data = this.$refs.table.tableData // 获取所有数据
      let startIndex = this.startIndex // 起点数 从-1开始
      let endIndex = row.tableIndex // 终点数
      // (1)按住ctrl+起点包含在选中内容内;(2)按住ctrl+起点终点同一个点;
      if ((this.isPressCtrl && item.includes(data[startIndex])) || (this.isPressCtrl && startIndex === endIndex)) {
        let sum = Math.abs(startIndex - endIndex) + 1 // 记录终点
        let min = Math.min(startIndex, endIndex) // 记录起点
        for (let i = 0; i < sum; i++) {
          let index = min + i
          this.$refs.table.toggleRowSelection(data[index], true) // 通过ref打点调用toggleRowSelection方法，第二个必须为true
        }
      } else {
        this.startIndex = row.tableIndex // 没按住ctrl时，记录起点
      }
    },
    /** 展开表格，当某一行被点击时会触发该事件 */
    treeRowClick(row, tableRef) {
      this.$refs[tableRef].clearSelection()
      this.$refs[tableRef].toggleRowSelection(row)
    },
    /** 页码改变时会触发 */
    handleSizeChange(val) {
      this.$emit('pagination', { page: this.currentPage, limit: val })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    /** 切换当前页时触发 */
    handleCurrentChange(val) {
      this.$emit('pagination', { page: val, limit: this.pageSize })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    /** 按钮事件 */
    btnClick(btn, scope) {
      if (btn.reverse !== undefined && btn.reverse[scope.$index]) {
        this.$emit(btn.clickFunReverse, scope)
      } else {
        this.$emit(btn.clickFun, scope)
      }
    },
    /** 当表格的排序条件发生变化的时候会触发该事件,
     * 若排序条件为空，排序按初始默认排序字段排序，或无排序 */
    sortChange(data) {
      const { prop, order } = data
      if (!prop || !order) {
        this.sortingType = this.defaultSort
        this.$emit('tableSort', { page: 1, sorting: this.sortingType })
        return
      }
      this.sortingType = prop + ' ' + order
      this.$emit('tableSort', { page: 1, sorting: this.sortingType })
    },
    /** 鼠标滑过表头，判断表头标题内容是否超出范围省略加悬浮提示 */
    onMouseOver(scopeIndex) {
      let index = scopeIndex
      // 若有复选框-1,若有序号-1,若有额外信息插槽-1,若有额外表格插槽-1
      if (this.hasSelection) {
        index = index - 1
      }
      if (this.hasIndex) {
        index = index - 1
      }
      if (this.hasExpandInfo) {
        index = index - 1
      }
      if (this.hasExpandTable) {
        index = index - 1
      }
      if (this.$refs.tableHeader.length) {
        let parentWidth = this.$refs.tableHeader[index].parentNode.offsetWidth
        let contentWidth = this.$refs.tableHeader[index].offsetWidth
        if (parentWidth < contentWidth) {
          this.isShowTooltip = false
        } else {
          this.isShowTooltip = true
        }
      }
    },
    /** 获取初始默认排序内容 */
    getDefaultSort() {
      this.defaultSort = this.sorting
    },
    /** 展开表格选择项发生变化时触发 */
    treeSelectChange(rows, tableIndex) {
      // 当选项有更改时，将treeRowsObj中对应的表格的选中值替换，最后将各表格选中行数组合并
      this.treeRowsObj['tb' + tableIndex] = rows
      let arr = []
      let objKeys = Object.keys(this.treeRowsObj)
      objKeys.map(key => {
        arr = arr.concat(this.treeRowsObj[key])
      })
      this.$emit('update:treeSelection', arr)
    },
    /** 展开表格的展开或者关闭的时候触发 */
    expandChange(row, index) {
      if (this.hasExpandInfo) {
        return
      }
      if (this.treeProps) {
        return
      }
      if (this.expandAll && !row.hasChildren) {
        // 展开插槽配置为默认展开所有行时，无子项，则不展开
        this.$nextTick(() => {
          this.$refs.table.toggleRowExpansion(row, false)
        })
        return
      }
      row.expanded = !row.expanded // 点击展开，切换展开状态
      if (!row.expanded) {
        // 展开状态false时，直接跳出
        return
      }
      this.$emit('loadExpandData', row, index === undefined ? row.rowIndex : index)
    },
    /** 索引列，自定义索引方法 */
    indexMethod(index, scope) {
      let flag = this.indexMethodNew(index, scope) !== 'default' || false
      return flag ? this.indexMethodNew(index, scope) : this.indexMethodDefault(index)
    },
    /** 索引列，默认索引方法 */
    indexMethodDefault(index) {
      return (this.currentPage - 1) * this.pageSize + index + 1
    }
  }
}
</script>
<style scoped>
.pagination-container {
  background: #fff;
  padding: 16px 16px;
}
.pagination-container.hidden {
  display: none;
}
.table-form .el-form-item {
  margin: 0;
  width: 100%;
}
/* 表单项内容框宽度100% */
.table-form .el-form-item /deep/ .el-form-item__content {
  width: 100%;
}
/* 额外插槽，受上面两条样式影响会转行，则调整 */
.table-expand .el-form-item /deep/ .el-form-item__content {
  width: auto;
}
/* 文本域撑开超出表格高度时 出现滚动条 */
.table-form /deep/ .el-table__body-wrapper {
  overflow-y: auto;
}
/* 复选框单元格 为鼠标手形态 */
.table-form /deep/ td.el-table-column--selection {
  cursor: pointer;
}
/* 分页布局左右分开 */
.el-pagination {
  width: 100%;
  text-align: right;
}
.pagination /deep/ .el-pagination__jump {
  float: right;
}
/* 当前选中条数 */
.alreadySelect {
  font-weight: normal;
  line-height: 27px !important;
  float: left;
}
/* 当前选中条数 数字的颜色 */
.showColor {
  color: #b12b2b;
}

/** 操作按钮列-最后一个底部无边框线-未实现 */
/* .table-form /deep/ .btnColumn {
  border-bottom: 0px;
} */

/** 操作按钮列 */
/* .table-form /deep/ .btnColumn .cell {
  display: unset;
  align-items: right;
} */

/* 复选框水平居中，根据复选框列宽度修改而修改  */
.table-form /deep/ .el-table-column--selection .cell {
  padding: 0 14px;
}
/** 标签 插槽文字超出宽度省略号显示 */
.formItem {
  display: flex;
  flex-direction: row;
}
.columnStyle {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
