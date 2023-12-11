<template>
  <el-dialog
    v-dialogDrag
    :title="detailTitle + $t('dialog.select')"
    width="1200px"
    :close-on-click-modal="false"
    :visible.sync="isShow"
  >
    <div class="filter-container">
      <el-input
        v-model="gatherID"
        size="mini"
        placeholder="流程集合序号..."
        style="width: 150px"
        class="filter-item"
        clearable
        @keyup.enter.native="handleFilter"
      />
      <!-- 搜索 -->
      <el-button size="mini" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter()">
        {{ $t('button.search') }}
      </el-button>
    </div>
    <Table
      ref="detailTable"
      v-loading="listLoading"
      :height="500"
      :data-list="dataList"
      :column="flowDetailColumn"
      :has-selection="false"
      :selection.sync="multipleSelection"
      :dict-gather="dictGather"
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
import { flowDetailColumn } from '../config'
import Functions from '@/utils/functions'
export default {
  name: 'DetailForm',
  components: { Table },
  props: {
    detailTitle: { type: String, require: true, default: '' },
    dialogLoading: { type: Boolean },
    detailAll: { type: Array, default: () => [] },
    dictGather: { type: Array, default: () => [] } // 数据字典集合
  },
  data() {
    return {
      flowDetailColumn,

      gatherID: '',
      listLoading: false,
      multipleSelection: [],
      dataList: JSON.parse(JSON.stringify(this.detailAll))
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
    handleFilter() {
      this.listLoading = true
      this.dataList = this.detailAll.filter(Functions.vagueQuery({ gatherID: this.gatherID }))
      this.listLoading = false
    },
    cancel() {
      this.$refs.detailTable.$refs.table.clearSelection()
      this.isShow = false
    },
    save() {
      let gatherIDs = [...new Set(this.multipleSelection.map(row => row.gatherID))]
      let same = this.detailAll.filter(row => {
        let hasGatherID = gatherIDs.find((val, i, arr) => {
          return val === row.gatherID
        })
        // row.realQty = 0 // 去除缓存盘点数量
        return hasGatherID // 返回所有相同箱号数据
      })
      this.isShow = false
      this.$emit('addDetail', same)
    }
  }
}
</script>
