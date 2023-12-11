<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.UserName"
        placeholder="用户名"
        style="width: 150px"
        size="small"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    </div>
    <div class="opts">
      <el-button class="filter-item" size="mini" type="primary" icon="el-icon-plus" @click="handleCreate">
        新增
      </el-button>
      <el-button class="filter-item" size="mini" type="success" icon="el-icon-edit" @click="handleUpdate()">
        修改
      </el-button>
      <el-button
        slot="reference"
        class="filter-item"
        type="danger"
        icon="el-icon-delete"
        size="mini"
        @click="handleDelete()"
      >
        删除
      </el-button>
    </div>
    <el-table
      ref="table"
      v-loading="listLoading"
      style="width: 100%"
      :data="list"
      @sort-change="sortChange"
      @row-click="handleRowClick"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="44px" />
      <el-table-column
        v-for="(item, index) in column"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
      />
    </el-table>
    <pagination
      v-show="totalCount > 0"
      :total="totalCount"
      :page.sync="page"
      :limit.sync="listQuery.MaxResultCount"
      @pagination="getList"
    />
    <editDialog
      :dialog-form-visible="dialogFormVisible"
      :form-title="formTitle"
      :form-data="form"
      :is-edit="isEdit"
      @cancel="cancel"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
// import permission from '@/directive/permission/index.js'
// import InventoryPlanApi from '@/api/inventory/InventoryPlan'
import EditDialog from './module/form'
const defaultForm = {
  id: null,
  name: null,
  gender: 1,
  phone: null,
  email: null,
  enabled: true,
  orgId: null,
  userId: null,
  jobs: [],
  userIdToName: null,
  orgIdToName: null
}
export default {
  name: 'InventoryPlan',
  components: { Pagination, EditDialog },
  data() {
    return {
      column: [
        { prop: 'id', label: '序号', width: 80, align: 'center' },
        { prop: 'planId', label: '盘点计划单号', width: 200 },
        { prop: 'area', label: '盘点区域' },
        { prop: 'method', label: '盘点方法' },
        { prop: 'startTime', label: '开始时间' },
        { prop: 'endTime', label: '结束时间' },
        { prop: 'inventoryChecker', label: '盘点人' },
        { prop: 'secondChecker', label: '复盘人', width: 100 },
        { prop: 'auditor', label: '审核人', width: 100 },
        { prop: 'createTime', label: '创建时间' }
      ],
      form: Object.assign({}, defaultForm),
      list: null,
      totalCount: 0,
      listLoading: true,
      listQuery: {
        Sorting: null,
        SkipCount: 0,
        MaxResultCount: 20
      },
      page: 1,
      dialogFormVisible: false,
      formTitle: '',
      isEdit: false,
      multipleSelection: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 获取列表 */
    getList() {
      this.listLoading = true
      this.listQuery.SkipCount = (this.page - 1) * 10
      this.list = [{ id: 1, planId: '125566455454541', area: '区域1', method: '测试方法', inventoryChecker: 'lisan' }]
      this.totalCount = 100
      this.listLoading = false
      //   InventoryPlanApi.getList(this.listQuery).then((response) => {
      //     this.list = response.items
      //     this.totalCount = response.totalCount
      //     this.listLoading = false
      //   })
    },
    /** 查询 筛选 */
    handleFilter() {
      this.page = 1
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (!prop || !order) {
        this.handleFilter()
        return
      }
      this.listQuery.Sorting = prop + ' ' + order
      this.handleFilter()
    },
    handleCreate() {
      this.formTitle = '新增盘点计划'
      this.isEdit = false
      this.dialogFormVisible = true
      this.form = Object.assign({}, defaultForm)
    },
    handleUpdate(row) {
      this.formTitle = '修改盘点计划'
      this.isEdit = true
      if (row) {
        // this.fetchData(row.id)
        this.dialogFormVisible = true
      } else {
        if (this.multipleSelection.length !== 1) {
          this.$message({
            message: '编辑必须选择单行',
            type: 'warning'
          })
          return
        } else {
          // this.fetchData(this.multipleSelection[0].id)
          this.dialogFormVisible = true
        }
      }
    },
    handleRowClick(row, column, event) {
      this.$refs.table.clearSelection()
      this.$refs.table.toggleRowSelection(row)
      console.log(row)
      this.form = row
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(val)
    },
    handleDelete(row) {
      var params = []
      let alert = ''
      if (row) {
        params.push(row.id)
        alert = row.name
      } else {
        if (this.multipleSelection.length === 0) {
          this.$message({
            message: '未选择',
            type: 'warning'
          })
          return
        }
        this.multipleSelection.forEach(element => {
          let id = element.id
          params.push(id)
        })
        alert = '选中项'
      }
      this.$confirm('是否删除' + alert + '?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // employeeApi.del(params).then(response => {
          //   this.$notify({
          //     title: '成功',
          //     message: '删除成功',
          //     type: 'success',
          //     duration: 2000
          //   })
          //   this.getList()
          // })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    cancel(val) {
      this.dialogFormVisible = val.dialogFormVisible
      if (val.isSave) {
        this.getList()
      }
    }
  }
}
</script>

<style>
.table-expand {
  font-size: 0;
}
.table-expand label {
  width: 70px;
  color: #99a9bf;
}
.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
.table-expand .el-form-item__content {
  font-size: 12px;
}
</style>
