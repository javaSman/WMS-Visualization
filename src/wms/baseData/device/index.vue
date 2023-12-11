<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="queryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
      <CrudOperation
        :permission-crud="deviceCrud"
        :selection="multipleSelection"
        @toAdd="handleCreate"
        @toEdit="handleUpdate()"
        @toDelete="handleDelete()"
        @toExport="handleExport()"
      />
    </div>
    <ColDesign :col-list="column" :table-show.sync="tableShow" @resetCol="resetCol" />
    <Table
      v-if="tableShow"
      ref="table"
      v-loading="listLoading"
      :height="-1"
      :data-list="list"
      :column="column"
      :selection.sync="multipleSelection"
      :total="totalCount"
      :page.sync="page"
      :limit.sync="listQuery.MaxResultCount"
      :is-sort="true"
      :sorting.sync="listQuery.Sorting"
      :dict-gather="dictGather"
      @pagination="getList"
      @tableSort="getList"
    />
    <EditForm
      :dialog-form-visible="dialogFormVisible"
      :form-title="formTitle"
      :form-list="formList"
      :form-data="form"
      :is-edit="isEdit"
      :api-name="apiName"
      :cbg-remote="cbgRemote"
      :cbg-filter="optFilter"
      @create="handleCreate"
      @cancel="cancel"
      @reset="reset"
    />
  </div>
</template>
<script>
import Table from '@/components/Table'
import { API } from '@/api/generalAPI'
import EditForm from '@/components/EditDialog'
import CrudOperation from '@/components/Crud/CRUD.operation'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import combogrid from '@/mixins/combogrid'
import { formList, queryItems, deviceCrud } from './config'
export default {
  name: 'Wharf',
  components: { Table, EditForm, CrudOperation },
  mixins: [colDesign, filterContainer, basics, combogrid],
  data() {
    return {
      colName: 'device',
      apiName: 'device',
      dialogTitle: '设备',

      formList,
      queryItems,
      deviceCrud,

      form: {},
      dialogFormVisible: false,

      exportParams: {},

      formTitle: '',
      isEdit: false,
      boxcbgAttr: formList[2], // 远程

      cbgAttr: formList[1] // 下拉网配置字段
    }
  },
  created() {
    this.getDict()
    this.getWarehouse()
    this.getOpts()
    this.formList.forEach(item => {
      switch (item.prop) {
        case 'boxID': {
          item.change = row => {
            this.cbgRemote(row)
          }
          break
        }
        // case 'warehouseID': {
        //  item.change = row => {
        //    this.inputWHName(row)
        //  }
        //  break
        // }
      }
    })
  },
  methods: {
    getDict() {
      API.getDict('dict', { name: 'DeviceType' }).then(res => {
        this.formList[3].options = this.queryItems[5].options = res.details
      })
      // API.getDict('dict', { name: 'Warehouse' }).then(res => {
      //  this.queryItems[0].options = res.details
      // })
      API.getDict('dict', { name: 'LineCode' }).then(res => {
        this.formList[5].options = res.details
      })
      // API.getDict('dict', { name: 'State' }).then(res => {
      //   this.formList[6].options = this.queryItems[6].options = res.details
      // })
      API.getDict('dict', { name: 'ColSort' }).then(res => {
        this.formList[9].options = res.details
      })
    },
    /** 获取仓库编码下拉框值 */
    getWarehouse() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        // let arr = []
        res.items.forEach(item => {
          // arr.push(item.warehouseID)
          item.label = item.warehouseName
          item.value = item.warehouseID
        })
        this.queryItems[0].options = res.items
      })
    },
    inputWHName(val) {
      this.formList[1].options.forEach(item => {
        if (item.value === val) {
          this.form.whName = item.warehouseName
        } else if (val === '') {
          // this.getWarehouse()
          this.form.whName = ''
          this.getNews()
          // console.log(111)
        }
      })
    },
    cbgRemote(node, str) {
      if (node === this.boxcbgAttr.prop) {
        this.getCbgRemoteSearch(this.boxcbgAttr, 'box', { BoxID: str })
      }
    },
    getOpts() {
      this.getCbgRemoteOpts(this.boxcbgAttr, 'box')
      this.getCbgOpts('warehouse', { IsPage: false })
    },
    handleCreate() {
      // this.dialogFormVisible = true
      this.dialogOpen()
      this.form = {}
      this.getNews()
    },
    handleUpdate() {
      this.getForm(this.multipleSelection[0].id)
      this.getNews()
    },
    getForm(id) {
      this.formTitle = this.$t('dialog.edit') + this.dialogTitle // '编辑'
      this.isEdit = true
      API.getForm(this.apiName, id).then(res => {
        this.form = res
        this.dialogFormVisible = true
      })
    },
    // 下拉框获取新的options
    getNews() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        // let arr = []
        res.items.forEach(item => {
          // arr.push(item.warehouseID)
          item.label = item.warehouseID
          item.value = item.warehouseID
        })
        this.formList[1].options = res.items
      })
    }
  }
}
</script>
