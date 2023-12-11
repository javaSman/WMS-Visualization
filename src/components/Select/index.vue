<template>
  <el-select
    :value="value"
    :placeholder="setSelectText"
    filterable
    clearable
    :style="{ width: width + 'px' }"
    @change="onChange"
  >
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>
<script>
export default {
  name: 'Select',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: { type: String, default: () => '' },
    options: { type: Array, default: () => [] },
    placeholder: { type: String, default: () => '' },
    width: { type: Number, default: () => 184 }
  },
  computed: {
    setSelectText() {
      return this.placeholder || '请选择'
    }
  },
  methods: {
    onChange(val) {
      this.$emit('change', val)
    }
  }
}
</script>
