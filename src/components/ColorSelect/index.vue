<template>
  <div class="block">
    <el-color-picker
      :value="color"
      :size="size"
      :show-alpha="showAlpha"
      :predefine="predefineColors"
      :disabled="disabled"
      @change="colorChange"
    />
  </div>
</template>
<script>
export default {
  name: 'ColorSelect',
  props: {
    // 颜色
    color: {
      type: String,
      default: '#ff8c00'
    },
    // 尺寸
    size: {
      type: String,
      default: 'small'
    },
    // 是否支持透明度选择
    showAlpha: {
      type: Boolean,
      default: false
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 预定义颜色
    predefineColors: {
      type: Array,
      default: () => {
        return [
          '#ff4500',
          '#ff8c00',
          '#ffd700',
          '#90ee90',
          '#00ced1',
          '#1e90ff',
          '#c71585',
          'rgba(255, 69, 0, 0.68)',
          'rgb(255, 120, 0)',
          'hsv(51, 100, 98)',
          'hsva(120, 40, 94, 0.5)',
          'hsl(181, 100%, 37%)',
          'hsla(209, 100%, 56%, 0.73)'
        ]
      }
    }
  },
  methods: {
    // 颜色变化时触发
    colorChange(e) {
      this.$emit('colorChange', e)
    }
  }
}
</script>
