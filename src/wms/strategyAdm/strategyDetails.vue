// 1、策略字典
<template>
  <div class="app-container">
    <el-container class="level-container">
      <!-- <el-row :gutter="10"> -->
      <!-- <el-col :xs="10" :sm="8" :md="6" :lg="5" :xl="5"> -->
      <el-aside width="350px">
        <el-card class="box-card" body-style="height:810px">
          <Table
            v-if="tableShow"
            ref="table"
            v-loading="listLoading"
            :data-list="strategyList"
            :column="detailsColumn"
            :has-selection="false"
            :border="true"
            :dict-gather="dictGather"
            @tableSort="getList"
            @getDetail="handleNodeClick"
          />
        </el-card>
      </el-aside>
      <el-main>
        <!-- </el-col> -->
        <!-- <el-col :xs="14" :sm="16" :md="18" :lg="19" :xl="19"> -->
        <el-card class="box-card">
          <div class="head-container">
            <filter-collapse
              :form-items="detailsQueryItems"
              :list-query.sync="listQuery"
              @query="getList"
              @reset="reset"
            />
            <CrudOperation
              :permission-crud="StrategyDetailsCrud"
              :selection="multipleSelection"
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
            :height="610"
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
        <!-- </el-col> -->
        <!-- </el-row> -->
      </el-main>
    </el-container>
    <EditForm
      :dialog-form-visible="dialogFormVisible"
      :form-title="formTitle"
      :form-list="detailsformList"
      :form-data="form"
      :is-edit="isEdit"
      :api-name="apiName"
      :cbg-filter="optFilter"
      @create="handleCreate"
      @cancel="cancel"
      @reset="reset"
    />
  </div>
</template>
<script>
import Table from '@/components/Table'
import EditForm from '@/components/EditDialog'
import { API } from '@/api/generalAPI'
import CrudOperation from '@/components/Crud/CRUD.operation'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import combogrid from '@/mixins/combogrid'
import { detailsformList, detailsQueryItems, detailsColumn, StrategyDetailsCrud } from './config'
export default {
  name: 'StrategyDetails',
  components: { Table, EditForm, CrudOperation },
  mixins: [colDesign, filterContainer, basics, combogrid],
  data() {
    return {
      colName: 'StrategyDetails',
      apiName: 'strategyDetails',
      dialogTitle: this.$t('dialogHeader.strategyDetails'), // '策略明细',

      strategyList: [],

      detailsformList,
      detailsQueryItems,
      detailsColumn,
      StrategyDetailsCrud,

      form: {},
      dialogFormVisible: false,
      formTitle: '',
      isEdit: false,
      cbgAttr: detailsformList[2] // 下拉网配置字段
    }
  },
  created() {
    this.getDict()
    this.detailsformList.forEach(item => {
      switch (item.prop) {
        case 'strategyID': {
          item.change = row => {
            this.inputStrategyName(row)
          }
          break
        }
        case 'warehouseID': {
          item.change = row => {
            this.inputWHName(row)
          }
          break
        }
      }
    })
  },
  methods: {
    handleCreate() {
      this.form = { status: false }
      this.getOpts()
      this.dialogOpen()
    },
    handleUpdate() {
      this.getOpts()
      this.getForm(this.multipleSelection[0].id)
    },
    handleNodeClick(data) {
      this.listQuery.StrategyID = data.value
      this.getList()
    },
    getOpts() {
      this.getCbgOpts('warehouse', { IsPage: false })
    },
    getDict() {
      API.getDict('dict', { name: 'Strategy' }).then(res => {
        this.strategyList = res.details
        this.detailsformList[0].options = JSON.parse(JSON.stringify(res.details))
        this.detailsformList[0].options.forEach(item => {
          item.strategyName = item.label
          item.label = item.value
        })
      })
      // API.getDict('dict', { name: 'StrategyType' }).then(res => {
      //   this.detailsformList[4].options = res.details
      // })
      API.getDict('dict', { name: 'EvaluationModel' }).then(res => {
        this.detailsformList[2].options = res.details
      })
      // API.getDict('dict', { name: 'PerformType' }).then(res => {
      //   this.detailsformList[11].options = res.details
      // })
    },
    inputStrategyName(val) {
      this.detailsformList[0].options.forEach(item => {
        if (item.value === val) {
          this.form.strategyName = item.strategyName
        } else if (val === '') {
          this.form.strategyName = ''
        }
      })
    }
    // inputWHName(val) {
    //   this.detailsformList[2].options.forEach(item => {
    //     if (item.value === val) {
    //       this.form.whName = item.warehouseName
    //     } else if (val === '') {
    //       this.form.whName = ''
    //     }
    //   })
    // }
  }
}
</script>
