<template>
  <div class="head-container">
    <el-input
      v-model="filterText"
      clearable
      :size="size"
      placeholder="输入关键字进行过滤"
      prefix-icon="el-icon-search"
    />

    <el-tree
      ref="tree"
      class="filter-tree"
      :data="data"
      :props="defaultProps"
      :highlight-current="highlightCurrent"
      :filter-node-method="filterNode"
      :default-expand-all="defaultExpandAll"
      :expand-on-click-node="expandOnClickNode"
      :show-checkbox="showCheckbox"
      :accordion="accordion"
      @node-click="handleNodeClick"
    />
  </div>
</template>
<script>
export default {
  name: 'Tree',
  props: {
    // 输入框尺寸
    size: {
      type: String,
      default: 'small'
    },
    // 树形菜单数据
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 点击节点时是否高亮
    highlightCurrent: {
      type: Boolean,
      default: true
    },
    // 是否默认展开所有节点
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    // 点击节点的时候展开
    expandOnClickNode: {
      type: Boolean,
      default: true
    },
    // 展示复选框
    showCheckbox: {
      type: Boolean,
      default: false
    },
    // 是否每次只打开一个同级树节点
    accordion: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    // 搜索菜单
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    // 搜索菜单
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 菜单点击事件
    handleNodeClick(node) {
      this.$emit('handleNodeClick', node)
    }
  }
}
</script>
