<template>
  <div class="search_input">
    <el-form
      :key="isEdit ? 'editForm' : 'addForm'"
      ref="formList"
      :size="size"
      :inline="inline"
      :model="formData"
      :rules="rules"
      :label-width="labelWidth + 'px'"
      :label-position="labelPosition"
    >
      <el-row :gutter="layout.gutter">
        <el-col
          v-for="item in formList"
          :key="item.prop"
          :span="item.span ? item.span : layout.span"
          :xs="layout.span ? undefined : layout.xs"
          :sm="layout.span ? undefined : layout.sm"
          :md="layout.span ? undefined : layout.md"
          :xl="layout.span ? undefined : layout.xl"
        >
          <el-form-item :prop="item.prop">
            <!-- 输入规则提示 -->
            <span slot="label">
              {{ !item.isHide ? item.label : '' }}
              <el-tooltip v-if="item.tip" class="item" effect="dark" placement="top-start">
                <div slot="content" v-html="item.tip" />
                <i :class="item.icon" />
              </el-tooltip>
            </span>
            <!-- 文本-仅显示-超出宽度省略号显示-鼠标移入悬浮框查看 -->
            <el-tooltip
              v-if="item.type === 'txt' && !item.isHide"
              :disabled="isHideTooltip"
              effect="dark"
              placement="top"
              :content="String(formData[item.prop])"
              style="position：relative"
            >
              <div ref="formText" class="form-txt" @mouseover="onMouseOver($refs.formText, item.tabIndex)">
                <span :style="item.style">{{ formData[item.prop] }}</span>
              </div>
            </el-tooltip>
            <!-- 组合文本-仅显示 -->
            <span v-if="item.type === 'txtGroup' && !item.isHide" :style="'width:' + (item.width || '100%')">
              <span v-for="(propItem, propIndex) in item.propGroup" :key="propIndex">
                {{ formData[propItem] }}
                <span v-if="propIndex !== item.propGroup.length - 1">&nbsp;{{ item.separator }}&nbsp;</span>
              </span>
            </span>
            <!-- 输入框 -->
            <el-input
              v-if="item.type === 'Input' && !item.isHide"
              v-model="formData[item.prop]"
              :placeholder="item.placeholder"
              :style="'width:' + (item.width || '100%')"
              clearable
              type="text"
              :readonly="item.readonly || (item.unique && isEdit) || false"
              :disabled="item.disabled || (item.unique && isEdit) || false"
              :maxlength="item.maxlength"
              @blur="item.blur ? item.blur(formData[item.prop]) : ''"
              @change="item.change ? item.change(formData[item.prop]) : ''"
            />
            <!-- 文本输入框 -->
            <el-input
              v-if="item.type === 'Textarea' && !item.isHide"
              v-model="formData[item.prop]"
              type="textarea"
              :placeholder="item.placeholder"
              :resize="item.resize || 'vertical'"
              :autosize="{ minRows: item.minRows, maxRows: item.maxRows }"
              :style="'width:' + (item.width || '100%')"
              :disabled="item.disabled || false"
            />
            <!-- 批量输入框（回车自动转为“,”） -->
            <el-input
              v-if="item.type === 'Batch' && !item.isHide"
              v-model="formData[item.prop]"
              type="textarea"
              :placeholder="item.placeholder"
              :rows="3"
              :style="'width:' + (item.width || '100%')"
              :disabled="item.disabled || false"
              resize="none"
              clearable
              @input="val => formatBatch(val, item.prop)"
            />
            <!-- 数字输入框 -->
            <el-input-number
              v-if="item.type === 'Number' && !item.isHide"
              v-model="formData[item.prop]"
              :placeholder="item.placeholder"
              :style="'width:' + (item.width || '100%')"
              controls-position="right"
              :disabled="item.disabled || false"
              :min="item.min"
              :max="item.max"
              :precision="item.precision"
              :step="item.step"
              @blur="item.blur ? item.blur(formData[item.prop]) : ''"
            />

            <!-- 密码框 -->
            <el-input
              v-if="item.type === 'Password' && !item.isHide"
              v-model="formData[item.prop]"
              type="password"
              :placeholder="item.placeholder"
              auto-complete="off"
              :style="'width:' + (item.width || '100%')"
              :disabled="item.disabled || false"
              clearable
            />

            <!-- 下拉框单选 -->
            <!-- $forceUpdate() 下拉刷新,修复数据改变下拉框不变的bug -->
            <el-select
              v-if="item.type === 'Select' && !item.isHide"
              v-model="formData[item.prop]"
              :style="'width:' + (item.width || '100%')"
              :disabled="item.disabled || false"
              :clearable="true"
              filterable
              @change="item.change ? item.change(formData[item.prop]) : ''"
              @visible-change="$forceUpdate()"
            >
              <el-option v-for="op in item.options" :key="op.value" :label="op.label" :value="op.value">
                {{ op.label }}
              </el-option>
            </el-select>

            <!-- 下拉框多选 -->
            <el-select
              v-if="item.type === 'Selects' && !item.isHide"
              v-model="formData[item.prop]"
              :style="'width:' + (item.width || '100%')"
              :disabled="item.disabled || false"
              :collapse-tags="item.collapse !== undefined ? item.collapse : true"
              multiple
              filterable
              @change="item.change ? item.change(formData[item.prop]) : ''"
              @visible-change="$forceUpdate()"
            >
              <el-option v-for="op in item.options" :key="op.value" :label="op.label" :value="op.value">
                {{ op.label }}
              </el-option>
            </el-select>

            <!-- 下拉网格 -->
            <el-select
              v-if="item.type === 'Combogrid' && !item.isHide"
              v-model="formData[item.prop]"
              clearable
              filterable
              :filter-method="
                query => {
                  cbgFilter(item.prop, query)
                }
              "
              :remote="item.remote || false"
              :remote-method="
                query => {
                  cbgRemote(item.prop, query)
                }
              "
              :style="'width: ' + (item.width || '100%')"
              :readonly="item.readonly || (item.unique && isEdit) || false"
              :disabled="item.disabled || (item.unique && isEdit) || false"
              @change="item.change ? item.change(formData[item.prop]) : ''"
              @visible-change="$forceUpdate()"
            >
              <table :width="item.tableWidth ? item.tableWidth : '450'" class="list-select-head">
                <tr>
                  <th
                    v-for="col in item.col"
                    :key="col.prop"
                    class="list-select-td"
                    :width="col.width ? col.width : '110px'"
                  >
                    {{ col.label }}
                  </th>
                </tr>
              </table>

              <div style="height: 24px" />
              <el-option v-for="op in item.options" :key="op.value" :label="op.label" :value="op.value">
                <table :width="item.tableWidth ? item.tableWidth : '450'">
                  <tr>
                    <td
                      v-for="(col, index) in item.col"
                      :key="index"
                      :title="op[col.prop]"
                      :width="col.width ? col.width : '110px'"
                      class="list-select-td"
                    >
                      {{ op[col.prop] }}
                    </td>
                  </tr>
                </table>
              </el-option>
              <div
                v-if="
                  item.count !== undefined &&
                    item.options !== undefined &&
                    item.optTotal > item.count &&
                    item.options.length > item.count - 1
                "
                class="list-select-tip"
              >
                <span>共{{ item.optTotal }}条数据，只显示前{{ item.count }}条搜索结果，输入关键字进行搜索</span>
              </div>
              <div
                v-if="
                  (item.count !== undefined && item.options !== undefined && item.options.length < item.count) ||
                    item.count === undefined
                "
                class="list-select-tip"
              >
                <span>共{{ item.optTotal }}条数据，{{ item.options.length }}条搜索结果，请输入关键字搜索</span>
              </div>
              <div v-if="item.optTotal !== 0" slot="empty" class="list-select-tip">
                <span>无数据，请重新输入关键字搜索</span>
              </div>
            </el-select>

            <!-- 单选 -->
            <el-radio-group
              v-if="item.type === 'Radio' && !item.isHide"
              v-model="formData[item.prop]"
              :disabled="item.disabled || false"
              :style="'width:' + (item.width || '100%')"
              @change="item.change ? item.change(formData[item.prop]) : ''"
            >
              <el-radio v-for="ra in item.radios" :key="ra.value" :label="ra.value">{{ ra.label }}</el-radio>
            </el-radio-group>

            <!-- 组合单选按钮 -->
            <!-- <el-radio-group
            v-if="item.type === 'RadioButton'"
            v-model="formData[item.prop]"
            :style="'width:' + (item.width || '100%')"
            @change="item.change && item.change(formData[item.prop])"
            >
           <el-radio-button
            v-for="ra in item.radios"
            :key="ra.value"
            :label="ra.value"
           >{{ ra.label }}</el-radio-button>
            </el-radio-group>-->

            <!-- 复选框 -->
            <el-checkbox-group
              v-if="item.type === 'Checkbox' && !item.isHide"
              v-model="formData[item.prop]"
              :style="'width:' + (item.width || '100%')"
            >
              <el-checkbox v-for="ch in item.checkboxs" :key="ch.value" :label="ch.value">{{ ch.label }}</el-checkbox>
            </el-checkbox-group>

            <!-- 时间（时间段筛选） -->
            <!-- <el-time-select
              v-if="item.type === 'Time'"
              v-model="formData[item.prop]"
              :style="'width:' + (item.width || '100%')"
              :placeholder="item.placeholder"
              :picker-options="item.pickerOpts"
              @change="item.change(formData[item.prop])"
            />-->
            <!-- 日期选择器--------------------------- -->
            <!-- 日期-yyyy-MM-dd-->
            <el-date-picker
              v-if="item.type === 'Date' && !item.isHide"
              v-model="formData[item.prop]"
              :style="'width:' + (item.width || '100%')"
              :placeholder="item.placeholder"
              :type="item.dateType || 'date'"
              :value-format="item.valueFormat || 'yyyy-MM-dd'"
              :format="item.labelFormat || 'yyyy-MM-dd'"
              :picker-options="item.pickerOpts || ''"
              @change="item.change ? item.change(formData[item.prop]) : ''"
            />

            <!-- 日期时间-yyyy-MM-dd HH:mm:ss -->
            <el-date-picker
              v-if="item.type === 'DateTime' && !item.isHide"
              v-model="formData[item.prop]"
              :style="'width:' + (item.width || '100%')"
              :placeholder="item.placeholder"
              :type="item.dateType || 'datetime'"
              :value-format="item.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
              :format="item.labelFormat || 'yyyy-MM-dd HH:mm:ss'"
              :disabled="item.disable && item.disable(formData[item.prop])"
              :picker-options="item.pickerOpts || ''"
              :default-time="item.defaultTime || '00:00:00'"
              :default-value="item.defaultValue || new Date()"
              @change="item.change ? item.change(formData[item.prop]) : ''"
            />

            <!-- 起止日期-yyyy-MM-dd -传值为数组 -->
            <el-date-picker
              v-if="item.type === 'DateRange' && !item.isHide"
              v-model="formData[item.prop]"
              :style="'width:' + (item.width || '100%')"
              :start-placeholder="item.startPlaceholder || '开始日期'"
              :end-placeholder="item.endPlaceholder || '结束日期'"
              :range-separator="item.separatorStr || '-'"
              :type="item.dateType || 'daterange'"
              :value-format="item.valueFormat || 'yyyy-MM-dd'"
              :format="item.labelFormat || 'yyyy-MM-dd'"
              :picker-options="item.pickerOpts || ''"
              @change="item.change ? item.change(formData[item.prop]) : ''"
            />

            <!-- 起止日期时间-yyyy-MM-dd HH:mm:ss -传值为数组 -->
            <el-date-picker
              v-if="item.type === 'DateTimeRange' && !item.isHide"
              v-model="formData[item.prop]"
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

            <!-- 日期起始范围选择器-封装
            显示date、yyyy-MM-dd，传值date-time、yyyy-MM-dd HH:mm:ss
            传值起、始 两个prop 起默认加时间00:00:00， 始默认加时间23:59:59
            -->
            <DateRange v-if="item.type === 'DateRangeSelf' && !item.isHide" :item="item" :form-data="formData" />
            <!-- 日期 时间起始范围选择器-封装-传值起、始 两个prop -->
            <DateTimeRange
              v-if="item.type === 'DateTimeRangeSelf' && !item.isHide"
              :item="item"
              :form-data="formData"
            />
            <!-- ---------------------------日期选择器 -->

            <!-- 时间选择器--------------------------- -->
            <!-- 时间（任意时间） -->
            <el-time-picker
              v-if="item.type === 'Time' && !item.isHide"
              v-model="formData[item.prop]"
              :style="'width:' + (item.width || '100%')"
              :placeholder="item.placeholder"
              :picker-options="item.pickerOpts || ''"
              @change="item.change ? item.change(formData[item.prop]) : ''"
            />
            <!-- 起止时间 -->
            <el-time-picker
              v-if="item.type === 'TimeRange' && !item.isHide"
              v-model="formData[item.prop]"
              is-range
              :style="'width:' + (item.width || '100%')"
              :start-placeholder="item.startPlaceholder || '开始日期'"
              :end-placeholder="item.endPlaceholder || '结束日期'"
              :range-separator="item.separatorStr || '-'"
              :picker-options="item.pickerOpts || ''"
              @change="item.change ? item.change(formData[item.prop]) : ''"
            />
            <!-- ---------------------------时间选择器 -->

            <!-- 滑块 -->
            <!-- <el-slider v-if="item.type === 'Slider'" v-model="formData[item.prop]" /> -->

            <!-- 开关 -->
            <el-switch
              v-if="item.type === 'Switch' && !item.isHide"
              v-model="formData[item.prop]"
              :style="'width:' + (item.width || '100%')"
              :disabled="item.disabled || false"
              @change="item.change ? item.change(formData[item.prop]) : ''"
            />
            <!-- 级联选择器 -->
            <el-cascader
              v-if="item.type === 'Cascader' && !item.isHide"
              ref="departList"
              v-model="formData[item.prop]"
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
              @change="getA($event, item)"
            />
            <CascaderTree
              v-if="item.type === 'CascaderTree' && !item.isHide"
              :item="item"
              :form-data="formData"
              :lazy-load-opts="lazyLoadOpts"
            />
            <!-- 树级下拉列表 -->
            <treeselect
              v-if="item.type === 'TreeSelect' && !item.isHide"
              v-model="formData[item.prop]"
              :multiple="item.multiple ? item.multiple : false"
              :options="item.options"
              :load-options="loadOptions"
              :placeholder="item.placeholder ? item.placeholder : '请选择' + item.label"
              :style="'width:' + (item.width || '100%')"
              :disabled="item.disabled || false"
              no-results-text="无匹配数据"
              no-options-text="无数据"
              no-children-text="无数据"
              @input="item.change ? item.change(formData[item.prop]) : ''"
            />
            <!-- 富文本 -->
            <quill-editor
              v-if="item.type === 'Editor' && !item.isHide"
              v-model="formData[item.prop]"
              class="myQuillEditor"
              :style="'width:' + (item.width || '100%')"
            />
          </el-form-item>
          <!-- button 操作按钮 -->
          <el-form-item v-if="isHandle" class="search_input_button">
            <el-button
              v-for="val in formHandle"
              v-show="!val.hide"
              :key="val.label"
              :type="val.type"
              :disabled="item.disabled || false"
              @click="val.handle()"
            >
              <span>{{ val.label }}</span>
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>

