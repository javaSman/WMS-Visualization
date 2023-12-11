<template>
  <div>
    <el-dialog
      v-dialogDrag
      width="1400px"
      :visible.sync="show"
      :close-on-click-modal="false"
      :title="formTitle"
      @close="cancel"
    >
      <div class="opts" style="margin-bottom: 20px">
        <!--   '新增明细' -->
        <el-button
          class="filter-item"
          size="mini"
          type="primary"
          plain
          icon="el-icon-plus"
          :disabled="detailTable.length !== 0"
          @click="handleSelectDetail()"
        >
          {{ $t('button.addDetail') }}
        </el-button>
        <!--   '删除明细' -->
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
        :is-edit="isEdit"
        size="small"
        :label-width="90"
        :layout="{ span: 8 }"
      />
      <Table
        ref="detailTable"
        :height="500"
        :data-list="detailTable"
        :column="tableList"
        :selection.sync="multipleSelection"
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
    <DetailForm
      v-if="detailListLoading"
      :dialog-loading.sync="detailListLoading"
      :detail-all="details"
      @addDetail="addDetail"
    />
  </div>
</template>
<script>
import Table from '@/components/Table'
import DetailForm from './flowDetailEdit'
import Form from '@/components/Form'
import { API } from '@/api/generalAPI'
import { flowTableList } from '../config'

export default {
  name: 'InventoryOrderForm',
  components: { Table, DetailForm, Form },
  props: {
    dialogFormVisible: { type: Boolean },
    formTitle: { type: String, require: true, default: '' },
    formData: { type: Object, default: () => {} },
    isEdit: { type: Boolean },
    formList: { type: Array, default: () => [] },
    detailAll: { type: Array, default: () => [] },
    apiName: { type: String, default: '' },
    tableList: { type: Array, default: () => {} },
    detailTable: { type: Array, default: () => [] },
    dictGather: { type: Array, default: () => [] } // 数据字典集合
  },
  data() {
    return {
      flowTableList,
      formLoading: false,
      isSave: false,
      hasAdd: false,
      detailListLoading: false,
      addContinue: false,
      multipleSelection: [],
      originalDetail: this.detailTable
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
    details() {
      if (!this.detailTable.length) {
        return this.detailAll
      } else {
        return this.exclude(this.detailTable, this.detailAll)
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
    this.flowTableList.forEach(item => {
      switch (item.prop) {
        case 'strategyValue': {
          item.visibleChange = (index, row) => {
            API.getData('strategyDetails', { StrategyID: row.strategyID, isPage: false }).then(res => {
              this.flowTableList[3].options = res.items
              this.flowTableList[3].options.forEach(item => {
                item.value = item.strategyValue
                item.label = item.strategyValue
              })
            })
          }
          break
        }
      }
    })
  },
  methods: {
    // inputStrategyName(index, val) {
    //   this.tableList[3].options.forEach(item => {
    //     if (item.value === val) {
    //       this.detailTable[index].strategyName = item.strategyName
    //     } else if (val === '') {
    //       this.detailTable[index].strategyName = ''
    //     }
    //   })
    // },
    exclude(data, dataAll) {
      // console.log('exclude', data, dataAll)
      // 去重，从dataAll中过滤掉data
      let gatherIDs = [...new Set(data.map(row => row.gatherID))] // 筛选出已选箱号（箱号去重）
      let diff = dataAll.filter(row => {
        let hasGatherID = gatherIDs.find((val, i, arr) => {
          return val === row.gatherID
        })
        return !hasGatherID // 返回无已选箱子的数据
      })
      return diff // 过滤已选数据
    },
    addDetail(data) {
      // console.log('addDetail', data)
      this.$emit('update:detailTable', this.detailTable.concat(data)) // 合并已选明细
    },
    handleSelectDetail() {
      this.detailListLoading = true
    },
    handleDeleteDetail() {
      // 从现有明细中，排除含有已选箱子的数据，更新现有明细
      this.$emit('update:detailTable', this.exclude(this.multipleSelection, this.detailTable))
    },
    cancel() {
      this.isSave = false
      this.hasAdd = false
      this.show = false
      this.addContinue = true
      this.$refs.form.$refs.formList.clearValidate()
      this.$refs.detailTable.$refs.table.clearSelection()
      this.$emit('update:detailTable', this.originalDetail) // 恢复原数据
    },
    save() {
      // console.log(this.detailTable)
      // console.log(this.detailAll)
      // let params = this.detailTable
      // params.forEach(item => {
      //   item.flowID = this.formData.flowID
      //   item.flowName = this.formData.flowName
      //   item.strategyType = this.formData.strategyType
      // })
      let params = {
        header: this.formData,
        details: this.detailTable
      }
      this.$refs.form.$refs.formList.validate(valid => {
        this.$refs.detailTable.$refs.tableForm.validate(tableValid => {
          if (valid && tableValid) {
            this.formLoading = true
            API.dataPost(this.apiName, params, 'EditAll')
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
                  // this.$emit('update:formData', {})
                  // this.$emit('update:detailTable', [])
                } else if (this.isEdit) {
                  // 编辑
                  this.show = false
                  this.addContinue = true
                } else {
                  // 新增 不继续增加
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
    }
  }
}
</script>
