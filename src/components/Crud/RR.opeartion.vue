<!--搜索与重置-->
<template>
  <span>
    <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <el-button
      v-if="optShow.reset"
      class="filter-item"
      size="mini"
      type="warning"
      icon="el-icon-refresh-left"
      @click="toReset"
    >
      重置
    </el-button>
  </span>
</template>
<script>
export default {
  props: {
    optShow: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    // 搜索
    toQuery() {
      this.$emit('toQuery')
    },
    // 重置
    toReset() {
      this.$emit('toReset')
    }
  }
}
</script>
