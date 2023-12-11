<template>
  <div>
    <el-dialog
      v-dialogDrag
      :width="dialogWidth + 'px'"
      :visible.sync="show"
      :close-on-click-modal="false"
      :title="formTitle"
      @close="cancel"
    >
      <!-- '新增明细' -->
      <div class="opts" style="margin-bottom: 20px">
        <el-button
          class="filter-item"
          size="mini"
          type="primary"
          plain
          icon="el-icon-plus"
          @click="handleSelectDetail()"
        >
          {{ $t('button.addDetail') }}
        </el-button>
        <!-- '删除明细' -->
        <el-button
          :disabled="multipleSelection.length === 0"
          class="filter-item"
          size="mini"
          type="danger"
          plain
          icon="el-icon-delete"
          @click="handleDeleteDetail()"
        >
          {{ $t('button.delDetail') }}
        </el-button>
      </div>
      <Form
        ref="form"
        :inline="true"
        :form-data="formData"
        :form-list="formList"
        :is-handle="false"
        size="small"
        :label-width="120"
        :layout="layout"
        :is-edit="isEdit"
        :lazy-load-opts="lazyLoadOpts"
        :load-options="loadOptions"
        :cbg-filter="cbgFilter"
        :cbg-remote="cbgRemote"
      />
      <Table
        ref="detailTable"
        :height="450"
        :data-list="detailTable"
        :column="tableList"
        :selection.sync="multipleSelection"
        :selectable="selectable"
        :dict-gather="dictGather"
      />
      <div slot="footer" class="dialog-footer">
        <!-- '继续新增' -->
        <el-checkbox v-if="!isEdit" v-model="addContinue" class="continue-add">
          {{ $t('button.continueAdd') }}
        </el-checkbox>
        <!-- '取消' -->
        <el-button size="small" type="text" @click="show = false">{{ $t('button.cancel') }}</el-button>
        <!-- '确认' -->
        <el-button :loading="formLoading" size="small" type="primary" @click="save">
          {{ $t('button.confirm') }}
        </el-button>
      </div>
    </el-dialog>
    <DetailOptDialog
      v-if="detailListLoading"
      :detail-title="detailTitle"
      :dialog-loading.sync="detailListLoading"
      :detail-query-items="detailQueryItems"
      :col-name="colDetailName"
      :api-name="apiDetailName"
      @addDetail="addDetail"
    />
    <!-- :dict-gather="dictGather" -->
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import Table from '@/components/Table'
import DetailOptDialog from '@/components/DetailOptDialog'
import Form from '@/components/Form'
import { API } from '@/api/generalAPI'
export default {
  name: 'EditDetailOptDialog',
  components: { Table, DetailOptDialog, Form },
  props: {
    layout: {
      type: Object,
      default: () => {
        return { span: 6 }
      }
    }, // 布局
    selectable: {
      type: Function,
      default: () => {
        return true
      }
    }, // 设置复选框 是否可以勾选方法
    submit: {
      type: Function,
      default: () => {
        return false
      }
    }, // 自定义的提交事件
    lazyLoadOpts: { type: Function, default: () => {} }, // 级联选择器数据动态加载方法
    loadOptions: { type: Function, default: () => {} }, // 树形下拉框数据加载方法
    cbgFilter: { type: Function, default: () => {} }, //  下拉网格 自定义搜索方法
    cbgRemote: { type: Function, default: () => {} }, // 下拉网格 自定义远程搜索方法
    dialogFormVisible: { type: Boolean }, // 弹窗显示
    dialogWidth: { type: Number, default: 1200 }, // 弹窗宽度
    formTitle: { type: String, require: true, default: '' }, // 弹窗名称
    isEdit: { type: Boolean }, // 是否为编辑弹窗
    formData: { type: Object, default: () => {} }, // 表单数据
    formList: { type: Array, default: () => [] }, // 表单字段参数
    tableList: { type: Array, default: () => {} }, // 明细表格字段参数
    detailTable: { type: Array, default: () => [] }, // 表格数据
    apiName: { type: String, default: '' }, // 请求后端的api页面名称

    // 选择明细弹窗
    checkParams: { type: String, require: true, default: '' }, // 去重检验参数
    detailTitle: { type: String, require: true, default: '' }, // 选择明细弹窗 名称
    detailQueryItems: { type: Array, default: () => [] }, // 选择明细弹窗查询条件
    detailColumn: { type: Array, default: () => [] }, // 选择明细弹窗表头参数
    colDetailName: { type: String, require: true, default: '' }, // 选择明细弹窗表头名称
    apiDetailName: { type: String, require: true, default: '' }, // 选择明细弹窗 请求后端的api页面名称
    regainDetail: { type: Function, default: () => {} }, // 重写添加明细的数据方法
    dictGather: { type: Array, default: () => [] } // 数据字典集合
  },
  data() {
    return {
      formLoading: false, // 确认按钮加载状态
      isSave: false, // 是否保存（用于窗口关闭判断）
      hasAdd: false, // 此次操作是否添加过数据
      multipleSelection: [], // 表格复选框选中项
      addContinue: true, // 是否继续增加
      detailListLoading: false // 选择明细弹窗 加载状态
    }
  },

  computed: {
    show: {
      get() {
        return this.dialogFormVisible
      },
      set(val) {
        let data = { dialogFormVisible: val, isSave: this.isSave, hasAdd: this.hasAdd, isEdit: this.isEdit }
        return this.$emit('cancel', data)
      }
    }
  },
  created() {},
  methods: {
    /** 弹窗关闭事件，恢复字段初始值，重置表单验证结果，复选框选项 */
    cancel() {
      this.isSave = false
      this.hasAdd = false
      this.show = false
      this.addContinue = true
      this.$refs.form.$refs.formList.clearValidate()
      this.$refs.detailTable.$refs.table.clearSelection()
    },
    save() {
      this.$refs.form.$refs.formList.validate(valid => {
        this.$refs.detailTable.$refs.tableForm.validate(async tableValid => {
          if (valid && tableValid) {
            this.formLoading = true
            if (await this.submit(this.formData)) {
              this.formLoading = false
              return // 表单验证完后，若有自定义方法，则执行
            }
            let params = {
              header: this.formData,
              details: this.detailTable,
              customerEditorID: Cookies.get('CustomerUser')
            }
            API.dataPost(this.apiName, params, 'editAll')
              .then(res => {
                this.formLoading = false
                this.$notify({
                  title: this.$t('notify.success'), // '成功'
                  // ? '更新成功' : '新增成功',
                  message: this.isEdit ? this.$t('notify.editSuccess') : this.$t('notify.addSuccess'),
                  type: 'success',
                  duration: 2000
                })
                this.isSave = true
                // 新增 继续增加
                if (!this.isEdit && this.addContinue) {
                  this.hasAdd = true
                  this.$emit('create')
                  this.$emit('update:formData', {})
                  this.$emit('update:detailTable', [])
                  // this.$emit('reset', 0)
                } else if (this.isEdit) {
                  // 编辑
                  this.show = false
                  this.addContinue = true
                } else {
                  // 新增 不继续增加
                  // this.$emit('reset', 0)
                  this.show = false
                  this.addContinue = true
                }
              })
              .catch(() => {
                this.formLoading = false
              })
          }
        })
      })
    },
    /** 新增明细按钮，打开选择明细弹窗 */
    handleSelectDetail() {
      this.detailListLoading = true
    },
    /** 删除明细按钮，删除选中行数据 */
    handleDeleteDetail() {
      // '确认删除选中项','提示'
      this.$confirm(this.$t('dialog.deleteTips'), this.$t('dialog.tip'), {
        confirmButtonText: this.$t('button.confirm'), // '确认'
        cancelButtonText: this.$t('button.cancel'), // '取消'
        type: 'warning'
      }).then(() => {
        let data = this.detailTable
        this.multipleSelection.map(item => {
          for (let i = 0; i < data.length; i++) {
            if (data[i].id === item.id) {
              data.splice(i, 1)
            }
          }
        })
        this.$emit('update:detailTable', data)
      })
    },
    /** 从选择弹窗选择数据后，
     * 若指定去重参数checkParams，去重后添加，
     * 否则直接添加到主从表弹窗
     * */
    addDetail(data) {
      let addArr = []
      let newArr = []
      // 重写添加明细的数据方法
      this.$emit('regainDetail', data)
      // 若指定去重参数checkParams，去重后添加
      if (this.checkParams === '') {
        newArr = this.detailTable.concat(data)
      } else {
        if (data && data.length) {
          data.forEach(item => {
            let isContain = false
            for (let i = 0; i < this.detailTable.length; i++) {
              if (item[`${this.checkParams}`] === this.detailTable[i][`${this.checkParams}`]) {
                isContain = true
                break
              } else {
                isContain = false
              }
            }
            if (!isContain) {
              addArr.push(item)
            }
          })
        }
        newArr = this.detailTable.concat(addArr)
      }
      this.$emit('update:detailTable', newArr)
    }
  }
}
</script>
