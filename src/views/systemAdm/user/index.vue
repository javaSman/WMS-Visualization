<template>
  <div class="app-container">
    <div class="head-container">
      <filter-container
        :form-items="queryItems"
        :list-query.sync="listQuery"
        :has-download="true"
        :download-loading.sync="downloadLoading"
        @query="getList"
        @reset="reset"
        @toExport="handleExport()"
      />
      <CrudOperation
        :permission-crud="UserCrud"
        :selection="multipleSelection"
        :single-del="true"
        @toAdd="handleCreate"
        @toEdit="handleUpdate()"
        @toDelete="handleDelete()"
        @toRePassword="handleRePassword()"
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
      :form-list="isEdit ? updateFormList : createFormList"
      :form-data="form"
      :is-edit="isEdit"
      :api="baseAPI"
      :api-name="apiName"
      :dialog-width="800"
      :submit="submit"
      :layout="layout"
      @create="handleCreate"
      @cancel="cancel"
      @reset="reset"
    />
    <rePassword
      :dialog-visible.sync="updateDialogVisible"
      :form-title="formTitle"
      :form-data="form"
      :api="baseAPI"
      :api-name="apiName"
      @reset="reset"
      @cancel="dialogCancel"
    />
  </div>
</template>
<script>
import Table from '@/components/Table'
import { baseAPI, identityAPI } from '@/api/generalAPI'

import EditForm from '@/components/EditDialog'
import rePassword from './module/rePassword'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import CrudOperation from '@/components/Crud/CRUD.operation'
import basics from '@/mixins/indexIdentity'
// import basics from '@/mixins'
import { createFormList, updateFormList, formList, queryItems, UserCrud } from './config'
export default {
  name: 'User',
  components: { Table, CrudOperation, EditForm, rePassword },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'User',
      apiName: 'users',
      dialogTitle: this.$t('dialogHeader.user'), // '用户'

      createFormList,
      updateFormList,
      formList,
      queryItems,
      UserCrud,

      baseAPI,
      form: {},

      updateDialogVisible: false,
      dialogFormVisible: false,

      exportParams: {},
      downloadLoading: false,
      formTitle: '',
      isEdit: false,
      layout: { gutter: undefined, span: 12, xs: 24, sm: 12, md: 8, xl: 6 }
    }
  },
  methods: {
    getOpts() {
      identityAPI.getForm('roles', 'all').then(res => {
        res.items.forEach(item => {
          item.label = item.name
          item.value = item.name
        })
        if (this.isEdit) {
          this.updateFormList[4].options = res.items
        } else {
          this.createFormList[5].options = res.items
        }
      })
    },
    handleCreate() {
      this.form = { lockoutEnabled: true }
      this.getOpts()
      this.dialogOpen()
    },
    handleUpdate() {
      this.getOpts()
      this.getForm(this.multipleSelection[0].id)
    },
    handleDelete() {
      if (this.multipleSelection[0].userName === 'admin') {
        this.$notify({
          title: this.$t('notify.failure'), // '失败'
          message: 'admin' + this.$t('notify.banDel'),
          type: 'error',
          duration: 2000
        })
      } else {
        this.delete('id', identityAPI.del)
      }
    },
    getForm(id) {
      this.formTitle = this.$t('dialog.edit') + this.dialogTitle // '编辑'
      this.isEdit = true
      identityAPI.getForm(this.apiName, id).then(res => {
        this.form = res
        this.dialogFormVisible = true
        identityAPI.getForm(this.apiName, id, 'roles').then(data => {
          let roleList = []
          data.items.forEach(item => {
            roleList.push(item.name)
          })
          this.$set(this.form, 'roleNames', roleList)
        })
      })
    },
    /** 新增编辑-自定义提交方法-未填写邮箱时，赋默认值 */
    submit(value) {
      if (value.email === '' || value.email === null || !value.email) {
        this.$set(value, 'email', 'user@example.com')
      }
    },
    handleRePassword() {
      this.formTitle = this.$t('dialogHeader.rePassword') // '重置密码'
      this.form = {
        ids: []
      }
      identityAPI.getForm(this.apiName, this.multipleSelection[0].id).then(res => {
        this.form = {
          id: res.id,
          userName: res.userName
        }
      })
      this.updateDialogVisible = true
    },
    dialogCancel(val) {
      this.updateDialogVisible = false
    }
  }
}
</script>
