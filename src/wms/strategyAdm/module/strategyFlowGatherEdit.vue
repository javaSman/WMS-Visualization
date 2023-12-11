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
      <div class="opts" style="margin-bottom: 20px">
        <!-- '新增明细' -->
        <el-button class="filter-item" size="mini" type="primary" plain icon="el-icon-plus" @click="handleAddDetail">
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
        size="small"
        :layout="layout"
        :inline="true"
        :form-data="formData"
        :form-list="formList"
        :is-handle="false"
        :is-edit="isEdit"
        :lazy-load-opts="lazyLoadOpts"
        :load-options="loadOptions"
        :cbg-filter="cbgFilter"
        :cbg-remote="cbgRemote"
        :label-width="120"
      />
      <Table
        ref="table"
        :height="400"
        :data-list.sync="dataList"
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
  </div>
</template>
<script>
import Table from '@/components/Table'
import Form from '@/components/Form'
import { API } from '@/api/generalAPI'
export default {
  name: 'Edit',
  components: { Table, Form },
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
    }, // 设置复选框 是否可以勾选
    lazyLoadOpts: { type: Function, default: () => {} }, // 级联选择器数据动态加载方法
    loadOptions: { type: Function, default: () => {} }, //  树形下拉框数据加载方法
    cbgFilter: { type: Function, default: () => {} }, // 下拉网格 自定义搜索方法
    cbgRemote: { type: Function, default: () => {} }, // 下拉网格 自定义远程搜索方法
    dialogFormVisible: { type: Boolean }, // 弹窗显示
    dialogWidth: { type: Number, default: 1500 }, // 弹窗宽度
    formTitle: { type: String, require: true, default: '' }, // 弹窗名称
    isEdit: { type: Boolean }, // 是否为编辑弹窗
    formData: { type: Object, default: () => {} }, // 表单数据
    formList: { type: Array, default: () => [] }, // 表单字段参数
    tableList: { type: Array, default: () => {} }, // 明细表格字段参数
    detailTable: { type: Array, default: () => [] }, // 表格数据
    apiName: { type: String, default: '' }, // 请求后端的api页面名称
    apiMethod: { type: String, default: 'EditAll' }, // 请求后端的api页面方法名
    api: { type: Object, default: () => {} }, // 非标接口-不同路由
    dictGather: { type: Array, default: () => [] }, // 数据字典集合
    submit: {
      type: Function,
      default: () => {
        return false
      }
    } // 自定义的提交事件
  },
  data() {
    return {
      formLoading: false, // 确认按钮加载状态
      isSave: false, // 是否保存（用于窗口关闭判断）
      hasAdd: false, // 此次操作是否添加过数据
      listLoading: false, //
      multipleSelection: [], // 表格复选框选中数据
      addContinue: false // 是否继续增加
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
    },
    dataList: {
      get() {
        let i = 0
        let ary = []
        this.detailTable.map(item => {
          ary.push(Object.assign({ tableID: i }, item))
          i++
        })
        return ary
      },
      set(val) {
        return val
      }
    }
  },
  created() {
    this.tableList.forEach(item => {
      switch (item.prop) {
        case 'strategyID': {
          item.change = (index, row) => {
            this.inputStrategyName(index, row)
          }
          break
        }
      }
    })
  },
  methods: {
    inputStrategyName(index, val) {
      console.log(index, val)
      console.log('this.dataList', this.dataList)
      this.tableList[2].options.forEach(item => {
        if (item.value === val) {
          this.dataList[index].strategyName = item.strategyName
        } else if (val === '') {
          this.dataList[index].strategyName = ''
        }
      })
    },
    /** 弹窗关闭事件，恢复字段初始值，重置表单、表格验证结果，复选框选项 */
    cancel() {
      this.isSave = false
      this.hasAdd = false
      this.show = false
      this.addContinue = true
      this.$refs.form.$refs.formList.clearValidate()
      this.$refs.table.$refs.tableForm.clearValidate()
      this.$refs.table.$refs.table.clearSelection()
    },
    /** 表单提交事件 */
    handleSubmit(api) {
      this.$refs.form.$refs.formList.validate(valid => {
        this.$refs.table.$refs.tableForm.validate(async tableValid => {
          if (valid && tableValid) {
            this.formLoading = true
            if (await this.submit(this.formData, this.dataList)) {
              this.formLoading = false
              return // 表单验证完后，若有自定义方法，则执行
            }
            let params = {
              header: this.formData,
              details: this.dataList
            }
            api
              .dataPost(this.apiName, params, this.apiMethod)
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
                  // this.$emit('reset',0)
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
    /** 确定按钮提交表单，判断是否非标接口 */
    save() {
      if (this.api) {
        this.handleSubmit(this.api)
      } else {
        this.handleSubmit(API)
      }
    },
    /** 新增明细按钮，新增一行空数据 */
    handleAddDetail() {
      this.dataList.push({ tableID: this.dataList.length })
    },
    /** 删除明细按钮，删除选中行数据 */
    handleDeleteDetail() {
      // '确认删除选中项','提示'
      this.$confirm(this.$t('dialog.deleteTips'), this.$t('dialog.tip'), {
        confirmButtonText: this.$t('button.confirm'), // '确认'
        cancelButtonText: this.$t('button.cancel'), // '取消'
        type: 'warning'
      }).then(() => {
        this.multipleSelection.map(item => {
          for (let i = 0; i < this.dataList.length; i++) {
            if (this.dataList[i].tableID === item.tableID) {
              this.dataList.splice(i, 1)
            }
          }
        })
        this.$refs.table.$refs.table.clearSelection()
      })
    }
  }
}
</script>
