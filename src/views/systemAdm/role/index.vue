<template>
  <div class="app-container">
    <!-- <el-row :gutter="20">
    <el-col :xs="14" :sm="14" :md="16" :lg="16" :xl="16">-->
    <el-container class="level-container">
      <el-main>
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
              :permission-crud="RoleCrud"
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
            @getDetail="getDetail"
            @pagination="getList"
            @tableSort="getList"
          />
        </el-card>
      </el-main>
      <el-aside width="350px">
        <!-- <el-col :xs="10" :sm="10" :md="8" :lg="8" :xl="8">
        </el-col>-->
        <el-card class="box-card" style="height: 805px">
          <div slot="header" class="clearfix" style="height: 20px">
            <el-tooltip class="item" effect="dark" content="选择指定角色分配菜单权限" placement="top">
              <!-- '模块权限' -->
              <span class="role-span">{{ $t('dialogHeader.modulePermissions') }}</span>
            </el-tooltip>
            <CrudOperation
              style="float: right"
              :permission-crud="RolePermissionCrud"
              :selection="multipleSelection"
              :disabled="multipleSelection.length != 1"
              @toSave="handlePerSave()"
            />
          </div>
          <el-tree
            ref="tree"
            v-loading="treeLoading"
            :default-checked-keys="checkedPermission"
            :check-strictly="true"
            :data="multipleSelection.length === 1 ? permissionsData : []"
            :props="defaultProps"
            class="permission-tree"
            show-checkbox
            node-key="id"
            @check="checkNode"
          />
        </el-card>
        <!-- </el-col>
        </el-row>-->
      </el-aside>
    </el-container>
    <EditForm
      :dialog-form-visible="dialogFormVisible"
      :form-title="formTitle"
      :form-list="formList"
      :form-data="form"
      :is-edit="isEdit"
      :api="baseAPI"
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
import { baseAPI, identityAPI } from '@/api/generalAPI'
import EditForm from '@/components/EditDialog'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import CrudOperation from '@/components/Crud/CRUD.operation'
import permission from '@/directive/permission/index.js'
import basics from '@/mixins/indexBase'
import orgsTree from '@/mixins/orgsTree'
import { formList, queryItems, RoleCrud, RolePermissionCrud } from './config'
export default {
  name: 'Role',
  components: { Table, CrudOperation, EditForm },
  directives: { permission },
  mixins: [colDesign, filterContainer, basics, orgsTree],
  data() {
    return {
      colName: 'Role',
      apiName: 'roles',
      dialogTitle: this.$t('dialogHeader.role'), // '角色',
      formList,
      queryItems,
      RoleCrud,
      RolePermissionCrud,
      CrudOperation,
      baseAPI,

      orgsAttr: formList[4],
      orgDatas: [],

      defaultProps: { children: 'children', label: 'name', isLeaf: 'leaf' },
      form: {},
      dialogFormVisible: false,

      exportParams: {},
      downloadLoading: false,
      formTitle: '',
      isEdit: false,
      layout: { gutter: undefined, span: 12, xs: 24, sm: 12, md: 8, xl: 6 },

      // savePerLoading: false,
      treeLoading: false,
      checkedPermission: [],
      permissionsData: [],
      params: {
        providerName: 'R',
        providerKey: ''
      }
    }
  },
  created() {
    // 联动事件
    // this.formList.forEach(item => {
    //   switch (item.prop) {
    //     case 'dataScope': {
    //       item.change = row => {
    //         this.orgsSelect(row)
    //       }
    //       break
    //     }
    //   }
    // })
  },
  methods: {
    handleCreate() {
      this.form = {
        isPublic: true,
        isDefault: true,
        orgs: []
      }
      this.dialogOpen()
      // this.getOrgOpts()
    },
    handleUpdate(row) {
      this.formTitle = this.$t('dialog.edit') + this.dialogTitle // '编辑'
      this.isEdit = true
      this.dialogFormVisible = true
      // this.getOrgNodes()
      this.getForm(this.multipleSelection[0].id)
    },
    getForm(id) {
      this.orgs = []
      baseAPI.getForm(this.apiName, id).then(res => {
        this.form = res
      })
    },
    handleDelete() {
      if (this.multipleSelection[0].name === 'admin') {
        this.$notify({
          title: this.$t('notify.failure'), // '失败'
          message: 'admin' + this.$t('notify.banDel'), // 'admin用户不允许被删除',
          type: 'error',
          duration: 2000
        })
      } else {
        this.delete('id', identityAPI.del)
      }
    },
    // orgsSelect(val) {
    //   if (val === '自定义') {
    //     this.formList[4].isHide = false
    //   } else {
    //     this.formList[4].isHide = true
    //     this.form.orgs = []
    //   }
    // },
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
      }
      // this.formList[4].options = []
      // this.formList[4].isHide = true
    },
    handleNodeClick(data) {
      this.listQuery.id = data.id
      this.getList()
    },
    getDetail(row) {
      this.treeLoading = true
      // this.$refs.multipleTable.clearSelection() // 内置方法 清空用户选择
      // this.$refs.multipleTable.toggleRowSelection(row) // 切换某一行的选中状态
      this.params.providerKey = row.name
      this.$axios.getPermissions('/api/permission-management/permissions', this.params).then(res => {
        this.permissionsData = []
        this.checkedPermission = []
        this.setTree(res.groups)
        this.treeLoading = false
      })
    },
    setTree(data) {
      data.forEach(element => {
        let root = {}
        root.id = element.name
        root.name = element.displayName
        root.disabled = true
        root.children = []
        element.permissions.forEach(item => {
          if (!item.parentName) {
            let children = {}
            children.id = item.name
            children.name = item.displayName
            children.parentId = item.parentName
            children.children = []
            root.children.push(children)
          } else {
            let child = {}
            child.id = item.name
            child.name = item.displayName
            child.parentId = item.parentName
            child.children = []
            for (const v of root.children) {
              if (v.id === item.parentName) {
                v.children.push(child)
              }
            }
          }
          if (item.isGranted) {
            this.checkedPermission.push(item.name)
          }
        })
        root.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            element.permissions.forEach(item4 => {
              if (item4.parentName) {
                let child2 = {}
                child2.id = item4.name
                child2.name = item4.displayName
                child2.parentId = item4.parentName
                if (item3.id === item4.parentName) {
                  item3.children.push(child2)
                }
              }
            })
          })
        })
        this.permissionsData.push(root)
      })
    },
    loadPermissions() {
      this.$axios.getPermissions('/api/permission-management/permissions', this.params).then(res => {
        this.permissionsData = []
        this.checkedPermission = []
        this.loadTree(res.groups)
      })
    },

    // **************父节点勾选变化时通知子节点同步变化，实现单向关联
    checkNode(data, state) {
      let selected = state.checkedKeys.indexOf(data.id) // -1未选中
      // 选中
      if (selected !== -1) {
        // 子节点只要被选中父节点就被选中
        this.selectedParent(data)
        // 统一处理子节点为相同的勾选状态
        this.selectedChildSame(data, true)
      } else {
        if (data.children) {
          // 未选中 处理子节点全部未选中
          if (data.children.length !== 0) {
            this.selectedChildSame(data, false)
          }
        }
      }
    },
    // 统一处理子节点为相同的勾选状态
    selectedChildSame(treeList, isSelected) {
      this.$refs.tree.setChecked(treeList.id, isSelected)
      if (treeList.children) {
        for (let i = 0; i < treeList.children.length; i++) {
          this.selectedChildSame(treeList.children[i], isSelected)
        }
      }
    },
    // 统一处理父节点为选中
    selectedParent(data) {
      let currentNode = this.$refs.tree.getNode(data)
      if (currentNode.parent.key !== undefined) {
        this.$refs.tree.setChecked(currentNode.parent, true)
        this.selectedParent(currentNode.parent)
      }
    },
    // **************父节点勾选变化时通知子节点同步变化，实现单向关联

    // 保存角色模块权限
    handlePerSave() {
      // this.savePerLoading = true
      let params = {}
      let checkedKeys = this.$refs.tree.getCheckedKeys()
      params.permissions = []
      this.permissionsData.forEach(element => {
        element.children.forEach(item => {
          let perm = {}
          perm.name = item.id
          perm.isGranted = false
          if (checkedKeys.indexOf(item.id) > -1) {
            perm.isGranted = true
          }
          params.permissions.push(perm)
          item.children.forEach(i => {
            let perm = {}
            perm.name = i.id
            perm.isGranted = false
            if (checkedKeys.indexOf(i.id) > -1) {
              perm.isGranted = true
            }
            params.permissions.push(perm)
            i.children.forEach(i2 => {
              let perm2 = {}
              perm2.name = i2.id
              perm2.isGranted = false
              if (checkedKeys.indexOf(i2.id) > -1) {
                perm2.isGranted = true
              }
              params.permissions.push(perm2)
            })
          })
        })
      })
      this.$axios
        .puts(
          '/api/permission-management/permissions?providerName=R&providerKey=' + this.multipleSelection[0].name,
          params
        )
        .then(res => {
          this.$notify({
            title: this.$t('notify.success'), // '成功'
            message: this.$t('notify.editSuccess'), // '更新成功'
            type: 'success',
            duration: 2000
          })
          // this.savePerLoading = false
        })
    }
  }
}
</script>