import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import DateRange from '../FilterCollapse/module/DateRange'
import DateTimeRange from '../FilterCollapse/module/DateTimeRange'
import Treeselect from '@riophae/vue-treeselect'
import CascaderTree from '@/components/CascaderTree'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  name: 'Form',
  components: { DateRange, DateTimeRange, Treeselect, CascaderTree, quillEditor },
  props: {
    layout: {
      type: Object,
      default: () => {
        return {
          gutter: undefined,
          span: undefined,
          xs: 24,
          sm: 12,
          md: 8,
          xl: 6
        }
      }
    }, // 布局
    labelWidth: { type: Number, default: 120 }, // 表单域标签的宽度
    labelPosition: { type: String, default: 'right' }, // 表单域标签的位置
    lazyLoadOpts: { type: Function, default: () => {} }, // 级联选择器数据动态加载方法
    loadOptions: { type: Function, default: () => {} }, // 树形下拉框数据加载方法
    cbgFilter: { type: Function, default: () => {} }, // 下拉网格 自定义搜索方法
    cbgRemote: { type: Function, default: () => {} }, // 下拉网格 自定义远程搜索方法
    inline: { type: Boolean, default: false }, // 是否行内表单模式
    size: { type: String, default: 'medium' }, // 表单内组件的尺寸
    formList: { type: Array, default: () => [] }, // 表单字段参数
    formData: { type: Object, default: () => {} }, // 表单数据对象
    formHandle: { type: Array, default: () => [] }, // 按钮数据
    isEdit: { type: Boolean, default: false }, // 是否为编辑状态
    isHandle: { type: Boolean, default: true } // 是否按钮操作
  },
  data() {
    return {
      isHideTooltip: true // 是否隐藏悬浮文字提示
    }
  },
  computed: {
    /** 解析表单的正则验证,
     * 两种验证数组：
     * （1）'addOnly为true'时为仅添加时验证 */
    rules() {
      const rules = this.formList.reduce((map, i) => {
        if (i.rules) {
          if (this.isEdit) {
            let arr = []
            i.rules.forEach(item => {
              if (!item.addOnly) {
                arr.push(item)
              }
            })
            map[i.prop] = arr
          } else {
            map[i.prop] = i.rules
          }
        }
        return map
      }, {})
      return rules
    }
  },
  methods: {
    /** 批量输入框回车格式化 回车替换成逗号 */
    formatBatch(val, prop) {
      // 回车时自动替换成逗号
      let reg = new RegExp('\n', 'g')
      this.formData[prop] = val.replace(reg, ',')
    },
    /** 文本-仅显示-超出宽度省略号显示-鼠标移入悬浮框查看,根据父级与子级宽度判断是否显示弹窗
     * 配置文件中tabIndex用于定位
     */
    onMouseOver(val, index) {
      if (val && val.length && index) {
        let parentWidth = val[index].offsetWidth
        let contentWidth = val[index].firstChild.offsetWidth
        if (parentWidth < contentWidth) {
          this.isHideTooltip = false
        } else {
          this.isHideTooltip = true
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
/* 下拉网格 */
.list-select-head {
  margin: 0 20px;
  text-align: left;
  margin-top: -6px;
  padding-top: 6px;
  position: absolute;
  background: #fff;
  z-index: 1;
  width: 100%;
}
.list-select-td {
  display: inline-block;
  /* width: 110px; */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-right: 5px;
}
.list-select-first {
  margin-top: 30px;
}
/* 条数提示 */
.list-select-tip {
  text-align: center;
  padding: 5px 0;
  color: #ccc;
  font-size: 13px;
}
/* (重写-覆盖)树级下拉列表多选 选中输入框整体不换行，超出高度宽度出现滚动条  */
.vue-treeselect /deep/ .vue-treeselect__multi-value {
  max-height: 200px;
  white-space: unset;
  line-height: 20px;
  margin-bottom: 1px;
}
/* 优化树级下拉列表高度比其他大1px，造成的后一个项转行问题 */
.vue-treeselect /deep/ .vue-treeselect__input-container {
  margin: -0.5px 0;
}

/* 文本，仅显示的 ，超出宽度省略号显示 */
.form-txt {
  width: 100%;
  overflow: hidden; /* 超出部分隐藏*/
  white-space: nowrap; /* 文字不换行*/
  text-overflow: ellipsis; /* 文字超出部分使用省略号代替*/
}

/** input数字输入框靠左 */
.search_input /deep/ .el-input-number .el-input__inner {
  text-align: left;
}

/** 富文本编辑器 */
// 给文本内容加高度，滚动条
.quill-editor /deep/ .ql-container {
    min-height: 320px;
  }

  .ql-container {
    min-height: 330px;
  }

 /deep/ {
    .ql-snow .ql-tooltip [data-mode="link"]::before {
      content: "请输入链接地址:";
      left: 0;
    }

    .ql-snow .ql-tooltip.ql-editing {
      left: 0 !important;
    }

    .ql-snow .ql-tooltip {
      left: 0 !important;
    }

    .ql-snow .ql-editor {
      max-height: 660px;
    }

    .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
      border-right: 0px;
      content: "保存";
      padding-right: 0px;
    }

    .ql-snow .ql-tooltip[data-mode="video"]::before {
      content: "请输入视频地址:";
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
      content: "标题1" !important;
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
      content: "标题2" !important;
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
      content: "标题3" !important;
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
      content: "标题4" !important;
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
      content: "标题5" !important;
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
      content: "标题6" !important;
    }

    img {
      filter: grayscale(100%);
      opacity: 1;
    }

    img:hover {
      filter: none;
      opacity: 0.9;
    }

    /*加上height和滚动属性就可以，滚动条样式是系统默认样式，可能不同*/
    .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options {
      border-color: #ccc;
      height: 125px;
      overflow: auto;
    }
  }
</style>
