<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="10" :lg="11" :xl="11" style="margin-bottom: 10px">
        <el-card class="box-card">
          <div class="head-container">
            <filter-container :form-items="queryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
            <CrudOperation
              :permission-crud="TableTemplateCrud"
              :selection="multipleSelection"
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
            <!-- '列模板详情' -->
            <span>{{ $t('dialogHeader.colTemplateDetails') }}</span>
            <CrudOperation
              style="float: right"
              :permission-crud="TableTemplateDetailCrud"
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
import { column, detailCol, formList, queryItems, TableTemplateCrud, TableTemplateDetailCrud } from './config'
export default {
  name: 'ColModel',
  components: { Table, EditForm, CrudOperation },
  mixins: [sortable, filterContainer, basics],
  data() {
    return {
      apiName: 'tabletemplate',
      apiNameDetail: 'tabletemplatedetail',
      dialogTitle: this.$t('dialogHeader.colTemplate'), // '列模板',

      column,
      detailCol,
      formList,
      queryItems,
      TableTemplateCrud,
      TableTemplateDetailCrud,

      templateName: '',
      listQuery: {
        Sorting: 'templateName',
        SkipCount: 0,
        MaxResultCount: 20
      },
      form: {},
      dialogFormVisible: false,
      formTitle: '',
      isEdit: false,
      detailSelection: [],
      originalDetail: [], // 存放原数据，重置时恢复
      colTable: [],
      detailListLoading: false
    }
  },
  created() {
    this.getDict()
  },
  mounted() {
    this.rowDrop(document.querySelector('#tableDetail tbody'), 'colTable')
  },
  methods: {
    getDict() {
      // 格式类型 为级联选择器
      this.detailCol[3].options = [
        { label: '表格列格式', value: 'formatFilter', children: [] }, // 过滤器和管道实现
        { label: '表格列字典', value: 'formatDict', children: [] }, // 数据字典对应转换
        { label: '表格列类型', value: 'colType', children: [] } // 其他列类型-如按钮、输入框等
      ]
      // 获取‘表格列格式’选项
      API.getDict('dict', { name: 'TableColFormat' }).then(res => {
        this.detailCol[3].options[0].children = res.details
      })
      // 获取‘表格列字典’选项
      API.getData('dict', { IsPage: false }).then(res => {
        res.items.forEach(item => {
          item.label = item.description
          item.value = item.name
        })
        this.detailCol[3].options[1].children = res.items
      })

      API.getDict('dict', { name: 'TableColType' }).then(res => {
        this.detailCol[3].options[2].children = res.details
      })
    },
    getDetail(row) {
      this.detailListLoading = true
      API.getData(this.apiNameDetail, { IsPage: false, TemplateName: row.templateName, Sorting: 'sort' }).then(res => {
        this.templateName = row.templateName
        this.originalDetail = JSON.parse(JSON.stringify(res.items))
        this.colTable = JSON.parse(JSON.stringify(res.items))
        this.$refs.tableDetail.$refs.tableForm.clearValidate()
        this.$refs.tableDetail.$refs.table.setCurrentRow()
        this.detailListLoading = false
      })
    },
    // 重写重置方法--默认排序非标
    reset(val) {
      if (val === 0) {
        // 查询条件修改为默认值
        this.page = 1
        if (this.$refs.table) {
          this.$refs.table.$refs.table.clearSort()
        }
        this.listQuery = {
          Sorting: 'templateName',
          SkipCount: 0,
          MaxResultCount: this.listQuery.MaxResultCount
        }
      } else if (val === 1) {
        // 查询条件不修改,仅页码修改为第一页,查询为第一页
        this.page = 1
        this.listQuery.SkipCount = 0
      }
      // 不传参，保留原有查询条件、页码
      this.getList()
    },
    handleDetailAdd() {
      this.colTable.push({
        sort: this.colTable.length,
        templateName: this.templateName,
        show: true,
        originProp: null,
        changeType: 'add'
      })
    },
    handleDetailSave() {
      this.$refs.tableDetail.$refs.tableForm.validate(valid => {
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
                // break
              }
              if (row.id === item.id) {
                // 找到对应数据，若字段改变，则增加原字段；未修改，则跳出
                if (
                  row.prop === item.prop &&
                  row.label === item.label &&
                  row.width === item.width &&
                  row.type === item.type
                ) {
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
        let j = 0
        this.colTable.map(item => {
          item.sort = j
          j++
        })
        // console.log('colTable', this.colTable)
        API.dataPost(this.apiNameDetail, this.colTable, 'EditAll').then(res => {
          this.$notify({
            title: this.$t('notify.success'), // '成功'
            message: this.$t('notify.saveSuccess'), // '保存成功'
            type: 'success',
            duration: 2000
          })
          this.getDetail(this.multipleSelection[0])
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
