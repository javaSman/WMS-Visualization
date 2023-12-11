<template>
  <div class="components-container">
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
      <!-- 新增、修改、撤销、执行、完成、查询、导出 -->
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
      <el-button
        slot="reference"
        class="filter-item"
        type="primary"
        icon="el-icon-document-checked"
        size="mini"
        @click="handleExecute()"
      >
        执行
      </el-button>
      <el-button
        slot="reference"
        class="filter-item"
        type="primary"
        icon="el-icon-finished"
        size="mini"
        @click="handleFinish()"
      >
        完成
      </el-button>
      <el-button
        slot="reference"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        size="mini"
        @click="handleExport()"
      >
        导出
      </el-button>
    </div>
    <split-pane split="horizontal" :min-percent="25.5" :default-percent="70" @resize="resize">
      <template slot="paneL">
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
      </template>
      <template slot="paneR">
        <h4>盘点单明细</h4>
        <el-table
          ref="tableDetail"
          v-loading="detailListLoading"
          style="width: 100%"
          :data="detailList"
          @sort-change="sortChange"
          @row-click="handleRowClick"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            v-for="(item, index) in columnDetail"
            :key="index"
            :label="item.label"
            :prop="item.prop"
            :width="item.width"
          />
        </el-table>
      </template>
    </split-pane>

    <editDialog
      :dialog-form-visible="dialogFormVisible"
      :form-title="formTitle"
      :form-data="form"
      :is-edit="isEdit"
      @cancel="cancel"
    />
  </div>
</template>
