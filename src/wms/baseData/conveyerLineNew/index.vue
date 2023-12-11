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
            <!-- '线体详情' -->
            <!-- <span>{{ $t('dialogHeader.conveyerLine') }}</span> -->
            <!-- <filter-container :form-items="FormItems" :list-query.sync="listQuery" @query="getList" @reset="reset" /> -->
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
              @toEdit="handleUpdate()"
            />
          </div>
          <Table
            id="tableDetail"
            ref="tableDetail"
            v-loading="detailListLoading"
            :height="-1"
            :bottom-off-set="50"
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
      :cbg-remote="cbgRemote"
      :api-name="apiNameDetail"
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
import combogrid from '@/mixins/combogrid'
import { column, detailCol, formList, queryItems, DictCrud, DictDetailCrud, FormItems} from './config'
export default {
  name: 'ConveyerLineNew',
  components: { Table, EditForm, CrudOperation },
  mixins: [sortable, filterContainer, basics, combogrid],
  data() {
    return {
      apiName: 'wharf',
      apiNameDetail: 'conveyerLine',
      dialogTitle: this.$t('dialogHeader.conveyerLine'), // '字典',

      column,
      detailCol,
      formList,
      queryItems,
      FormItems,
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
      detailListLoading: false,
      wharfcbgAttr: formList[3], // 远程
      lineCachecbgAttr: formList[7] // 下拉网配置字段
    }
  },
  created() {
    this.getDict()
    this.getWarehouse()
    this.getStacker()
    this.getOrginalWharf()
    this.getOrginalLineCache()
    this.formChange() // 远程监控
  },
  mounted() {
    this.rowDrop(document.querySelector('#tableDetail tbody'), 'colTable')
  },
  methods: {
    formChange() {
      this.formList.forEach(item => {
        switch (item.prop) {
          // 报名申请反馈-change
          case 'fromWharfs': {
            item.change = row => {
              if (!row) {
                this.cbgRemote('fromWharfs')
              }
            }
            break
          }
          case 'lineCacheID': {
            item.change = row => {
              // if (!row) {
              this.cbgRemote('lineCacheID')
              // }
            }
            break
          }
        }
      })
    },
    getDict() {
      // 以下未线体
      API.getDict('dict', { name: 'LineDealway' }).then(res => {
        this.formList[2].options = res.details
      })
      API.getDict('dict', { name: 'BoxState' }).then(res => {
        this.formList[10].options = res.details
      })
      API.getDict('dict', { name: 'BoxType' }).then(res => {
        this.formList[11].options = res.details // 获取箱子类型
      })
      API.getDict('dict', { name: 'InAllocationLocation' }).then(res => {
        this.formList[16].options = res.details
      })

      API.getDict('dict', { name: 'productType' }).then(res => {
        this.formList[20].options = res.details
      })
      // 码头类型字典
      API.getDict('dict', { name: 'WharfType' }).then(res => {
        this.queryItems[3].options = res.details
      })
    },
    getDetail(row) {
      this.detailListLoading = true
      API.getData(this.apiNameDetail, { IsPage: false, FromWharfs: row.wharfID, allMatch: 'allMatch' }).then(res => {
        this.dictID = row.id
        this.originalDetail = JSON.parse(JSON.stringify(res.items))
        this.colTable = JSON.parse(JSON.stringify(res.items))
        this.$refs.tableDetail.$refs.tableForm.clearValidate()
        this.$refs.tableDetail.$refs.table.setCurrentRow()
        this.detailListLoading = false
      })
    },
    handleDetailAdd() {
      this.dialogOpen()
      this.form = {}
    },
    handleUpdate() {
      let row = this.detailSelection[0]
      this.getOrginalWharf(row.fromWharfs)
      this.getOrginalLineCache(row.lineCacheId)
      this.getForm(row.id)
    },
    getForm(id) {
      this.formTitle = this.$t('dialog.edit') + this.dialogTitle // '编辑'
      this.isEdit = true
      API.getForm(this.apiNameDetail, id).then(res => {
        this.form = res
        this.dialogFormVisible = true
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
    },
    getOrginalWharf(wharfId) {
      API.get('wharf', {IsPage: true, wharfID: wharfId, MaxResultCount: 30 }, 'all').then(res => {
        res.items.forEach(item => {
          item.label = item.wharfName + '[' + item.wharfID + ']'
          item.value = item.wharfID
        })
        this.formList[3].options = res.items
      })
    },
    getOrginalLineCache(lineCacheId) {
      API.get('lineCache', {IsPage: true, lineCacheId: lineCacheId, MaxResultCount: 30 }, 'all').then(res => {
        res.items.forEach(item => {
          item.label = item.lineCacheName + '[' + item.lineCacheId + ']'
          item.value = item.lineCacheId
        })
        this.formList[7].options = res.items
      })
    },
    cbgRemote(node, str) {
      if (node === this.wharfcbgAttr.prop) {
        this.getCbgRemoteSearch(this.wharfcbgAttr, 'wharf', { wharfID: str })
      } else if (node === this.lineCachecbgAttr.prop) {
        this.getCbgRemoteSearch(this.lineCachecbgAttr, 'lineCache', { lineCacheId: str })
      }
    },
    getWarehouse() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        res.items.forEach(item => {
          item.label = item.warehouseName
          item.value = item.warehouseID
        })
        this.queryItems[0].options = this.formList[19].options= this.formList[21].options = res.items
      })
    },
    getStacker() {
      API.get('device', {IsPage: false, DeviceID: 'stacker' }, 'all').then(res => {
        res.items.forEach(item => {
          item.label = item.deviceName + '[' + item.alley + ']'
          item.value = item.deviceID
        })
        this.formList[18].options = res.items
      })
    }
  }
}
</script>
