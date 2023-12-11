<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="10" :lg="11" :xl="11" style="margin-bottom: 10px">
        <el-card class="box-card">
          <div class="head-container">
            <filter-container :form-items="queryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
            <CrudOperation
              :permission-crud="DictCrud"
              :selection="multipleSelection"
              :save-loading.sync="saveLoading"
              @toAdd="handleCreate"
              @toEdit="handleUpdate()"
              @toDelete="handleDelete()"
            />
          </div>
          <Table
            v-loading="listLoading"
            :height="-1"
            :bottom-off-set="115"
            :data-list="list"
            :column="column"
            :selection.sync="multipleSelection"
            :total="totalCount"
            :page.sync="page"
            :limit.sync="listQuery.MaxResultCount"
            :is-sort="true"
            :sorting.sync="listQuery.Sorting"
            @tableSort="getList"
            @pagination="getList"
            @getDetail="getDetail"
          />
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="14" :lg="13" :xl="13">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <!-- '字典详情' -->
            <span>{{ $t('dialogHeader.dictDetails') }}</span>
            <CrudOperation
              style="float: right"
              :permission-crud="DictDetailCrud"
              :selection="multipleSelection"
              :disabled="multipleSelection.length != 1"
              :single-del="true"
              @toAdd="handleDetailAdd"
              @toSave="handleDetailSave()"
              @toDelete="handleDetailDelete()"
              @toReset="handleDetailReset()"
            />
          </div>
          <Table
            id="tableDetail"
            ref="tableDetail"
            v-loading="detailListLoading"
            :height="-1"
            :bottom-off-set="50"
            class="col-detail-table"
            row-key="id"
            :data-list="multipleSelection.length == 1 ? colTable : []"
            :selection.sync="detailSelection"
            :column="detailCol"
            :sortable.sync="sortable"
            :page-hidden="true"
          />
        </el-card>
      </el-col>
    </el-row>
    <EditForm
      :dialog-form-visible="dialogFormVisible"
      :form-title="formTitle"
      :form-list="formList"
      :form-data="form"
      :is-edit="isEdit"
      :api-name="apiName"
      @create="handleCreate"
      @cancel="cancel"
      @reset="reset"
    />
  </div>
</template>
<script>
import Table from '@/components/Table'
import EditForm from '@/components/EditDialog'
import CrudOperation from '@/components/Crud/CRUD.operation'
import { API } from '@/api/generalAPI'
import sortable from '@/mixins/sortable'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import { column, detailCol, formList, queryItems, DictCrud, DictDetailCrud } from './config'
export default {
  name: 'ColModel',
  components: { Table, EditForm, CrudOperation },
  mixins: [sortable, filterContainer, basics],
  data() {
    return {
      apiName: 'dict',
      apiNameDetail: 'dictDetails',
      dialogTitle: this.$t('dialogHeader.dict'), // '字典',

      column,
      detailCol,
      formList,
      queryItems,
      DictCrud,
      DictDetailCrud,
      API,

      dictID: '',
      // listQuery: {
      //   // Sorting: 'name',
      //   SkipCount: 0,
      //   MaxResultCount: 20
      // },
      form: {},
      dialogFormVisible: false,
      formTitle: '',
      isEdit: false,
      detailSelection: [],
      originalDetail: [], // 存放原数据，重置时恢复
      colTable: [],
      saveLoading: false,
      detailListLoading: false
    }
  },
  created() {},
  mounted() {
    this.rowDrop(document.querySelector('#tableDetail tbody'), 'colTable')
  },
  methods: {
    getDetail(row) {
      this.detailListLoading = true
      API.getData(this.apiNameDetail, { IsPage: false, pid: row.id }).then(res => {
        this.dictID = row.id
        this.originalDetail = JSON.parse(JSON.stringify(res.items))
        this.colTable = JSON.parse(JSON.stringify(res.items))
        this.$refs.tableDetail.$refs.tableForm.clearValidate()
        this.$refs.tableDetail.$refs.table.setCurrentRow()
        this.detailListLoading = false
      })
    },
    handleDetailAdd() {
      this.colTable.push({
        // sort: this.colTable.length,
        pid: this.dictID,
        changeType: 'add'
      })
    },
    handleDetailSave() {
      this.$refs.tableDetail.$refs.tableForm.validate(valid => {
        this.saveLoading = true

        if (!valid) {
          // '请确认输入无误'
          this.$message({ message: this.$t('notify.checkCorrect'), type: 'warning' })
          return false
        }
        if (!this.colTable.length) {
          // '没有可保存的数据'
          this.$message({ message: this.$t('notify.noData'), type: 'warning' })
          return
        }
        // 原表格无数据，则直接新增
        if (this.originalDetail.length) {
          this.originalDetail.map(item => {
            for (let i = 0; i < this.colTable.length; i++) {
              let row = this.colTable[i]
              if (row.changeType) {
                // 已有更新（即新增）则跳出遍历colTable循环
                break
              }
              if (row.id === item.id) {
                // 找到对应数据，若字段改变，则增加原字段；未修改，则跳出
                if (row.prop === item.prop && row.label === item.label) {
                  break
                } else {
                  row.changeType = 'update'
                  if (row.prop !== item.prop) {
                    row.originProp = item.prop
                  }
                  break
                }
              }
            }
          })
        }
        API.dataPost(this.apiNameDetail, this.colTable, 'EditAll').then(res => {
          this.$notify({
            title: this.$t('notify.success'), // '成功'
            message: this.$t('notify.saveSuccess'), // '保存成功'
            type: 'success',
            duration: 2000
          })
          this.getDetail(this.multipleSelection[0])
          // this.saveLoading = false
        })
      })
    },
    handleDetailReset() {
      this.colTable = JSON.parse(JSON.stringify(this.originalDetail))
      this.$refs.tableDetail.$refs.tableForm.clearValidate()
      this.$refs.tableDetail.$refs.table.setCurrentRow() // 取消当前行高亮
    },
    handleDetailDelete() {
      if (this.detailSelection.length === 0) {
        this.$message({
          message: this.$t('notify.notSelected'), // '未选择',
          type: 'warning'
        })
        return
      }
      // '确认删除选中项','提示'
      this.$confirm(this.$t('dialog.deleteTips'), this.$t('dialog.tip'), {
        confirmButtonText: this.$t('button.confirm'), // '确认'
        cancelButtonText: this.$t('button.cancel'), // '取消'
        type: 'warning'
      })
        .then(() => {
          let params = []
          this.detailSelection.forEach(element => {
            if (element.id) {
              params.push(element.id)
            }
            let index = this.colTable.indexOf(element)
            this.colTable.splice(index, 1)
          })
          if (params.length) {
            API.dataPost(this.apiNameDetail, params, 'Delete')
          }
          this.$notify({
            title: this.$t('notify.success'), // '成功'
            message: this.$t('notify.delSuccess'), // '删除成功'
            type: 'success',
            duration: 2000
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('notify.cancelDel') // '已取消删除'
          })
        })
    }
  }
}
</script>
