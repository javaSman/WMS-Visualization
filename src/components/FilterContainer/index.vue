<template>
  <div>
    <el-form size="mini" :inline="true" :model="listQuery" class="filter-container" @submit.native.prevent>
      <el-form-item v-for="item in formItems" :key="item.index" :label="item.label">
        <FilterItem
          :item="item"
          :list-query="listQuery"
          :load-options="loadOptions"
          :filter-width="150"
          @handleFilter="handleFilter"
        />
        <!-- class="noMaskContainer" -->
      </el-form-item>
      <!-- '高级查询' -->
      <el-button-group v-if="highSearchList.length" class="noMaskContainer">
        <el-button size="mini" type="success" icon="el-icon-search" @click="handleFilter">
          {{ $t('button.search') }}
        </el-button>
        <el-button size="mini" type="success" :icon="arrow" @click="handleSearch" />
      </el-button-group>
      <!-- '搜索' -->
      <el-button v-else size="mini" type="success" icon="el-icon-search" class="noMaskContainer" @click="handleFilter">
        {{ $t('button.search') }}
      </el-button>
      <!-- '重置' -->
      <el-button size="mini" type="warning" icon="el-icon-refresh-left" class="noMaskContainer" @click="reset">
        {{ $t('button.reset') }}
      </el-button>
      <!-- '导出' -->
      <el-button
        v-if="hasDownload"
        :loading="downloadLoading"
        size="mini"
        type="info"
        icon="el-icon-download"
        @click="handleDownload"
      >
        {{ $t('button.export') }}
      </el-button>
    </el-form>
    <!-- 高级查询卡片 -->
    <transition name="el-zoom-in-top">
      <el-card v-show="cardVisible" class="highSearch-card">
        <Form
          id="searchForm"
          :form-data="listQuery"
          :form-list="highSearchList"
          :is-handle="false"
          :inline="true"
          :label-width="110"
          size="mini"
        />
      </el-card>
    </transition>
    <!-- 遮罩层 -->
    <div v-show="cardVisible" class="maskContainer" @click="cardVisible = false" />
  </div>
</template>
<script>
import FilterItem from '../FilterCollapse/module/FilterItem.vue'
import Form from '@/components/Form'
export default {
  name: 'FilterContainer',
  components: { Form, FilterItem },
  props: {
    formItems: { type: Array, default: () => [] }, // 查询条参数
    listQuery: { type: Object, default: () => {} }, // 查询条件
    hasDownload: { type: Boolean, default: false }, // 是否显示导出按钮
    downloadLoading: { type: Boolean, default: false }, // 导出加载状态
    loadOptions: { type: Function, default: () => {} }, // 树形下拉框数据加载方法
    highSearchList: { type: Array, default: () => [] } // 高级查询表单
  },
  data() {
    return {
      cardVisible: false // 是否显示高级查询卡片
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
    },
    /** 高级查询图标（向上/向下） */
    arrow() {
      if (this.cardVisible) {
        return 'el-icon-arrow-up'
      } else {
        return 'el-icon-arrow-down'
      }
    }
  },
  watch: {
    // cardVisible(val) {
    //     if (val) {
    //         document.addEventListener('click', this.clickOutSide, true)
    //     } else {
    //         document.removeEventListener('click', this.clickOutSide, true)
    //     }
    // }
  },
  /**  */
  methods: {
    /** 日期选择器 选定的值时触发，判断开始时间是否大于结束时间，并提示 */
    dataChange(item, param) {
      let startTime = new Date(this.listQuery[item.startProp]).getTime()
      let endTime = new Date(this.listQuery[item.endProp]).getTime()
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
      }
    },
    /** 搜索方法  */
    handleFilter() {
      this.cardVisible = false
      for (let item in this.listQuery) {
        // 下拉多选 字段prop后面命名加* 数组转逗号分隔字符串
        if (typeof this.listQuery[item] === 'object' && item.endsWith('*')) {
          let str = item.replace('*', '')
          this.$set(this.listQuery, str, this.listQuery[item].join(','))
        }
        // 批量输入 字段prop前命名加txt_' 回车转逗号
        if (item.startsWith('txt_')) {
          let str = item.replace('txt_', '')
          let reg = new RegExp('\n', 'g')
          let text = this.listQuery[item].replace(reg, ',')
          this.$set(this.listQuery, str, text)
        }
      }
      this.$emit('query', { page: 1, listQuery: this.listQuery })
    },
    /** 重置方法，调用父组件的自定义事件，清空查询条件，刷新到第一页  */
    reset() {
      this.$emit('reset', 0)
    },
    /** 点击高级搜索，展开箭头 */
    handleSearch() {
      this.cardVisible = !this.cardVisible // 切换高级查询展开状态
    },
    /** 点击导出按钮，调用父组件的自定义事件 */
    handleDownload() {
      this.$emit('toExport')
    }
    // clickOutSide(e) {
    //   // if (this.$el.contains(e.path[0])) {
    //   //     return
    //   // }
    //   console.log(e.path)
    //   if (!this.$el.contains(e.target)) {
    //     this.cardVisible = false // 点击外层，关闭查询条
    //   }
    // }
  }
}
</script>
<style>
/* 添加遮罩层 */
.maskContainer {
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
}
/* 遮罩层不遮挡 */
.noMaskContainer {
  position: relative;
  z-index: 3;
}
</style>
