<template>
  <div class="app-container">
    <!-- 上传 -->
    <template>
      <!-- 上传头像 -->
      <UploadAvatar />
      <!-- 上传图片 -->
      <UploadImg @getFileUrl="getFileUrl" />
      <!-- 上传文件 -->
      <UploadFile @getFileUrl="getFileUrl" />
    </template>

    <el-divider />

    <!-- 颜色选择器 -->
    <template>
      <ColorSelect :color="color" :size="'small'" @colorChange="colorChange" />
    </template>

    <el-divider />

    <!-- 表单 -->
    <template>
      <el-button @click="dialogVisible = true">表单</el-button>
      <el-dialog title="表单" :visible.sync="dialogVisible" width="700px">
        <Form
          ref="form"
          style="width: 600px"
          :label-width="150"
          :layout="layout1"
          :form-data="formData"
          :form-list="formList"
          :form-handle="formHandle"
          :inline="false"
          :is-handle="true"
        />
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
      </el-dialog>
    </template>

    <el-divider />

    <!-- 表单 -->
    <template>
      <Form
        ref="formList"
        :label-width="150"
        :layout="layout2"
        :form-data="formData"
        :form-list="formList"
        :form-handle="formHandle"
        :inline="false"
        :is-handle="true"
      />
    </template>

    <el-divider />

    <!-- 超链接 -->
    <template>
      <Link :label="'超链接（百度）'" :href="'http://wwww.baidu.com'" :target="'_blank'" />
    </template>

    <el-divider />

    <!-- 树形菜单 -->
    <template>
      <Tree :data="treeData" @handleNodeClick="handleNodeClick" />
    </template>

    <el-divider />

    <!-- 多条件查询 -->
    <template>
      <el-button @click="multiSearchVisible = true">多条件筛选</el-button>
      <MultiSearch
        :visible="multiSearchVisible"
        @saveMultiSearch="saveMultiSearch"
        @closeMultiSearch="closeMultiSearch"
      />
    </template>

    <el-divider />

    <!-- 时间选择器 -->
    <template>
      <date-range-picker v-model="time" class="date-item" />
    </template>

    <el-divider />

    <!-- 图标选择器 -->
    <template>
      <el-popover placement="bottom-start" width="450" trigger="click" @show="$refs['iconSelect'].reset()">
        <IconSelect ref="iconSelect" @selected="selected" />
        <el-input slot="reference" v-model="icon" style="width: 450px" placeholder="点击选择图标" clearable>
          <svg-icon
            v-if="icon"
            slot="prefix"
            :icon-class="icon"
            class="el-input__icon"
            style="height: 32px; width: 16px"
          />
          <i v-else slot="prefix" class="el-icon-search el-input__icon" />
        </el-input>
      </el-popover>
    </template>

    <!-- 返回顶部 -->
    <template>
      <Backtop />
    </template>
  </div>
</template>

<script>
import ColorSelect from '@/components/ColorSelect'
import Form from '@/components/Form'
import formData from './formData'
import Tree from '@/components/Tree'
import Link from '@/components/Link'
import UploadAvatar from '@/components/Upload/uploadAvatar'
import UploadImg from '@/components/Upload/uploadImg'
import UploadFile from '@/components/Upload/uploadFile'
import Backtop from '@/components/BackTop'
import MultiSearch from '@/components/MultiSearch'
import DateRangePicker from '@/components/DateRangePicker'
import IconSelect from '@/components/IconSelect'

