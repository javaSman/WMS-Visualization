export default {
  route: {
    dashboard: 'トップ',
    documentation: 'ドキュメント',
    guide: 'ガイド',
    permission: '権限',
    rolePermission: '権限ロール',
    pagePermission: 'ページ権限',
    directivePermission: 'ディレクティブ権限',
    icons: 'アイコン',
    components: 'コンポーネント',
    tinymce: 'TinyMCE',
    markdown: 'Markdown',
    jsonEditor: 'JSON Editor',
    dndList: 'Drag-And-Drop',
    splitPane: 'パネル',
    avatarUpload: 'アバターアップロード',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'Count To',
    componentMixin: 'コンポーネントMixin',
    backToTop: 'BackToTop',
    dragDialog: 'Drag Dialog',
    dragSelect: 'Drag Select',
    dragKanban: 'Drag 看板',
    charts: 'チャート',
    keyboardChart: 'Keyboardチャート',
    lineChart: 'Lineチャート',
    mixChart: 'Mixチャート',
    example: 'Example',
    nested: 'Nested Routes',
    menu1: 'メニュー１',
    'menu1-1': 'メニュー 1-1',
    'menu1-2': 'メニュー 1-2',
    'menu1-2-1': 'メニュー 1-2-1',
    'menu1-2-2': 'メニュー 1-2-2',
    'menu1-3': 'メニュー 1-3',
    menu2: 'メニュー 2',
    Table: 'Table',
    dynamicTable: '可変 Table',
    dragTable: 'Drag Table',
    inlineEditTable: 'Inline Edit Table',
    complexTable: 'Complex Table',
    tab: 'Tab',
    form: 'フォーム',
    createArticle: '投稿作成',
    editArticle: '投稿編集',
    articleList: '投稿リスト',
    errorPages: 'エラーページ',
    page401: '401',
    page404: '404',
    errorLog: 'エラーログ',
    excel: 'Excel',
    exportExcel: '一括エクスポート',
    selectExcel: '複数選択エクスポート',
    mergeHeader: 'ヘッダーマージ',
    uploadExcel: 'アップロード',
    zip: 'Zip',
    pdf: 'PDF',
    exportZip: 'Export Zip',
    theme: 'テーマ変更',
    clipboardDemo: 'Clipboard',
    i18n: '多言語',
    externalLink: '外部リンク',
    profile: 'プロフィール',
    // 路由菜单
    // 租户管理
    tenant: 'テナント管理',
    saas: 'saas',

    // 系统管理
    systemAdm: 'システム管理',
    user: 'ユーザー管理',
    role: 'ロール管理',
    dictionary: 'データ辞書',
    organization: '組織機構',
    job: 'ポジション管理',
    employee: 'スタッフ管理',
    log: 'システムログ',
    colModel: '列テンプレート管理',
    appVersionAdm: 'ソフトウェアバージョン管理',

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
    taskType: '任务类型'
    // *****业务****
  },
  navbar: {
    dashboard: 'トップ',
    github: 'GitHub',
    logOut: 'ログアウト',
    profile: 'プロフィール',
    theme: 'テーマ変更',
    size: '画面サイズ'
  },
  lang: {
    tips: '言語切り替え成功'
  },
  login: {
    title: 'ユーザログイン',
    logIn: 'ログイン',
    username: 'ユーザ名',
    password: 'パスワード',
    any: 'password',
    thirdparty: '外部IDでログイン',
    thirdpartyTips: 'ローカル環境ではログインできません。実装が必要です。'
  },
  documentation: {
    documentation: 'ドキュメント',
    github: 'Github Link'
  },
  permission: {
    addRole: 'ロール追加',
    editPermission: 'ロール変更',
    roles: 'ロール',
    switchRoles: 'ロール切替',
    tips: 'v-permissionは使えない時があります。例えば: Element-UI の el-tab、 el-table-column 及び他の dom。v-ifを使う必要があります。',
    delete: '削除',
    confirm: '確認',
    cancel: 'キャンセル'
  },
  guide: {
    description: 'ガイドは各機能の説明です。',
    button: 'ガイドを見る'
  },
  components: {
    documentation: 'ドキュメント',
    tinymceTips:
      'tinymceは管理画面に重要な機能ですが、その同時に落とし穴がありあす。tinymceを使う道のりが大変でした。Tinymceを使う時に各自のプロジェクト状況で判断が必要です。ドキュメントはこちら',
    dropzoneTips: 'Third partyのパッケージを使わず、独自の実装しています。詳細は @/components/Dropzone',
    stickyTips: 'ページの指定位置へスクロールした場合、表示されます。',
    backToTopTips1: 'トップへスクロールが表示されます。',
    backToTopTips2:
      'ボタンのスタイルはカスタマイズできます。例えば、show/hide、height、position。 またはElementのel-tooltipを使って、ツールチップを実装できます。',
    imageUploadTips: 'mockjsは使えないため、カスタマイズしています。公式の最新バージョンを使ってください。'
  },
  table: {
    dynamicTips1: '先頭は固定、最後に追加',
    dynamicTips2: '戦後に追加せず、指定列に追加',
    dragTips1: 'デフォルト順番',
    dragTips2: 'Drag後の順番',
    title: 'タイトル',
    importance: '重要',
    type: 'タイプ',
    remark: '評価',
    search: '検索',
    add: '追加',
    export: 'エクスポート',
    reviewer: 'レビュアー',
    id: '番号',
    date: '日時',
    author: '作成者',
    readings: '閲覧数',
    status: 'ステータス',
    actions: '操作',
    edit: '編集',
    publish: '公開',
    draft: '下書き',
    delete: 'キャンセル',
    cancel: 'キャンセル',
    confirm: '確認'
  },
  example: {
    warning:
      '新規作成と編集画面は keep-alive を使えないです。keep-alive の include はrouteのキャッシュは使えないです。そのため、component name を使ってキャッシュさせるようにします。このようなキャッシュ機能を作りたい場合，localStorageを使う手があります。もしくは keep-alive の includeを使って、全ページキャッシュする方法はあります。'
  },
  errorLog: {
    tips: '右上のbugアイコンをクリックしてください。',
    description:
      '管理画面はspaを使う場合が多い、ユーザ体現向上はできますが、想定外エラーが発生する場合があります。Vueはそのエラーハンドリング機能を提供し、エラーレポートができます。',
    documentation: 'ドキュメント'
  },
  excel: {
    export: 'エクスポート',
    selectedExport: 'エクスポート対象を選択してください。',
    placeholder: 'ファイル名を入力してください。'
  },
  zip: {
    export: 'エクスポート',
    placeholder: 'ファイル名を入力してください。'
  },
  pdf: {
    tips: 'window.print() を使ってPDFダウンロードしています。'
  },
  theme: {
    change: 'テーマ切替',
    documentation: 'ドキュメント',
    tips: 'Tips: テーマの切り替え方法はnavbarのtheme-pickと異なります、使い方はドキュメントを確認してください。'
  },
  tagsView: {
    refresh: '更新',
    close: '閉じる',
    closeOthers: 'その他閉じる',
    closeAll: 'すべて閉じる'
  },
  settings: {
    title: 'システムテーマ',
    theme: 'テーマ色',
    tagsView: 'Tags-View 開く',
    fixedHeader: 'Fixed Header',
    sidebarLogo: 'Sidebar Logo'
  }
}
