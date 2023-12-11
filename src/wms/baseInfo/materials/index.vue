<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="queryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
      <CrudOperation
        :permission-crud="MaterialCrud"
        :selection="multipleSelection"
        :download-loading.sync="downloadLoading"
        @toAdd="handleCreate"
        @toEdit="handleUpdate()"
        @toDelete="handleDelete()"
        @toExport="handleDownload()"
        @toImport="handleImport()"
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
      :dialog-width="950"
      @create="handleCreate"
      @cancel="cancel"
      @reset="reset"
    />
    <UploadDialog
      :dialog-visible.sync="uploadDialogVisible"
      :api-name="apiName"
      @reset="reset"
      @cancel="dialogCancel"
    />
    <EditBatchDialog
      :dialog-visible.sync="batchDialogVisible"
      :form-title="formTitle"
      :form-data="form"
      :batch-form-list="batchFormList"
      :data-list="tableList"
      :detail-table.sync="list"
      :api-name="apiName"
      :batch-table-list="column"
      :dict-gather="dictGather"
      @reset="reset"
      @cancel="dialogCancel"
    />
  </div>
</template>
<script>
import Table from '@/components/Table'
import UploadDialog from '@/components/Upload/UploadDialog'
import EditBatchDialog from '@/components/EditBatchDialog'
import EditForm from '@/components/EditDialog'
import CrudOperation from '@/components/Crud/CRUD.operation'
import { API } from '@/api/generalAPI'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import { formList, queryItems, batchFormList, MaterialCrud } from './config'
export default {
  name: 'Materials',
  components: { Table, EditForm, CrudOperation, UploadDialog, EditBatchDialog },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'Materials',
      apiName: 'materials',
      dialogTitle: this.$t('dialogHeader.materials'), // '物料',

      formList,
      queryItems,
      batchFormList,
      MaterialCrud,

      tableList: [],
      form: {},
      dialogFormVisible: false,
      uploadDialogVisible: false,
      batchDialogVisible: false,
      formTitle: '',
      isEdit: false,

      downloadLoading: false,
      exportParams: {}
    }
  },
  created() {
    this.getDict()
    // this.formList.forEach(item => {
    //   switch (item.prop) {
    //     case 'materialType': {
    //       item.change = row => {
    //         this.inputMaterialTypeDesc(row)
    //       }
    //       break
    //     }
    //     case 'materialGroupID': {
    //       item.change = row => {
    //         this.inputMaterialGroupDesc(row)
    //       }
    //       break
    //     }
    //   }
    // })
  },
  methods: {
    // inputMaterialTypeDesc(val) {
    //   this.formList[2].options.forEach(item => {
    //     if (item.typeName === val) {
    //       this.form.materialTypeDesc = item.typeDesc // 给材料类型和类型描述赋值
    //     } else if (val === '') {
    //       this.form.materialTypeDesc = ''
    //     }
    //   })
    // },
    // inputMaterialGroupDesc(val) {
    //   this.formList[4].options.forEach(item => {
    //     if (item.label === val) {
    //       this.form.materialGroupDesc = item.note // 给材料组别和组别描述赋值
    //     } else if (val === '') {
    //       this.form.materialGroupDesc = ''
    //     }
    //   })
    // },
    getDict() {
      // 获取材料状态数据
      API.getDict('dict', { name: 'MaterialStatus' }).then(res => {
        this.formList[4].options = res.details
      })
      // // 获取材料组别数据
      // API.getDict('dict', { name: 'MaterialGroup' }).then(res => {
      //   this.formList[4].options = res.details
      // })
      API.getDict('dict', { name: 'MaterialType' }).then(res => {
        this.formList[3].options = res.details
        this.queryItems[2].options = this.formList[3].options = res.details
      })
      API.getDict('dict', { name: 'Units' }).then(res => {
        this.formList[7].options = res.details // 获取单位列表
      })
    },
    handleCreate() {
      this.form = {}
      this.getOpts()
      this.dialogOpen()
    },
    handleUpdate() {
      this.getOpts()
      this.getForm(this.multipleSelection[0].id)
    },

    handleImport() {
      this.uploadDialogVisible = true
    },
    dialogCancel(val) {
      this.uploadDialogVisible = false
      this.batchDialogVisible = false
    },

    getOpts() {}
  }
}
</script>
