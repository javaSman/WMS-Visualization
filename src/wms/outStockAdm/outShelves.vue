<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse
        :form-items="outShelvesQueryItems"
        :list-query.sync="listQuery"
        @query="getList"
        @reset="reset"
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
      :total="totalCount"
      :page.sync="page"
      :limit.sync="listQuery.MaxResultCount"
      :is-sort="true"
      :sorting.sync="listQuery.Sorting"
      :has-selection="false"
      :dict-gather="dictGather"
      @pagination="getList"
      @tableSort="getList"
    />
  </div>
</template>
<script>
import Table from '@/components/Table'
import { API } from '@/api/generalAPI'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import { outShelvesQueryItems } from './config'
export default {
  name: 'OutShelves',
  components: { Table },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'OutShelves',
      apiName: 'outshelves',
      outShelvesQueryItems
    }
  },
  created() {
    this.getDict()
  },
  methods: {
    getDict() {
      API.getDict('dict', { name: 'BoxState' }).then(res => {
        this.outShelvesQueryItems[7].options = res.details
      })
      API.getDict('dict', { name: 'Warehouse' }).then(res => {
        this.outShelvesQueryItems[1].options = res.details
      })
    }
  }
}
</script>