export default {
  components: {
    ColorSelect,
    Form,
    Tree,
    Link,
    UploadAvatar,
    UploadImg,
    UploadFile,
    Backtop,
    MultiSearch,
    DateRangePicker,
    IconSelect
  },
  data() {
    return {
      avatarShow: false,
      color: '#ff8c00',
      dialogVisible: false,
      layout1: {
        gutter: 20,
        span: 24,
        xs: 24,
        sm: 12,
        md: 8,
        xl: 6
      },
      layout2: {
        gutter: 20,
        span: undefined,
        xs: 24,
        sm: 12,
        md: 8,
        xl: 6
      },
      formData: {}, // 表单数据
      formList: formData.formList, // 表单规则
      formHandle: formData.formHandle, // 表单按钮
      treeData: [], // 树形菜单
      multiSearchVisible: false,
      time: '',
      icon: null
    }
  },
  watch: {},
  mounted() {
    // 按钮事件
    this.formHandle.forEach(item => {
      switch (item.label) {
        case '确定': {
          item.handle = row => {
            this.handleSubmit(row)
          }
          break
        }
        case '取消': {
          item.handle = row => {
            this.cancel(row)
          }
          break
        }
      }
    })
    // 联动事件
    this.formList.forEach(item => {
      switch (item.prop) {
        case 'sex': {
          item.change = row => {
            this.onChange1(row)
          }
          break
        }
        case 'select': {
          item.change = row => {
            this.onChange2(row)
          }
          break
        }
        case 'selects': {
          item.change = row => {
            this.onChange3(row)
          }
          break
        }
      }
    })
    this.formData = {
      name: '111',
      number: 2,
      phone: '13645678901',
      select: 1,
      tableSelect: '11',
      date: '2020-08-17',
      dateTime: '2020-08-10 12:00:00',
      timerange: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      daterange: ['2020-08-04', '2020-09-16'],
      datetimerange: ['2020-08-18 00:00:00', '2020-09-22 00:00:00'],
      pwd: '11222',
      radio: 1,
      selects: [1, 2],
      sex: 1,
      switch: false,
      time: new Date(2016, 9, 10, 18, 40),
      textarea: '123123123123'
    }
    this.treeData = [
      {
        id: 1,
        label: '一级 1',
        children: [
          {
            id: 4,
            label: '二级 1-1',
            children: [
              {
                id: 9,
                label: '三级 1-1-1'
              },
              {
                id: 10,
                label: '三级 1-1-2'
              }
            ]
          }
        ]
      },
      {
        id: 2,
        label: '一级 2',
        children: [
          {
            id: 5,
            label: '二级 2-1'
          },
          {
            id: 6,
            label: '二级 2-2'
          }
        ]
      },
      {
        id: 3,
        label: '一级 3',
        children: [
          {
            id: 7,
            label: '二级 3-1'
          },
          {
            id: 8,
            label: '二级 3-2'
          }
        ]
      }
    ]
  },
  methods: {
    // 上传头像
    toggleShow() {
      this.avatarShow = !this.avatarShow
    },
    // 获取文件路径
    getFileUrl(url) {
      console.log('文件路径:', url)
    },
    // 改变颜色
    colorChange(e) {
      console.log('改变颜色:', e)
      this.color = e
    },
    // 联动事件
    onChange1(row) {
      console.log('联动事件：', row)
      this.formList.forEach(item => {
        if (item.prop === 'select') {
          this.formData[item.prop] = null
          if (row === 1) {
            item.options = [
              {
                label: '单选一',
                value: 1
              },
              {
                label: '单选二',
                value: 2
              },
              {
                label: '单选三',
                value: 3
              },
              {
                label: '单选四',
                value: 4
              }
            ]
          } else {
            item.options = [
              {
                label: '单选一',
                value: 1
              },
              {
                label: '单选二',
                value: 2
              }
            ]
          }
        }
      })
    },
    // 改变事件2
    onChange2(row) {
      console.log('数据改变事件2：', row)
    },
    // 改变事件3
    onChange3(row) {
      console.log('数据改变事件3：', row)
    },
    // 提交
    handleSubmit() {
      console.log('提交：', this.formData)
      this.dialogVisible = false
    },
    // 取消
    cancel() {
      console.log('取消')
      this.dialogVisible = false
    },
    // 点击菜单事件
    handleNodeClick(node) {
      console.log('点击菜单:', node)
    },
    // 保存多条件查询
    saveMultiSearch(value) {
      console.log('多条件查询:', value)
      let pararms = []
      value.forEach(item => {
        if (item.value) {
          pararms.push(item.value)
        }
      })
      pararms = pararms.join()
      console.log('转换后的查询条件:', pararms)
      this.multiSearchVisible = false
    },
    // 关闭多条件查询
    closeMultiSearch() {
      this.multiSearchVisible = false
    },
    // 选中图标
    selected(name) {
      this.icon = name
    }
  }
}
</script>

<style>
</style>
