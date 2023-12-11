import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

// 导入组件模块路由
// import componentsRouter from './modules/components'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果设置为true，则item将不会显示在侧边栏中(默认为false)
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果没有设置alwaysShow，当item有多个子route时，
 *                                它将变成嵌套模式，否则不会显示根菜单
 * redirect: noRedirect           如果设置noRedirect将不会在面包屑中重定向
 * name:'router-name'             the name is used by <keep-alive> (必须设置)
 * meta : {
    roles: ['admin','editor']    控制页面角色(您可以设置多个角色)
    title: 'title'               名称显示在侧边栏和面包屑 (recommend set)
    icon: 'svg-name'             图标显示在侧边栏
    noCache: true                如果设置为true，页面将不会被缓存(默认为false)
    affix: true                  如果设置为true，标签将被添加到标签视图中
    breadcrumb: false            如果设置为false，该项目将隐藏在breadcrumb中(默认为true)
    activeMenu: '/example/list'  如果设置路径，工具条将突出显示您设置的路径
  }
 */

/**
 * constantRoutes
 * 没有权限要求的基本页面
 * 所有角色可以访问
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [
  // {
  //   path: '/saas',
  //   component: Layout,
  //   redirect: '/saas/tenant',
  //   alwaysShow: true,
  //   name: 'SAAS',
  //   meta: {
  //     title: 'saas',
  //     icon: 'cloud',
  //     roles: ['AbpTenantManagement.Tenants']
  //   },
  //   children: [
  //     {
  //       path: 'tenant',
  //       component: () => import('@/views/tenant/index'),
  //       name: 'Tenant',
  //       meta: {
  //         title: 'tenant',
  //         roles: ['AbpTenantManagement.Tenants'],
  //         icon: 'users'
  //       }
  //     }
  //   ]
  // },
  // 系统管理
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    alwaysShow: true,
    name: 'SystemManagement',
    meta: {
      title: 'systemAdm',
      icon: 'systemAdm',
      roles: ['Systems']
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/systemAdm/user/index'),
        name: 'User',
        meta: {
          title: 'user',
          roles: ['AbpIdentity.Users'],
          icon: 'user'
        }
      },
      {
        path: 'role',
        component: () => import('@/views/systemAdm/role/index'),
        name: 'Role',
        meta: {
          title: 'role',
          roles: ['AbpIdentity.Roles'],
          icon: 'role'
        }
      },

      {
        path: 'dict',
        component: () => import('@/views/systemAdm/dict/index'),
        name: 'Dictionary',
        meta: {
          title: 'dictionary',
          roles: ['Systems.DataDictionary'],
          icon: 'dict'
        }
      },
      {
        path: 'log',
        component: () => import('@/views/systemAdm/log/index'),
        name: 'Log',
        meta: {
          title: 'log',
          roles: ['Systems.AuditLogging'],
          icon: 'log'
        }
      },
      {
        path: 'colModel',
        component: () => import('@/views/systemAdm/colModel/index'),
        name: 'ColModel',
        meta: {
          title: 'colModel',
          roles: ['Systems.TableTemplate'],
          icon: 'colModel'
        }
      }
      // {
      //  path: 'appVersion',
      //  component: () => import('@/views/systemAdm/appVersion/index'),
      //  name: 'appVersion',
      //  meta: {
      //    title: 'appVersionAdm',
      //    roles: ['Systems.TableTemplate'],
      //    icon: 'appVersion'
      //  }
      // }
    ]
  },
  {
    path: '/customerEditorManagement',
    component: Layout,
    redirect: '/customerEditorManagement/customereditor',
    alwaysShow: true,
    name: 'customerEditorManagement',
    meta: {
      title: 'customereditor',
      icon: 'log',
      roles: ['CustomerEditorManagement']
    },
    children: [
      {
        path: 'customereditor',
        component: () => import('@/wms/baseData/customerEditor/index'),
        name: 'customereditor',
        meta: {
          title: 'customereditor',
          roles: ['CustomerEditorManagement.CustomerEditor'],
          icon: 'log'
        }
      }
    ]
  },

  {
    path: '/boxLogCheckManagement',
    component: Layout,
    redirect: '/boxLogCheckManagement/boxLogCheck',
    alwaysShow: true,
    name: 'BoxLogCheckManagement',
    meta: {
      title: 'boxLogCheck',
      icon: 'log',
      roles: ['BoxLogCheckManagement']
    },
    children: [
      {
        path: 'boxLogCheck',
        component: () => import('@/wms/baseData/boxLogCheck/index'),
        name: 'boxLogCheck',
        meta: {
          title: 'boxLogCheck',
          roles: ['BoxLogCheckManagement.BoxLogCheck'],
          icon: 'log'
        }
      }
    ]
  },
  // 基础信息(基础数据)
  // {
  //   path: '/baseInfo',
  //   component: Layout,
  //   redirect: '/baseInfo/materials',
  //   alwaysShow: true,
  //   name: 'baseInfo',
  //   meta: {
  //     title: 'baseInfo',
  //     icon: 'baseInfo',
  //     roles: ['Basics']
  //   },
  //   children: [
  //     // 物料
  //     {
  //       path: 'materials',
  //       component: () => import('@/wms/baseInfo/materials/index'),
  //       name: 'Materials',
  //       meta: {
  //         title: 'materials',
  //         roles: ['Basics.Materials'],
  //         icon: 'materials'
  //       }
  //     }
  //   ]
  // },
  // 基础数据（仓库管理）
  {
    path: '/baseData',
    component: Layout,
    redirect: '/baseData/materials',
    alwaysShow: true,
    name: 'BaseData',
    meta: {
      title: 'baseData',
      icon: 'baseData',
      roles: ['WarehouseManagement']
    },
    children: [
      // 仓库管理
      {
        path: 'warehouse',
        component: () => import('@/wms/baseData/warehouse/index'),
        name: 'Warehouse',
        meta: {
          title: 'warehouse',
          roles: ['WarehouseManagement.Warehouse'],
          icon: 'warehouse'
        }
      },
      // 托盘管理
      {
        path: 'box',
        component: () => import('@/wms/baseData/box/index'),
        name: 'Box',
        meta: {
          title: 'box',
          roles: ['WarehouseManagement.Box'],
          icon: 'box'
        }
      },
      // 货位管理
      {
        path: 'locations',
        component: () => import('@/wms/baseData/locations/index'),
        name: 'Locations',
        meta: {
          title: 'locations',
          roles: ['WarehouseManagement.Locations'],
          icon: 'locations'
        }
      },
      // 码头管理
      {
        path: 'wharf',
        component: () => import('@/wms/baseData/wharf/index'),
        name: 'Wharf',
        meta: {
          title: 'wharf',
          roles: ['WarehouseManagement.Wharf'],
          icon: 'wharf'
        }
      },
      // 设备管理
      {
        path: 'device',
        component: () => import('@/wms/baseData/device/index'),
        name: 'device',
        meta: {
          title: 'device',
          roles: ['WarehouseManagement.Device'],
          icon: 'warehouse'
        }
      },
      // // 线体管理
      // {
      //  path: 'conveyerLine',
      //  component: () => import('@/wms/baseData/conveyerLine/index'),
      //  name: 'conveyerLine',
      //  meta: {
      //    title: 'conveyerLine',
      //    roles: ['WarehouseManagement.ConveyerLine'],
      //    icon: 'warehouse'
      //  }
      // },
      // 线体管理New
      {
        path: 'ConveyerLineNew',
        component: () => import('@/wms/baseData/conveyerLineNew/index'),
        name: 'ConveyerLineNew',
        meta: {
          title: 'ConveyerLineNew',
          roles: ['WarehouseManagement.ConveyerLine'],
          icon: 'warehouse'
        }
      },
      // 缓存位管理
      {
        path: 'lineCache',
        component: () => import('@/wms/baseData/lineCache/index'),
        name: 'lineCache',
        meta: {
          title: 'lineCache',
          roles: ['WarehouseManagement.LineCache'],
          icon: 'warehouse'
        }
      },
      {
        path: 'stockInformation',
        component: () => import('@/wms/baseData/stockInformation/index'),
        name: 'stockInformation',
        meta: {
          title: 'stockInformation',
          // roles: ['WarehouseManagement.LineCache'],
          icon: 'warehouse'
        }
      }
    ]
  },
  // 报表管理
  {
    path: '/reportManagement',
    component: Layout,
    redirect: '/reportManagement/inventoryReport',
    alwaysShow: true,
    name: 'ReportManagement',
    meta: {
      title: 'reportManagement',
      icon: 'materialResume',
      roles: ['Report']
    },
    children: [
      // 设备状态
      {
        path: 'deviceShowInfo',
        component: () => import('@/wms/reportManagement/deviceShowInfo'),
        name: 'DeviceShowInfo',
        meta: {
          title: 'deviceShowInfo',
          icon: 'materialResume',
          roles: ['Report.DeviceShowInfo']
        }
      },
      // 库存报表
      // {
      //  path: 'inventoryReport',
      //  component: () => import('@/wms/reportManagement/inventoryReport'),
      //  name: 'InventoryReport',
      //  meta: {
      //    title: 'inventoryReport',
      //    icon: 'materialResume',
      //    roles: ['Report.InventoryReport']
      //  }
      // },
      // 超时报表
      {
        path: 'overTimeReport',
        component: () => import('@/wms/reportManagement/overTimeReport'),
        name: 'OverTimeReport',
        meta: {
          title: 'overTimeReport',
          icon: 'materialResume',
          roles: ['Report.OverTimeReport']
        }
      },
      // 在库报表
      {
        path: 'boxInStockReport',
        component: () => import('@/wms/reportManagement/boxInStockReport'),
        name: 'BoxInStockReport',
        meta: {
          title: 'boxInStockReport',
          icon: 'materialResume',
          roles: ['Report.BoxInStockReport']
        }
      }
    ]
  },
  // 入库管理
  // {
  //  path: '/inStockAdm',
  //  component: Layout,
  //  redirect: '/inStockAdm/inShelves',
  //  alwaysShow: true,
  //  name: 'InStockAdm',
  //  meta: {
  //    title: 'inStockAdm',
  //    roles: ['InStock'],
  //    icon: 'inStockAdm'
  //  },
  //  children: [
  //    {
  //      path: 'inShelves',
  //      component: () => import('@/wms/inStockAdm/inShelves'),
  //      name: 'InShelves',
  //      meta: {
  //        title: 'inShelves',
  //        roles: ['InStock.InShelves'],
  //        icon: 'inShelves'
  //      }
  //    }
  //  ]
  // },
  // // 出库管理
  // {
  //  path: '/outStockAdm',
  //  component: Layout,
  //  redirect: '/outStockAdm/outShelves',
  //  alwaysShow: true,
  //  name: 'OutStockAdm',
  //  meta: {
  //    title: 'outStockAdm',
  //    roles: ['OutStock'],
  //    icon: 'outStockAdm'
  //  },
  //  children: [
  //    {
  //      path: 'outShelves',
  //      component: () => import('@/wms/outStockAdm/outShelves'),
  //      name: 'OutShelves',
  //      meta: {
  //        title: 'outShelves',
  //        roles: ['OutStock.OutShelves'],
  //        icon: 'outShelves'
  //      }
  //    }
  //  ]
  // },
  // 策略管理
  {
    path: '/strategyAdm',
    component: Layout,
    redirect: '/strategyAdm/inStockStrategy',
    alwaysShow: true,
    name: 'StrategyAdm',
    meta: {
      title: 'StrategyAdm',
      roles: ['Strategy'],
      icon: 'strategyAdm'
    },
    children: [
      {
        path: 'strategyDetails',
        component: () => import('@/wms/strategyAdm/strategyDetails'),
        name: 'StrategyDetails',
        meta: {
          title: 'strategyDetails',
          roles: ['Strategy.StrategyDetails'],
          icon: 'strategyDetails'
        }
      },
      {
        path: 'strategyFlowGather',
        component: () => import('@/wms/strategyAdm/strategyFlowGather'),
        name: 'StrategyFlowGather',
        meta: {
          title: 'strategyFlowGather',
          roles: ['Strategy.StrategyFlowGather'],
          icon: 'strategyFlowGather'
        }
      },
      {
        path: 'strategyConfig',
        component: () => import('@/wms/strategyAdm/strategyConfig'),
        name: 'StrategyConfig',
        meta: {
          title: 'strategyConfig',
          roles: ['Strategy.StrategyConfig'],
          icon: 'strategyConfig'
        }
      },
      {
        path: 'strategyFlow',
        component: () => import('@/wms/strategyAdm/strategyFlow'),
        name: 'StrategyFlow',
        meta: {
          title: 'strategyFlow',
          roles: ['Strategy.StrategyFlow'],
          icon: 'strategyFlow'
        }
      }
    ]
  },
  // WCS任务管理
  {
    path: '/wcsAdm',
    component: Layout,
    redirect: '/wcsAdm/wcsTask',
    alwaysShow: true,
    name: 'WCSAdm',
    meta: {
      title: 'wcsTaskAdm',
      roles: ['TaskInfoManage'],
      icon: 'wcsTask'
    },
    children: [
      {
        path: 'wcsTask',
        component: () => import('@/wms/wcsAdm/wcsTask'),
        name: 'WCSTask',
        meta: {
          title: 'wcsTask',
          roles: ['TaskInfoManage.TaskInfo'],
          icon: 'wcsTask'
        }
      }
    ]
  },
  {
    path: '/warehouseMoveAdm',
    component: Layout,
    redirect: '/warehouseMoveAdm/warehouseMove',
    alwaysShow: true,
    name: 'WarehouseMoveAdm',
    meta: {
      title: 'warehouseMoveAdm',
      icon: 'wcsTask'
    },
    children: [
      {
        path: 'warehouseMove3725',
        component: () => import('@/wms/warehouseMoveAdm/warehouseMove3725'),
        name: 'WarehouseMove3725',
        meta: {
          title: 'warehouseMove3725',
          icon: 'wcsTask'
        }
      },
      {
        path: 'warehouseMove',
        component: () => import('@/wms/warehouseMoveAdm/warehouseMove'),
        name: 'WarehouseMove',
        meta: {
          title: 'warehouseMove',
          icon: 'wcsTask'
        }
      }
      // {
      //  path: 'conveyorBeltMove',
      //  component: () => import('@/wms/warehouseMoveAdm/conveyorBeltMove'),
      //  name: 'ConveyorBeltMove',
      //  meta: {
      //    title: 'conveyorBeltMove',
      //    icon: 'wcsTask'
      //  }
      // }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
