<template>
  <div class="app-container">
    <el-container class="level-container">
      <!-- <el-row :gutter="20">
      <el-col :xs="9" :sm="7" :md="5" :lg="4" :xl="4">-->
      <!--侧边组织机构树形列表-->
      <el-aside width="350px">
        <el-card class="box-card" body-style="height:803px">
          <div class="head-container">
            <el-input
              v-model="orgName"
              clearable
              size="small"
              placeholder="搜索..."
              prefix-icon="el-icon-search"
              class="filter-item"
              @input="getOrgs"
            />
          </div>
          <el-tree
            style="margin-top: 15px"
            :data="orgDatas"
            :load="getOrgs"
            :props="defaultProps"
            :expand-on-click-node="false"
            lazy
            @node-click="handleNodeClick"
          />
        </el-card>
      </el-aside>
      <el-main>
        <!-- </el-col>
        <el-col :xs="15" :sm="17" :md="19" :lg="20" :xl="20">-->
        <el-card class="box-card">
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
              :permission-crud="OrganizationCrud"
              :selection="multipleSelection"
              :single-del="true"
              @toAdd="handleCreate"
              @toEdit="handleUpdate()"
              @toDelete="handleDelete()"
            />
          </div>
          <ColDesign :col-list="column" :table-show.sync="tableShow" @resetCol="resetCol" />
          <Table
            v-if="tableShow"
            ref="table"
            v-loading="listLoading"
            :height="605"
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
        </el-card>
        <!-- </el-col>
        </el-row>-->
      </el-main>
    </el-container>
    <EditForm
      :dialog-form-visible="dialogFormVisible"
      :form-title="formTitle"
      :form-list="formList"
      :form-data="form"
      :is-edit="isEdit"
      :api-name="apiName"
      :load-options="loadOptions"
      :lazy-load-opts="lazyLoadOpts"
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
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import CrudOperation from '@/components/Crud/CRUD.operation'
import basics from '@/mixins'
import orgsTree from '@/mixins/orgsTree'
import { formList, queryItems, OrganizationCrud } from './config'
export default {
  name: 'Organization',
  components: { Table, CrudOperation, EditForm },
  mixins: [colDesign, filterContainer, basics, orgsTree],
  data() {
    return {
      colName: 'Organization',
      apiName: 'orgs',
      dialogTitle: this.$t('dialogHeader.org'), // '组织机构',
      formList,
      queryItems,
      OrganizationCrud,
      CrudOperation,
      API,

      orgName: '',
      orgDatas: [],
      orgsAttr: formList[5],
      defaultProps: { children: 'children', label: 'name', isLeaf: 'leaf' },
      form: {},
      roleList: [],
      dialogFormVisible: false,

      exportParams: {},
      downloadLoading: false,
      formTitle: '',
      isEdit: false,
      layout: { gutter: undefined, span: 12, xs: 24, sm: 12, md: 8, xl: 6 }
    }
  },
  created() {
    // 联动事件
    this.getDict()
    this.formList.forEach(item => {
      switch (item.prop) {
        case 'isTop': {
          item.change = row => {
            this.orgsSelect(row)
          }
          break
        }
      }
    })
  },
  methods: {
    handleCreate() {
      this.dialogOpen()
      this.form = {
        categoryId: 3,
        sort: 999,
        enabled: true,
        isTop: true
      }
      this.formList[5].isHide = true
      this.getOrgOpts()
    },

    handleUpdate(row) {
      this.formTitle = this.$t('dialog.edit') + this.dialogTitle // '编辑'
      this.isEdit = true
      this.dialogFormVisible = true
      this.getOrgNodes()
      this.getForm(this.multipleSelection[0].id)
    },
    getForm(id) {
      API.getForm(this.apiName, id).then(res => {
        this.form = res
        this.$set(this.form, 'isTop', !res.pid)
        if (!this.form.isTop) {
          this.formList[5].isHide = false
        }
      })
    },
    handleDelete() {
      this.delete('id', API.delOrg, true)
    },

    cancel(val) {
      this.dialogFormVisible = false
      if (val.isSave || val.hasAdd) {
        if (val.isEdit) {
          // 编辑时 查询条件保留
          this.reset()
        } else {
          // 新增时 查询条件清空位默认值
          this.reset(0)
        }
        this.getOrgs()
      }
      this.formList[5].options = []
      this.formList[5].isHide = true
    },
    getDict() {
      API.getDict('dict', { name: 'OrgCategory' }).then(res => {
        res.details.forEach(item => {
          item.value = parseInt(item.value)
        })
        this.formList[0].options = res.details
      })
    },
    getOrgs(node, resolve) {
      const params = {}
      if (typeof node !== 'object') {
        if (node) {
          params['filter'] = node
        }
      } else if (node.level !== 0) {
        params['id'] = node.data.id
      }
      // TODO:仅获取启用机构
      setTimeout(() => {
        API.getData(this.apiName, params, 'loadOrgs').then(res => {
          if (resolve) {
            resolve(res.items)
          } else {
            this.orgDatas = res.items
          }
        })
      }, 100)
    },
    handleNodeClick(data) {
      this.listQuery.id = data.id
      this.getList()
    },
    orgsSelect(val) {
      if (val) {
        this.formList[5].isHide = true
        this.form.pid = null
      } else {
        this.formList[5].isHide = false
      }
    }
  }
}
</script>
