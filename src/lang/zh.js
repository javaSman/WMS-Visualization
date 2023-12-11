export default {
  route: {
    dashboard: '首页',
    documentation: '文档',
    guide: '引导页',
    permission: '权限测试页',
    rolePermission: '角色权限',
    pagePermission: '页面权限',
    directivePermission: '指令权限',
    icons: '图标',
    components: '组件',
    tinymce: '富文本编辑器',
    markdown: 'Markdown',
    jsonEditor: 'JSON 编辑器',
    dndList: '列表拖拽',
    splitPane: 'Splitpane',
    avatarUpload: '头像上传',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'Count To',
    componentMixin: '小组件',
    backToTop: '返回顶部',
    dragDialog: '拖拽 Dialog',
    dragSelect: '拖拽 Select',
    dragKanban: '可拖拽看板',
    charts: '图表',
    keyboardChart: '键盘图表',
    lineChart: '折线图',
    mixChart: '混合图表',
    example: '综合实例',
    nested: '路由嵌套',
    menu1: '菜单1',
    'menu1-1': '菜单 1-1',
    'menu1-2': '菜单 1-2',
    'menu1-2-1': '菜单 1-2-1',
    'menu1-2-2': '菜单 1-2-2',
    'menu1-3': '菜单 1-3',
    menu2: '菜单 2',
    Table: 'Table',
    dynamicTable: '动态 Table',
    dragTable: '拖拽 Table',
    inlineEditTable: 'Table 内编辑',
    complexTable: '综合 Table',
    tab: 'Tab',
    form: '表单',
    createArticle: '创建文章',
    editArticle: '编辑文章',
    articleList: '文章列表',
    errorPages: '错误页面',
    page401: '401',
    page404: '404',
    errorLog: '错误日志',
    excel: 'Excel',
    exportExcel: '导出 Excel',
    selectExcel: '导出 已选择项',
    mergeHeader: '导出 多级表头',
    uploadExcel: '上传 Excel',
    zip: 'Zip',
    pdf: 'PDF',
    exportZip: 'Export Zip',
    profile: '个人中心',

    // 路由菜单
    // 租户管理
    tenant: '租户管理',
    saas: 'saas',

    // 系统管理
    systemAdm: '系统管理',
    user: '用户管理',
    role: '角色管理',
    dictionary: '数据字典',
    organization: '组织机构',
    job: '岗位管理',
    employee: '职员管理',
    log: '系统日志',
    colModel: '列模板管理',
    customereditor: '操作记录',
    boxLogCheck: 'Wcs日志',
    appVersionAdm: '软件版本管理',

    // *****业务(各项目不同)****
    // 基础数据
    baseData: '仓库管理',
    baseInfo: '基础数据',
    materials: '物料',
    materialsBarcode: '物料条码',
    materialType: '物料类型',
    box: '托盘管理',
    areas: '区域管理',
    warehouse: '仓库管理',
    conveyerLine: '线体管理',
    units: '单位管理',
    locations: '货位管理',
    wharf: '码头管理',
    device: '设备管理',
    conveyorLine: '输送线',
    ConveyerLineNew: '线体管理(New)',
    deviceShowInfo: '设备状态',
    lineCache: '缓存位管理',
    userWarehouse: '用户仓库权限',
    shelf: '货架管理',
    stockInformation: '出入库信息',

    // 盘点管理
    inventoryAdm: '盘点管理',
    // InventoryPlan: '盘点计划',
    inventoryOrder: '盘点单',

    // 库存管理
    stockAdm: '库存管理',
    stock: '库存管理',
    stockReport: '库存报表',
    materialReport: '物料汇总',
    stockSafety: '库存预警',
    stockLock: '锁库管理',

    // 入库管理
    inStockAdm: '入库管理',
    inShelves: '上架管理',
    inStock: '入库单管理',
    // InRequest: '入库申请单管理',
    delivery: '收货单管理',

    // 出库管理
    outStockAdm: '出库管理',
    outShelves: '下架管理',
    outStock: '出库单管理',
    // OutRequest: '出库申请单管理',
    readyMaterials: '备料单管理',
    return: '退货单管理',

    // 策略管理
    StrategyAdm: '策略管理',
    inStockStrategy: '入库策略',
    outStockStrategy: '出库策略',
    // WeighAndTest: '称重&外观检查',
    strategyConfig: '策略配置',
    strategyDetails: '策略字典',
    strategyFlow: '策略流程',
    strategyFlowGather: '策略流程模板',

    // 分拣管理
    sortingAdm: '分拣管理',
    sorting: '分拣单管理',
    sortingDesk: '分拣台管理',

    // WCS任务管理
    wcsTaskAdm: '任务管理',
    wcsTask: '任务管理',

    // 调拨管理
    transferAdm: '调拨管理',
    transfer: '物料调拨',

    // 报表管理
    // reportAdm: '报表管理',
    reportManagement: '报表管理',
    inventoryReport: '物料报表',
    materialResume: '物料履历',
    handover: '托盘移交',
    overTimeReport: '超时报表',
    boxInStockReport: '在库报表',

    // QC
    qcAdm: '质检管理',
    qcRecord: '质检记录',
    badInfo: '不良记录',

    // 看板组别管理
    billboardAdm: '看板组别管理',
    groupHeader: '看板组别',
    groupDetails: '看板组别明细',

    // 模板页管理
    templateAdm: '模板页管理',
    singleTable: '单表-基础-模板页',
    subparentTable: '主从表-基础-模板页',
    template03: '模板页3',
    taskType: '任务类型',
    // *****业务****
    warehouseMoveAdm: '输送线可视化管理',
    warehouseMove: '输送线可视化', // 3725
    conveyorBeltMove: '输送线可视化3881' // 3881
  },

  // 按钮
  button: {
    search: '搜索',
    reset: '重置',
    export: '导出',
    import: '导入',
    add: '新增',
    edit: '修改',
    save: '保存',
    batchUpdate: '批量更新',
    priority: '优先',
    addBoxInSend: '补入站通知',
    execute: '执行',
    reportTask: '报工',
    BatchCancel: '批量取消',
    resend: '重发',
    print: '打印',
    reprint: '补打',
    outShelves: '下架',
    batchShelves: '批量下架',
    alleyOutShelves: '按巷道下架',
    inventory: '盘点',
    audit: '审核',
    rePassword: '重置密码',
    delete: '删除',
    restore: '恢复系统设置',
    continueAdd: '继续新增',
    addDetail: '新增明细',
    delDetail: '删除明细',
    cancel: '取消',
    confirm: '确定',
    InstockRequest: '申请入库',
    disenable: '停用',
    enable: '启用',
    // reset: '复位',
    reStart: '重启上位机',
    getNewTask: '获取新任务',
    stopIn: '禁止入库',
    allowIn: '允许入库',
    stopInAndOut: '库位禁用',
    allowInAndOut: '库位启用',
    ForceUpdateTaskState: '强制更新任务状态',
    ForceOutStock: '强制出库',
    update: '修改'
  },

  // 对话框
  dialog: {
    add: '新增',
    edit: '编辑',
    batchUpdate: '批量更新',
    batchShelves: '批量下架',
    tip: '提示',
    select: '选择',
    rePassword: '重置密码',
    deleteTips: '确认删除选中项?',
    resendTips: '确认重发选中项吗?',
    outShelvesTips: '确认下架选中项?',
    colTips: '是否恢复至原始设置?',
    pleaseSelect: '请选择',
    pleaseEnter: '请输入',
    lineCache: '缓存位'
  },

  // 对话框标题
  dialogHeader: {
    list: '列表',
    // 系统管理
    user: '用户',
    role: '角色',
    org: '组织机构',
    dict: '字典',
    dictDetails: '字典详情',
    job: '岗位',
    employee: '职员',
    log: '系统日志',
    colTemplate: '列模板',
    colTemplateDetails: '列模板详情',
    rePassword: '重置密码',
    modulePermissions: '模块权限',
    editColumn: '编辑列',

    // *****业务(各项目不同)****
    // // 基础数据
    materials: '物料',
    // materialsBarcode: 'Material Barcode物料条码',
    materialType: '物料类型',
    box: '托盘',
    areas: '区域',
    warehouse: '仓库',
    unit: '单位',
    locations: '货位',
    wharf: '码头',
    conveyorLine: '输送线',
    userWarehouse: '用户仓库权限',
    shelf: '货架',
    locationsInfo: '货位信息',
    device: '设备',
    inventoryOrder: '盘点单',

    stock: '库存',
    stockReport: '库存报表',
    conveyerLine: '线体',
    materialSummary: '物料汇总',
    warning: '预警',
    lockedInventory: '锁库',
    inStockOrder: '入库单',
    outStockOrder: '出库单',
    strategyConfig: '策略配置',
    strategyDetails: '策略明细',
    strategyFlow: '策略流程',
    strategyFlowGather: '策略流程集合',
    sortingDesk: '分拣台',
    wcsTask: 'WCS任务',
    materialResume: '物料履历',
    reportManagement: '报表管理',
    inventoryReport: '物料报表',
    overTimeReport: '超时报表',
    boxInStockReport: '在库报表',
    boxDetails: '托盘明细',
    inventoryOrderDetails: '盘点单明细',
    inShelvesOrderDetails: '上架单明细',
    deliveryOrderDetails: '收货单明细',
    inStockOrderDetails: '入库单明细',
    receiptDetails: '收货单明细',
    outStockOrderDetails: '出库单明细',
    readyMaterialsOrderDetails: '备料单明细',
    returnOrderDetails: '退货单明细',
    sortingOrderDetails: '分拣单明细',
    sortingBoxDetails: '分拣箱明细',
    materialTransferDetails: '物料调拨明细',
    handoverDetails: '托盘移交明细',
    groupHeader: '组别',
    groupDetails: '组别明细',

    singleTable: '单表-基础-模板页',
    subparentTable: '主从表-基础-模板页',
    template03: 'template03'
    // *****业务****
  },
  // 提示
  notify: {
    success: '成功',
    delSuccess: '删除成功',
    addSuccess: '新增成功',
    editSuccess: '更新成功',
    saveSuccess: '保存成功',
    exportSuccess: '导出成功',
    operateSuccess: '操作成功',

    failure: '失败',
    cancelDel: '已取消删除',
    cancelOutShelves: '已取消下架',
    delFailure: '未删除成功',
    resendFailure: '未重发成功',
    operateFailure: '操作失败',
    exportEmpty: '当前表格为空',
    checkCorrect: '请确保输入无误',
    noData: '没有可保存的数据',
    notSelected: '未选择',
    topHidden: '拖动至顶部隐藏',
    topDisplay: '拖动至顶部显示',
    banDel: '用户不允许被删除',
    banEdit: '该单据已完成，无法进行修改',
    selectCreateOrAssign: '请选择状态为“创建”或“下发”的数据',
    selectCreateOrRun: '请选择状态为“创建”或“运行”的数据',
    selectCancel: '请选择状态为“取消”的数据',
    hasPrioritized: '已优先',
    hasExecuted: '已执行',
    hasCanceled: '已取消'
  },

  // 导入
  upload: {
    uploadFiles: '上传文件',
    downloadTemplate: '下载导入模板',
    uploadToServer: '上传到服务器',
    dragFile: '将文件拖到此处，或',
    clickUpload: '点击上传',
    uploadTips1: '只能上传',
    uploadTips2: '文件，且上限数量为',
    exceededTips1: '当前限制选择',
    exceededTips2: '个文件，本次选择了',
    exceededTips3: '个文件，共选择了',
    exceededTips4: '个文件',
    pleaseSelect: '请先选择文件',
    fileExists: '当前文件已经存在!',
    downloadSuccess: '导入模板下载成功',
    importSuccess: '数据导入成功',
    importFailure: '数据导入失败'
  },

  // table: {
  //   noData: '暂无数据'
  // },
  // 语言切换提示
  lang: {
    tips: '语言切换成功'
  },
  // 布局大小切换提示
  size: {
    default: '默认',
    medium: '中等',
    small: '小',
    mini: '超小',
    tips: '布局大小切换成功'
  },

  navbar: {
    // *****网页标题(各项目不同)****
    title: '仓库管理系统',
    dashboard: '首页',
    github: '项目地址',
    logOut: '退出登录',
    profile: '个人中心',
    theme: '换肤',
    size: '布局大小'
  },
  login: {
    title: '系统登录',
    logIn: '登录',
    tenant: '租户',
    username: '账号',
    password: '密码',
    customerType: '账号类型',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },
  documentation: {
    documentation: '文档',
    github: 'Github 地址'
  },
  permission: {
    addRole: '新增角色',
    editPermission: '编辑权限',
    roles: '你的权限',
    switchRoles: '切换权限',
    tips: '在某些情况下，不适合使用 v-permission。例如：Element-UI 的 el-tab 或 el-table-column 以及其它动态渲染 dom 的场景。你只能通过手动设置 v-if 来实现。',
    delete: '删除',
    confirm: '确定',
    cancel: '取消'
  },
  guide: {
    description: '引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于',
    button: '打开引导'
  },
  components: {
    documentation: '文档',
    tinymceTips:
      '富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见',
    dropzoneTips:
      '由于我司业务有特殊需求，而且要传七牛 所以没用第三方，选择了自己封装。代码非常的简单，具体代码你可以在这里看到 @/components/Dropzone',
    stickyTips: '当页面滚动到预设的位置会吸附在顶部',
    backToTopTips1: '页面滚动到指定位置会在右下角出现返回顶部按钮',
    backToTopTips2:
      '可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
    imageUploadTips:
      '由于我在使用时它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的话，优先还是使用官方版本。'
  },
  table: {
    noData: '暂无数据',

    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    title: '标题',
    importance: '重要性',
    type: '类型',
    remark: '点评',
    search: '搜索',
    add: '添加',
    export: '导出',
    reviewer: '审核人',
    id: '序号',
    date: '时间',
    author: '作者',
    readings: '阅读数',
    status: '状态',
    actions: '操作',
    edit: '编辑',
    publish: '发布',
    draft: '草稿',
    delete: '删除',
    cancel: '取 消',
    confirm: '确 定'
  },
  example: {
    warning:
      '创建和编辑页面是不能被 keep-alive 缓存的，因为keep-alive 的 include 目前不支持根据路由来缓存，所以目前都是基于 component name 来进行缓存的。如果你想类似的实现缓存效果，可以使用 localStorage 等浏览器缓存方案。或者不要使用 keep-alive 的 include，直接缓存所有页面。详情见'
  },
  errorLog: {
    tips: '请点击右上角bug小图标',
    description:
      '现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
    documentation: '文档介绍'
  },
  excel: {
    export: '导出',
    selectedExport: '导出已选择项',
    placeholder: '请输入文件名(默认excel-list)'
  },
  zip: {
    export: '导出',
    placeholder: '请输入文件名(默认file)'
  },
  pdf: {
    tips: '这里使用   window.print() 来实现下载pdf的功能'
  },
  theme: {
    change: '换肤',
    documentation: '换肤文档',
    tips: 'Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文档。'
  },
  tagsView: {
    refresh: '刷新',
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  },
  settings: {
    title: '系统布局配置',
    theme: '主题色',
    tagsView: '开启 Tags-View',
    fixedHeader: '固定 Header',
    sidebarLogo: '侧边栏 Logo'
  }
}
