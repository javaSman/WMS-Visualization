import Functions from '@/utils/functions'
import { API } from '@/api/generalAPI'
export default {
  data() {
    return {
      cbgDataAll: [] // 存储源数据
    }
  },
  methods: {
    /** 下拉网存储获取所有的源数据*/
    getCbgOpts(name, params, api, other) {
      let Api = api || API
      Api.getData(name, params, other)
        .then(res => {
          this.cbgDataAll = res.items
          this.cbgAttr.optTotal = res.totalCount
          this.cbgAttr.options = this.formatOpts(this.cbgDataAll, this.cbgAttr)
        })
        .catch(error => {
          console.log(error)
        })
    },

    /** 下拉网数据格式化（自定义搜索和远程搜索均会调用） */
    formatOpts(opts, attr) {
      // 截取前item.count条数据显示，并根据配置的显示optLabel和optValue字段重新赋值
      let data = opts.slice(0, attr.count ? attr.count : opts.length)
      let labelAry = attr.optLabel.split('-') // 将配置框内显示label用'-'分割，并分别获取对应字段值，最后用'-'间隔显示
      data.map(row => {
        let labelData = []
        labelAry.map(label => {
          labelData.push(row[label])
        })
        row.label = labelData.join('-')
        row.value = attr.optValue ? row[attr.optValue] : JSON.stringify(row) // 未设置指定字段值，则默认返回全行数据
      })
      return data
    },

    /** 下拉网（查询字符串，源数据，配置项，指定查询字段）*/
    cbgFilter(str, opts, attr, prop) {
      let results = []
      if (prop) {
        for (let i = 0; i < opts.length; i++) {
          if (opts[i][prop] === str) {
            results.push(opts[i])
            return this.formatOpts(results, attr)
          }
        }
      } else {
        results = str ? opts.filter(Functions.vagueFilter(str, attr.col)) : opts // 全字段模糊查询
        return this.formatOpts(results, attr)
      }
    },

    /** 用于限制数量的下拉网，编辑时，根据传至后端的值（optValue）找到对应的row，再通过回传至options，以供控件获取对应label显示（避免row数据不在options里查询不出label）*/
    cbgUpdate() {
      // 无限制显示count，则不需要查询行
      if (this.cbgAttr.count !== undefined) {
        let row = this.cbgFilter(this.form[this.cbgAttr.prop], this.cbgDataAll, this.cbgAttr, this.cbgAttr.optValue)
        // 获取到的form对应值，源数据，配置项，传往后端的字段（只对应单独的字段，拼接的传值无效）
        this.cbgAttr.options = row
      }
    },

    optFilter(node, str) {
      if (node === this.cbgAttr.prop || node === 1) {
        this.cbgAttr.options = this.cbgFilter(str, this.cbgDataAll, this.cbgAttr)
      }
    },

    /** 若下拉网格使用远程搜索的方式，config下的该条下拉网格需配置【remote: true】,count配置搜索条数
     * 初次获取下拉网格数据-(optTotal数据总量)-远程搜索获取方式 */
    getCbgRemoteOpts(attr, name, extraParams, api, other) {
      let params = { SkipCount: 0, MaxResultCount: attr.count }
      if (extraParams !== undefined) {
        params = Object.assign(params, extraParams)
      }
      let Api = api || API
      Api.getData(name, params, other)
        .then(res => {
          this.$set(attr, 'optTotal', res.totalCount)
          this.$set(attr, 'options', this.formatOpts(res.items, attr))
        })
        .catch(error => {
          console.log(error)
        })
    },

    /** 通过搜索-远程搜索获取方式 */
    getCbgRemoteSearch(attr, name, extraParams, api, other) {
      let params = { SkipCount: 0, MaxResultCount: attr.count }
      if (extraParams !== undefined) {
        params = Object.assign(params, extraParams)
      }
      let Api = api || API
      Api.getData(name, params, other)
        .then(res => {
          this.$set(attr, 'options', this.formatOpts(res.items, attr))
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
