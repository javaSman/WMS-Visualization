<template>
  <div>
    <el-link :type="type" :href="href" :target="target" :icon="icon" :underline="underline" :disabled="disabled">
      {{ label }}
    </el-link>
  </div>
</template>
<script>
export default {
  name: 'Link',
  props: {
    label: {
      type: String,
      default: ''
    }, // 超链接名称
    type: {
      type: String,
      default: 'primary'
    }, //	类型	string	primary / success / warning / danger / info	default
    href: { type: String, default: undefined }, // 原生 href 属性
    target: {
      type: String,
      default: '_self'
    }, // 打开的位置 _self / _blank / _parent / _top
    icon: { type: String, default: undefined }, // 图标类名
    underline: { type: Boolean, default: false }, // 是否下划线	boolean
    disabled: { type: Boolean, default: false } // 是否禁用状态	boolean
  }
}
</script>
