<template>
  <div style="position: relative">
    <el-badge :value="unread" :hidden="badgeHide" class="col-design-btn">
      <!-- '编辑列' -->
      <el-button type="text" icon="el-icon-set-up" :title="$t('dialogHeader.editColumn')" @click="handelColDesign" />
    </el-badge>
    <!-- '编辑列' -->
    <el-dialog
      v-dialogDrag
      :title="$t('dialogHeader.editColumn')"
      class="col-design-dialog"
      :width="dialogWidth + 'px'"
      :visible="show"
      :close-on-click-modal="false"
      @close="cancel"
    >
      <el-row v-if="!badgeHide">
        <div class="col-tips">
          <!-- '修改'，'新增' -->
          <div class="col-tip tip-edit">{{ $t('button.edit') }}</div>
          <div class="col-tip tip-add">{{ $t('button.add') }}</div>
        </div>
      </el-row>
      <el-row>
        <!-- '拖动至顶部隐藏' -->
        <el-col :span="9" class="col-design-hide">
          <Table
            :id="tid"
            ref="tableHide"
            row-key="id"
            class="col-detail-table"
            :empty-text="$t('notify.topHidden')"
            :height="630"
            :table-row-class-name="rowClassName"
            :column="columnHide"
            :data-list="colTableHide"
            :has-selection="false"
            :page-hidden="true"
          />
        </el-col>
        <!--
            :height="tableHideHeight"
        -->
        <el-col :span="15" class="col-design-show">
          <!-- '拖动至顶部显示' -->
          <Table
            :id="tid + '2'"
            ref="table"
            row-key="id"
            class="col-detail-table"
            :empty-text="$t('notify.topDisplay')"
            :table-row-class-name="rowClassName"
            :height="630"
            :column="columnShow"
            :data-list="colTable"
            :has-selection="false"
            :page-hidden="true"
            :sortable="sortable"
          />
        </el-col>
      </el-row>
      <!--:height="tableShowHeight"  -->
      <div slot="footer" class="dialog-footer">
        <!-- '恢复系统设置' -->
        <el-button size="small" icon="el-icon-refresh-left" style="float: left" @click="recoverCol">
          {{ $t('button.restore') }}
        </el-button>
        <!-- '取消' -->
        <el-button size="small" type="text" @click="cancel">{{ $t('button.cancel') }}</el-button>
        <!-- '确认' -->
        <el-button :loading="formLoading" size="small" type="primary" @click="save">
          {{ $t('button.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Table from '@/components/Table'
import sortable from '@/mixins/sortable'
import { columnShow, columnHide } from './config'
import { API } from '@/api/generalAPI'
export default {
  name: 'ColDesign',
  components: { Table },
  mixins: [sortable],
  props: {
    dialogWidth: { type: Number, default: 670 }, // 弹窗宽度
    colList: { type: Array, default: () => [] }, // 表格列
    tid: { type: String, default: 'table' } // 排序表格的id
  },
  data() {
    return {
      rowClassName: 'colUpdateRow',
      apiName: 'usertabletemplatedetail',
      formLoading: false,
      dataList: [], // 初始数据
      colTableHide: [], // 左表
      colTable: [], // 右表
      show: false,
      badgeHide: true, // 是否隐藏[修改和新增说明标签]
      tableHideHeight: null,
      tableShowHeight: null,
      columnShow, // 左表
      columnHide // 右表
    }
  },
  computed: {
    // 计算未读数量
    unread: {
      get() {
        let count = 0
        if (this.colList.length) {
          this.colList.map(item => {
            if (item.message) {
              count += 1
            }
          })
        }
        if (count) {
          this.showBadge()
        }
        return count || null
      },
      set(val) {
        return 0
      }
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.$nextTick(function () {
          // 设置表格等高
          let tableHideHeight = this.$refs.tableHide.$el.clientHeight
          let tableShowHeight = this.$refs.table.$el.clientHeight
          if (tableHideHeight > tableShowHeight) {
            this.tableShowHeight = tableHideHeight
          } else {
            this.tableHideHeight = tableShowHeight
          }
          // 两组表格间拖动
          this.groudDrop(document.querySelector('#' + this.tid + ' tbody'), 'colTableHide', 'colTable')
          // 表格行拖动
          this.rowDrop(document.querySelector('#' + this.tid + '2 tbody'), 'colTable', 'colTableHide')
        })
      } else {
        // 若关闭时有已读消息，清除/隐藏
        if (this.unread) {
          API.post(this.apiName, { templateName: this.colList[0].templateName }, 'ClearMessage').then(res => {
            if (res) {
              this.unread = 0
              this.badgeHide = true
              this.rowClassName = ''
            }
          })
        }
      }
    }
  },
  methods: {
    /** 展示修改和新增说明标签 */
    showBadge() {
      this.badgeHide = false // 显示未读数据
    },

    /** 恢复系统设置按钮方法 */
    recoverCol() {
      // '是否恢复至原始设置?','提示'
      this.$confirm(this.$t('dialog.colTips'), this.$t('dialog.tip'), {
        confirmButtonText: this.$t('button.confirm'), // '确认'
        cancelButtonText: this.$t('button.cancel'), // '取消'
        type: 'warning'
      })
        .then(() => {
          // 替换成系统列设置，后在页面重新根据sort调整数组顺序
          this.$refs.table.$refs.tableForm.clearValidate()
          this.$refs.table.$refs.table.setCurrentRow()
          let tableShow = []
          let tableHide = []
          this.dataList.map(item => {
            item.sort = item.originSort
            item.label = item.originLabel
            item.width = item.originWidth
            item.show = item.originShow
            if (item.originShow) {
              tableShow.push(item)
            } else {
              tableHide.push(item)
            }
          })
          this.colTable = tableShow
          this.colTableHide = tableHide
          // return
          // this.colTable.sort((a, b) => {
          //     return a.sort - b.sort
          // })
        })
        .catch(() => {
          return false
        })
    },

    /** 自定义列按钮 */
    handelColDesign() {
      this.show = true
      this.dataList = JSON.parse(JSON.stringify(this.colList))
      let tableShow = []
      let tableHide = []
      this.dataList.map(item => {
        if (item.show) {
          tableShow.push(item)
        } else {
          tableHide.push(item)
        }
      })
      this.colTable = tableShow
      this.colTableHide = tableHide
    },

    /** 取消按钮，关闭弹窗、移除表单项的校验结果、取消目前高亮行的选中状态  */
    cancel() {
      this.show = false
      this.$refs.table.$refs.tableForm.clearValidate()
      this.$refs.table.$refs.table.setCurrentRow()
    },
    /** 提交修改 */
    save() {
      this.$refs.table.$refs.tableForm.validate(valid => {
        // '请确认输入无误'
        if (!valid) {
          this.$message({ type: 'warning', message: this.$t('notify.checkCorrect') })
          return
        }
        // 合并隐藏与显示表
        this.dataList = this.colTable.concat(this.colTableHide)
        var i = 0
        if (this.dataList) {
          this.dataList.map(item => {
            item.sort = i
            i++
          })
        }
        API.dataPost(this.apiName, this.dataList, 'EditAll').then(res => {
          this.show = false
          this.$emit('update:tableShow', false)
          this.$emit('update:detailTableShow', false)
          this.$notify({
            title: this.$t('notify.success'), // '成功'
            message: this.$t('notify.saveSuccess'), // '保存成功',
            type: 'success',
            duration: 2000
          })
          this.$emit('resetCol', this.dataList)
          this.$emit('resetColDetail', this.dataList)
        })
      })
    }
  }
}
</script>
<style>
.col-design-dialog .el-dialog__body {
  padding: 0 20px;
}
.col-design-hide .el-table__body {
  color: #b1aeae;
}
.col-design-hide {
  padding-right: 20px;
  border-right: 1px solid #ccc;
}
.col-design-show {
  padding-left: 20px;
}
.col-design-hide tbody {
  height: 100%;
}
.col-tips {
  display: inline-flex;
  float: right;
  margin: 0 5px 10px;
  color: #909399;
}
.col-tip:before {
  content: '---';
  color: #fff0;
  margin: 0 5px 20px 20px;
}
.tip-edit:before {
  background-color: #b4e6ca;
}
.tip-add:before {
  background-color: #f2e8b7;
}
</style>
