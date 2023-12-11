// 组织机构数据加载
import { API } from '@/api/generalAPI'
import { LOAD_CHILDREN_OPTIONS } from '@riophae/vue-treeselect'

let apiOrgName = 'orgs'
export default {
  data() {
    return {}
  },
  methods: {
    getOrgOpts() {
      /** 加载组织机构 */
      API.getData(apiOrgName, null, 'loadOrgs').then(res => {
        this.orgsAttr.options = res.items.map(function (obj) {
          if (!obj.leaf) {
            obj.children = null
          }
          return obj
        })
      })
    },
    /** 用于动态加载选项-树级下拉列表 */
    loadOptions({ action, parentNode, callback }) {
      if (action === LOAD_CHILDREN_OPTIONS) {
        API.getData(
          apiOrgName,
          {
            id: parentNode.id
          },
          'loadOrgs'
        ).then(res => {
          parentNode.children = res.items.map(function (obj) {
            if (!obj.leaf) {
              obj.children = null
            }
            return obj
          })
          setTimeout(() => {
            callback()
          }, 100)
        })
      }
    },
    /** 用于动态加载选项-级联选择器 */
    lazyLoadOpts(node) {
      // 有子节点且未加载过的节点才执行加载
      if (node && node.level > 0 && node.hasChildren && node.data.children === null) {
        API.getData(
          apiOrgName,
          {
            id: node.data.id
          },
          'loadOrgs'
        ).then(res => {
          node.data.children = res.items.map(function (obj) {
            if (!obj.leaf) {
              obj.children = null
            }
            return obj
          })
        })
      }
    },
    /** ********编辑时获取下拉值********* **/
    getOrgNodes() {
      // 加载组织机构节点
      API.getData(apiOrgName, null, 'loadNodes').then(res => {
        this.loadTree(res, this.orgsAttr.options)
      })
    },
    // TODO：引用公共方法
    loadTree(data, options) {
      data.items.forEach(element => {
        if (!element.pid) {
          element.hasChildren = !element.leaf
          if (!element.leaf) {
            element.children = []
          }
          options.push(element)
        }
      })
      this.setChildren(options, data.items)
    },
    setChildren(options, items) {
      options.forEach(element => {
        items.forEach(item => {
          if (item.pid === element.id) {
            if (!element.children) element.children = []
            element.children.push(item)
          }
        })
        if (element.children) {
          this.setChildren(element.children, items)
        }
      })
    }
    /** ********编辑时获取下拉值********* **/
  }
}
