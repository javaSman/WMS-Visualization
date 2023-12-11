<template>
  <div class="opts">
    <span class="crud-opts-left">
      <!--左侧插槽-->
      <slot name="left" />
      <!-- 标准按钮-新增、保存、修改、批量更新、重置密码、审核、导入、导出、打印、补打、删除、重置-->
      <!-- '新增' -->
      <el-button
        v-if="permissionCrud && permissionCrud.add"
        v-permission="[permissionCrud.add]"
        :disabled="disabled === null ? false : disabled"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="toClick('toAdd')"
      >
        {{ $t('button.add') }}
      </el-button>
      <!-- '保存' -->
      <el-button
        v-if="permissionCrud && permissionCrud.save"
        v-permission="[permissionCrud.save]"
        :disabled="disabled === null ? selection.length === 0 : disabled"
        :loading="saveLoading"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-check"
        @click="toClick('toSave')"
      >
        {{ $t('button.save') }}
      </el-button>
      <!-- '修改' -->
      <el-button
        v-if="permissionCrud && permissionCrud.edit"
        v-permission="[permissionCrud.edit]"
        :disabled="disabled === null ? selection.length !== 1 : disabled"
        class="filter-item"
        size="mini"
        type="success"
        icon="el-icon-edit"
        @click="toClick('toEdit')"
      >
        {{ $t('button.edit') }}
      </el-button>
      <!-- '批量更新'  -->
      <el-button
        v-if="permissionCrud && permissionCrud.batchUpdate"
        v-permission="[permissionCrud.batchUpdate]"
        :disabled="disabled === null ? selection.length === 0 : disabled"
        class="filter-item"
        size="mini"
        type="info"
        icon="el-icon-finished"
        @click="toClick('toBatchUpdate')"
      >
        {{ $t('button.batchUpdate') }}
      </el-button>
      <!-- '重置密码' -->
      <el-button
        v-if="permissionCrud && permissionCrud.edit"
        v-permission="[permissionCrud.RePassword]"
        :disabled="disabled === null ? selection.length !== 1 : disabled"
        class="filter-item"
        size="mini"
        type="warning"
        icon="el-icon-edit"
        @click="toClick('toRePassword')"
      >
        {{ $t('button.rePassword') }}
      </el-button>
      <!-- '审核' -->
      <el-button
        v-if="permissionCrud && permissionCrud.audit"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-finished"
        @click="toClick('toAudit')"
      >
        {{ $t('button.audit') }}
      </el-button>
      <!-- '导入' -->
      <el-button
        v-if="permissionCrud && permissionCrud.import"
        v-permission="[permissionCrud.import]"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-download"
        @click="toClick('toImport')"
      >
        {{ $t('button.import') }}
      </el-button>
      <!-- '导出' -->
      <el-button
        v-if="permissionCrud && permissionCrud.download"
        v-permission="[permissionCrud.download]"
        :loading="downloadLoading"
        class="filter-item"
        size="mini"
        type="warning"
        icon="el-icon-download"
        @click="toClick('toExport')"
      >
        {{ $t('button.export') }}
      </el-button>
      <!-- '打印' -->
      <el-button
        v-if="permissionCrud && permissionCrud.print"
        v-permission="[permissionCrud.print]"
        :disabled="disabled === null ? selection.length === 0 : disabled"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-printer"
        @click="toClick('toPrint')"
      >
        {{ $t('button.print') }}
      </el-button>
      <!-- '补打' -->
      <el-button
        v-if="permissionCrud && permissionCrud.reprint"
        v-permission="[permissionCrud.reprint]"
        :disabled="disabled === null ? selection.length === 0 : disabled"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-printer"
        @click="toClick('toReprint')"
      >
        {{ $t('button.reprint') }}
      </el-button>
      <!-- '删除' -->
      <el-button
        v-if="permissionCrud && permissionCrud.del"
        slot="reference"
        v-permission="[permissionCrud.del]"
        :disabled="singleDel ? selection.length !== 1 : selection.length === 0"
        class="filter-item"
        type="danger"
        icon="el-icon-delete"
        size="mini"
        :loading="delAllLoading"
        @click="toClick('toDelete')"
      >
        {{ $t('button.delete') }}
      </el-button>
      <!-- '重置' -->
      <el-button
        v-if="permissionCrud && permissionCrud.reset"
        v-permission="[permissionCrud.reset]"
        :disabled="disabled === null ? selection.length === 0 : disabled"
        class="filter-item"
        size="mini"
        type="dashed"
        icon="el-icon-refresh-left"
        @click="toClick('toReset')"
      >
        {{ $t('button.reset') }}
      </el-button>
      <!-- 非标按钮 -->
      <el-button
        v-for="(item, index) in buttonItems"
        :key="index"
        v-permission="[item.permission || 'any']"
        :disabled="
          disabled !== null
            ? disabled
            : item.disabled === 'single'
              ? selection.length !== 1
              : item.disabled === 'multipe'
                ? selection.length === 0
                : item.disabled === 'all'
                  ? false
                  : false
        "
        :type="item.styleType"
        :icon="item.icon"
        :loading="item.loading"
        :round="item.round || false"
        :plain="item.plain || false"
        :circle="item.circle || false"
        :size="item.size || 'mini'"
        class="filter-item"
        @click="toClick(item.clickFun)"
      >
        {{ $t(item.langLabel) || item.label }}
      </el-button>
      <!--右侧-->
      <slot name="right" />
    </span>
  </div>
</template>
<script>
import permission from '@/directive/permission/index.js'
export default {
  directives: { permission },
  props: {
    buttonItems: { type: Array, default: () => [] }, // 非标查询条参数
    permissionCrud: { type: Object, default: () => {} }, // 按钮权限配置
    selection: { type: Array, default: () => [] }, // 表格选中项，用于按钮禁
    disabled: { type: Boolean, default: null }, // 是否禁用
    singleDel: { type: Boolean, default: false }, // 是否仅支持删除一条记录，不支持批量删除
    downloadLoading: { type: Boolean, default: false }, // 导出按钮加载状态
    saveLoading: { type: Boolean, default: false } // 保存按钮加载状态
  },
  data() {
    return {
      delAllLoading: false
    }
  },
  watch: {},
  created() {},
  methods: {
    // // 添加
    // toAdd() {
    //   this.$emit('toAdd')
    // },
    toClick(fun) {
      this.$emit(fun)
    }
  }
}
</script>
<style scoped>
.opts {
  padding-bottom: 10px;
}
</style>
