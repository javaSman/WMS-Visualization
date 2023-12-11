<template>
  <div>
    <el-button size="mini" type="success" icon="el-icon-search" @click="handleFilter">
      {{ $t('button.search') }}
    </el-button>
    <!-- '重置' -->
    <el-button size="mini" type="warning" icon="el-icon-refresh-left" @click="reset">
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
  </div>
</template>
<script>
export default {
  name: 'FilterButton',
  props: {
    hasDownload: { type: Boolean, default: false }, // 是否显示导出按钮
    downloadLoading: { type: Boolean, default: false } // 导出加载状态
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    handleFilter() {
      this.$emit('handleFilter')
    },
    reset() {
      this.$emit('reset')
    },
    handleDownload() {
      this.$emit('handleDownload')
    }
  }
}
</script>
<style scoped>
</style>
