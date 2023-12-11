<template>
  <!-- '选择' -->
  <el-dialog
    v-dialogDrag
    :width="dialogWidth + 'px'"
    :title="detailTitle + $t('dialog.select')"
    :close-on-click-modal="false"
    :visible.sync="isShow"
  >
    <div class="head-container">
      <filter-collapse
        :form-items="detailQueryItems"
        :list-query.sync="listQuery"
        :tile-max="4"
        :layout="layout"
        @query="getList"
        @reset="reset"
      />
    </div>
    <Table
      ref="table"
      v-loading="listLoading"
      :height="480"
      :data-list="list"
      :column="colName === '' ? detailColumn : column"
      :selection.sync="multipleSelection"
      :has-selection="true"
      :total="totalCount"
      :page.sync="page"
      :limit.sync="listQuery.MaxResultCount"
      :dict-gather="dictGather"
      @pagination="getList"
    />
    <div slot="footer" class="dialog-footer">
      <!-- '取消' -->
      <el-button size="small" type="text" @click="cancel">{{ $t('button.cancel') }}</el-button>
      <!-- '确认' -->
      <el-button size="small" type="primary" @click="save">{{ $t('button.confirm') }}</el-button>
    </div>
  </el-dialog>
</template>
<script>
import Table from '@/components/Table'
import basics from '@/mixins'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
export default {
  name: 'DetailOptDialog',
  components: { Table },
  mixins: [filterContainer, colDesign, basics],
  props: {
    dialogLoading: { type: Boolean }, // 弹窗显示
    dialogWidth: { type: Number, default: 1200 }, // 弹窗宽度
    detailTitle: { type: String, require: true, default: '' }, // 明细弹窗名称
    detailQueryItems: { type: Array, default: () => [] }, // 选择明细弹窗查询条件
    detailColumn: { type: Array, default: () => [] }, // 选择明细弹窗表头参数
    colName: { type: String, require: true, default: '' }, // 选择明细弹窗表头名称
    apiName: { type: String, require: true, default: '' } // 请求后端的api页面名称
    // dictGather: { type: Array, default: () => [] } // 数据字典集合
  },
  data() {
    return {
      layout: { span: 6 }
    }
  },
  computed: {
    isShow: {
      get() {
        return this.dialogLoading
      },
      set(val) {
        return this.$emit('update:dialogLoading', val)
      }
    }
  },
  methods: {
    /** 选择明细弹窗 关闭事件 */
    cancel() {
      this.$refs.table.$refs.table.clearSelection()
      this.isShow = false
    },
    /** 确定添加明细事件，调用父组件定义的自定义事件，将选中的数据，添加到明细表 */
    save() {
      let data = [...new Set(this.multipleSelection.map(row => row))]
      this.isShow = false
      this.$emit('addDetail', data)
    }
  }
}
</script>
