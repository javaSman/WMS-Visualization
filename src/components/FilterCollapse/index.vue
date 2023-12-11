<template>
  <div class="filter-collapse">
    <!-- 平铺的查询栏--查询项条数小于等于6时（可配置tileMax） -->
    <el-form
      v-if="formItems.length <= tileMax || filterType === 'tiled'"
      size="mini"
      :inline="true"
      :model="listQuery"
      class="filter-container"
      @submit.native.prevent
    >
      <el-form-item v-for="item in formItems" :key="item.index" :label="item.label">
        <FilterItem
          :item="item"
          :list-query="listQuery"
          :lazy-load-opts="lazyLoadOpts"
          :load-options="loadOptions"
          :filter-width="150"
          @handleFilter="handleFilter"
        />
      </el-form-item>
      <FilterButton
        style="display: inline-block"
        :download-loading="downloadLoading"
        :has-download="hasDownload"
        @handleFilter="handleFilter"
        @reset="reset"
        @handleDownload="handleDownload"
      />
    </el-form>
    <!-- 可折叠查询栏--查询项条数大于6（可配置tileMax）时queryItems展开展示全部查询项，隐藏时展示5（可配置tileMax-1）条查询项-->
    <el-card v-else class="filter-collapse-card" shadow="hover">
      <el-form
        ref="formList"
        :size="size"
        :inline="inline"
        :model="listQuery"
        :label-width="labelWidth + 'px'"
        class="filter-form"
        @submit.native.prevent
      >
        <el-row :gutter="layout.gutter" class="query">
          <el-col
            v-for="item in queryItems"
            :key="item.prop"
            :span="item.layout ? item.layout.span : layout.span"
            :xs="item.layout ? item.layout.xs : layout.span ? undefined : layout.xs"
            :sm="item.layout ? item.layout.sm : layout.span ? undefined : layout.sm"
            :md="item.layout ? item.layout.md : layout.span ? undefined : layout.md"
            :xl="item.layout ? item.layout.xl : layout.span ? undefined : layout.xl"
          >
            <el-form-item :prop="item.prop" :label="item.label">
              <FilterItem
                :item="item"
                :list-query="listQuery"
                :load-options="loadOptions"
                :lazy-load-opts="lazyLoadOpts"
                @handleFilter="handleFilter"
              />
            </el-form-item>
          </el-col>
          <!-- 隐藏时按钮 -->
          <el-col
            v-show="!cardVisible"
            :span="layout.span ? layout.span : layout.span"
            :xs="layout.span ? undefined : layout.xs"
            :sm="layout.span ? undefined : layout.sm"
            :md="layout.span ? undefined : layout.md"
            :xl="layout.span ? undefined : layout.xl"
          >
            <FilterButton
              :download-loading="downloadLoading"
              :has-download="hasDownload"
              @handleFilter="handleFilter"
              @reset="reset"
              @handleDownload="handleDownload"
            />
          </el-col>
        </el-row>
        <!-- 展开时按钮 -->
        <FilterButton
          v-show="cardVisible"
          class="btn"
          :download-loading="downloadLoading"
          :has-download="hasDownload"
          @handleFilter="handleFilter"
          @reset="reset"
          @handleDownload="handleDownload"
        />
      </el-form>
      <!-- 查询栏展开和隐藏切换按钮行 -->
      <div class="expand" @click="handleSearch" @mouseenter="showText = true" @mouseleave="showText = false">
        <i :class="arrow" />
        <span v-if="cardVisible && showText">隐藏部分查询栏</span>
        <span v-else-if="showText">显示更多查询栏</span>
      </div>
    </el-card>
  </div>
</template>
<script>
import FilterItem from './module/FilterItem.vue'
import FilterButton from './module/FilterButton.vue'
export default {
  name: 'FilterCollapse',
  components: { FilterItem, FilterButton },
  props: {
    layout: {
      type: Object,
      default: () => {
        return {
          gutter: undefined,
          span: undefined,
          xs: 12,
          sm: 8,
          md: 6,
          lg: 4,
          xl: 4
        }
      }
    }, // 布局
    labelWidth: { type: Number, default: 100 }, // 表单域标签的宽度
    size: { type: String, default: 'mini' }, // 表单内组件的尺寸
    inline: { type: Boolean, default: false }, // 是否行内表单模式
    formItems: { type: Array, default: () => [] }, // 查询条参数
    listQuery: { type: Object, default: () => {} }, // 查询条件
    hasCollapse: { type: Boolean, default: false }, // 是否显示导出按钮
    hasDownload: { type: Boolean, default: false }, // 是否显示导出按钮
    downloadLoading: { type: Boolean, default: false }, // 导出加载状态
    lazyLoadOpts: { type: Function, default: () => {} }, // 级联选择器数据动态加载方法
    loadOptions: { type: Function, default: () => {} }, // 树形下拉框数据加载方法
    filterType: { type: String, default: '' }, // 查询栏类型
    tileMax: { type: Number, default: 6 } // 不超过时平铺
  },
  data() {
    return {
      queryItems: this.formItems, // 初始查询栏条目
      showText: false, // 查询栏展开和隐藏切换按钮行，文本提示是否显示
      cardVisible: true // 查询栏是否展开显示
    }
  },
  computed: {
    /** 查询栏切换显示图标（向上/向下） */
    arrow() {
      if (this.cardVisible) {
        return 'el-icon-caret-top'
      } else {
        return 'el-icon-caret-bottom'
      }
    }
  },
  watch: {},
  methods: {
    /** 搜索方法  */
    handleFilter() {
      this.$emit('query', { page: 1 })
    },
    /** 重置方法，调用父组件的自定义事件，清空查询条件，刷新到第一页  */
    reset() {
      // 已修改
      this.$emit('reset', 0)
    },
    /** 切换查询展开状态 */
    handleSearch() {
      this.cardVisible = !this.cardVisible
      // 切换查询项显示条数
      if (this.cardVisible) {
        this.queryItems = this.formItems
      } else {
        this.queryItems = this.formItems.slice(0, this.tileMax - 1)
      }
    },
    /** 点击导出按钮，调用父组件的自定义事件 */
    handleDownload() {
      this.$emit('toExport')
    }
  }
}
</script>
<style scoped>
.filter-collapse-card {
  margin-bottom: 10px;
}
.filter-collapse-card /deep/ .el-card__body {
  padding: 0px;
}
.filter-form {
  margin-top: 10px;
}
.filter-form /deep/ .el-form-item--mini.el-form-item {
  margin-bottom: 5px;
}
.btn {
  text-align: center;
  margin: 0 auto;
}
.expand {
  cursor: pointer;
  margin-top: 5px;
  padding: 5px 0;
  border-top: 1px solid #e6ebf5;
  text-align: center;
  color: #c4c4c4;
}
.expand:hover {
  background: #f8f8f8;
  color: rgb(0, 162, 255);
}
</style>
