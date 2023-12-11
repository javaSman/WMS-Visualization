<template>
  <div>
    <el-row style="padding: 30px">
      <el-col :xs="16" :sm="16" :lg="16">
        <div class="theme">
          <div class="theme_image">
            <div class="theme_ctitle">仓库管理系统</div>
            <!-- <div class="theme_ctitle">{{ $t('navbar.title') }}</div> -->
            <div class="theme_etitle">Warehouse Management System</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>
<style scoped>
.theme {
  height: 300px;
  min-width: 680px;
  background: radial-gradient(circle at 0%, #398dee -50%, #dfecfc82 100%);
  box-shadow: rgb(221, 221, 221) 0px 0px 4px;
  border-radius: 4px;
}

.theme_image {
  background: url('../../../static/image/common/wms.png') no-repeat;
  background-size: 500px;
  background-position: 110% -20%;
  height: 300px;
  opacity: 0.8;
  padding: 50px;
}

.theme_ctitle {
  color: #fff;
  font-size: 50px;
}

.theme_etitle {
  color: #e3eefb;
  font-size: 30px;
}
</style>
