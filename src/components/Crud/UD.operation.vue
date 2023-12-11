<template>
  <div>
    <el-button
      v-permission="[permission.edit]"
      :disabled="optDisabled.edit"
      size="mini"
      type="primary"
      icon="el-icon-edit"
      @click="toEdit"
    />
    <el-button
      slot="reference"
      v-permission="[permission.del]"
      :disabled="optDisabled.del"
      type="danger"
      icon="el-icon-delete"
      size="mini"
      @click="toDelete"
    />
  </div>
</template>
<script>
import permission from '@/directive/permission/index.js'
export default {
  directives: { permission },
  props: {
    // data: {
    //   type: Object,
    //   required: true
    // },
    permission: {
      type: Object,
      required: true
    },
    optDisabled: {
      type: Object,
      default: () => {
        return {}
      }
    },
    row: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    // 删除
    toDelete() {
      this.$emit('toDelete', this.row)
    },
    // 修改
    toEdit() {
      this.$emit('toEdit', this.row)
    }
  }
}
</script>
