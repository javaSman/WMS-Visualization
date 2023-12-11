<template>
  <div id="app">
    <router-view v-if="isRouterActive"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterActive: true
    }
  },
  methods:{
    reload () {
      this.isRouterActive = false
      this.$nextTick(() => {
        this.isRouterActive = true
      })
    }
  }
}
</script>
