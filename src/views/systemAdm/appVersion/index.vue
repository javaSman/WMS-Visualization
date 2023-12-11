<template>
  <div class="app-container">
    <div class="head-container">
      <filter-container :form-items="versionQueryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
      <CrudOperation :permission-crud="versionCrud" :selection="multipleSelection" @toImport="handleImport()" />
    </div>
    <ColDesign :col-list="column" :table-show.sync="tableShow" @resetCol="resetCol" />
    <Table
      v-if="tableShow"
      ref="table"
      v-loading="listLoading"
      :height="-1"
      :data-list="list"
      :column="column"
      :table-btn="tableBtn"
      :total="totalCount"
      :page.sync="page"
      :limit.sync="listQuery.MaxResultCount"
      :is-sort="true"
      :sorting.sync="listQuery.Sorting"
      :has-selection="false"
      :dict-gather="dictGather"
      @pagination="getList"
      @tableSort="getList"
      @toDownload="toDownload"
      @toViewCode="toViewCode"
    />
    <UploadDialog
      :dialog-visible.sync="uploadDialogVisible"
      :form-data="form"
      :api-name="apiName"
      @reset="reset"
      @cancel="dialogCancel"
    />
    <QRCodeDialog :dialog-visible.sync="codeDialogVisible" :download-path="downloadPath" @cancel="dialogCancel" />
  </div>
</template>
<script>
import Table from '@/components/Table'
import CrudOperation from '@/components/Crud/CRUD.operation'
import UploadDialog from './module/UploadDialog'
import QRCodeDialog from './module/QRCodeDialog'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import store from '@/store'
import { versionQueryItems, versionCrud, tableBtn } from './config'
export default {
  name: 'AppVersion',
  components: { Table, CrudOperation, UploadDialog, QRCodeDialog },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'AppVersion',
      apiName: 'AppVersion',

      versionQueryItems,
      versionCrud,
      tableBtn,

      form: {},

      uploadDialogVisible: false,
      codeDialogVisible: false, // 二维码弹窗
      downloadPath: '' // 文件下载地址
    }
  },
  created() {},
  methods: {
    gerPermission(value) {
      let roles = store.getters && store.getters.roles
      let hasPermission
      if (value && value instanceof Array && value.length > 0) {
        let permissionRoles = value
        hasPermission = roles.some(role => {
          return permissionRoles.includes(role)
        })
      }
      return hasPermission
    },
    /** 下载 */
    async toDownload(val) {
      this.downloadLoading = true
      let url = window.globalConfig.base.ip + ':' + window.globalConfig.base.backend_port + val.row.downloadPath
      // window.location.href = url
      window.open(url)
      this.downloadLoading = false
    },
    /** 查看二维码 */
    toViewCode(val) {
      //  二维码弹窗
      this.codeDialogVisible = true
      let url = window.globalConfig.base.ip + ':' + window.globalConfig.base.backend_port + val.row.downloadPath
      let dowmloadUrl = url.replace(/\\/g, '/')
      // 下载地址进行转码
      this.downloadPath = encodeURI(dowmloadUrl)
    },
    handleImport() {
      this.form = {}
      this.uploadDialogVisible = true
    },
    dialogCancel(val) {
      this.uploadDialogVisible = false
      this.codeDialogVisible = false
    }
  }
}
</script>
<style scoped>
.qrcode {
  margin: 20px;
  background: #9093993d;
  width: 200px;
  height: 200px;
}
</style>
