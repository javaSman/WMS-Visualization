module.exports = {
  root: true, // 表明这就是根目录了，停止去父级目录中寻找配置
  parserOptions: {
    // 此项是用来指定javaScript语言类型和风格，sourceType用来指定js导入的方式，默认是script，此处设置为module，指某块导入方式
    parser: 'babel-eslint', // 此项是用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
    sourceType: 'module' // "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)
  },
  env: {
    //用来预定义全局环境变量，常用的有browser，es6,node,jest,jquery
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    // 规则模版
    'plugin:vue/recommended', // 启用eslint vue插件的规则模版,base,essential,strongly-recommended,recommended(最严)
    'eslint:recommended' // 启用一系列核心规则，
  ],

  /*
    下面这些rules是用来设置从插件来的规范代码的规则，使用必须去掉前缀eslint-plugin-
    主要有如下的设置规则，可以设置字符串也可以设置数字，两者效果一致
    "off" -> 0 关闭规则
    "warn" -> 1 开启警告规则
    "error" -> 2 开启错误规则
  */
  rules: {
    // 补充规则
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 10,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
    // 自闭合-eslintrc与格式化配置冲突-zlh补充，现<*** />
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/name-property-casing': ['error', 'PascalCase'],
    'vue/no-v-html': 'off',
    'accessor-pairs': 2, // 在对象中使用getter/setter
    // "arrow-parens": 2, // 箭头函数用小括号括起来
    'arrow-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ], // =>的前/后括号
    'block-spacing': [2, 'always'],
    'brace-style': [
      2,
      '1tbs',
      {
        allowSingleLine: true
      }
    ], // 大括号风格
    camelcase: [
      0,
      {
        properties: 'always'
      }
    ], // 强制驼峰法命名
    'comma-dangle': [2, 'never'], // 对象字面量项尾不能有逗号
    'comma-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ], // 逗号前后的空格
    'comma-style': [2, 'last'], // 逗号风格，换行时在行首还是行尾
    'constructor-super': 2, // 非派生类不能调用super，派生类必须调用super
    curly: [2, 'multi-line'], // 必须使用 if(){} 中的{}
    'dot-location': [2, 'property'], // 对象访问符的位置，换行的时候在行首还是行尾
    'eol-last': 2, // 文件以单一的换行符结束
    eqeqeq: [
      'error',
      'always',
      {
        null: 'ignore'
      }
    ], // 必须使用全等
    'generator-star-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ], // 生成器函数*的前后空格
    'handle-callback-err': [2, '^(err|error)$'], // nodejs 处理错误
    indent: [
      2,
      2,
      {
        SwitchCase: 1
      }
    ], // 缩进风格
    'jsx-quotes': [2, 'prefer-single'],
    'key-spacing': [
      2,
      {
        beforeColon: false,
        afterColon: true
      }
    ], // 对象字面量中冒号的前后空格
    'keyword-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    'new-cap': [
      2,
      {
        newIsCap: true,
        capIsNew: false
      }
    ], // 函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用
    'new-parens': 2, // new时必须加小括号
    'no-array-constructor': 2, // 禁止使用数组构造器
    'no-caller': 2, // 禁止使用arguments.caller或arguments.callee
    'no-console': 'off', // 禁止使用console
    'no-class-assign': 2, // 禁止给类赋值
    'no-cond-assign': 2, // 禁止在条件表达式中使用赋值语句
    'no-const-assign': 2, // 禁止修改const声明的变量
    'no-control-regex': 0, // 禁止在正则表达式中使用控制字符
    'no-delete-var': 2, // 不能对var声明的变量使用delete操作符
    'no-dupe-args': 2, // 函数参数不能重复
    'no-dupe-class-members': 2,
    'no-dupe-keys': 2, // 在创建对象字面量时不允许键重复 {a:1,a:1}
    'no-duplicate-case': 2, // switch中的case标签不能重复
    'no-empty-character-class': 2, // 正则表达式中的[]内容不能为空
    'no-empty-pattern': 2,
    'no-eval': 2, // 禁止使用eval
    'no-ex-assign': 2, // 禁止给catch语句中的异常参数赋值
    'no-extend-native': 2, // 禁止扩展native对象
    'no-extra-bind': 2, // 禁止不必要的函数绑定
    'no-extra-boolean-cast': 2, // 不必要的bool转换
    'no-extra-parens': [2, 'functions'], // 非必要的括号
    'no-fallthrough': 2, // 禁止不必要的函数绑定
    'no-floating-decimal': 2, // 禁止省略浮点数中的0 .5 3.
    'no-func-assign': 2, // 禁止重复的函数声明
    'no-implied-eval': 2, // 禁止使用隐式eval
    'no-inner-declarations': [2, 'functions'],
    'no-invalid-regexp': 2, // 禁止无效的正则表达式
    'no-irregular-whitespace': 2,
    'no-iterator': 2, // 禁止使用__iterator__ 属性
    'no-label-var': 2, // label名不能与var声明的变量名相同
    'no-labels': [
      2,
      {
        allowLoop: false,
        allowSwitch: false
      }
    ], // 禁止标签声明
    'no-lone-blocks': 2, // 禁止不必要的嵌套块
    'no-mixed-spaces-and-tabs': 2, // 禁止混用tab和空格
    'no-multi-spaces': 2, // 不能用多余的空格
    'no-multi-str': 2, // 字符串不能用\换行
    'no-multiple-empty-lines': [
      2,
      {
        max: 1
      }
    ], // 空行最多不能超过2行
    'no-native-reassign': 2, // 不能重写native对象
    'no-negated-in-lhs': 2, // in 操作符的左边不能有!
    'no-new-object': 2, // 禁止使用new Object()
    'no-new-require': 2, // 禁止使用new require
    'no-new-symbol': 2,
    'no-new-wrappers': 2, // 禁止使用new创建包装实例，new String new Boolean new Number
    'no-obj-calls': 2, // 不能调用内置的全局对象，比如Math() JSON()
    'no-octal': 2, // 禁止使用八进制数字
    'no-octal-escape': 2, // 禁止使用八进制转义序列
    'no-path-concat': 2, // node中不能使用__dirname或__filename做路径拼接
    'no-proto': 2, // 禁止使用__proto__属性
    'no-redeclare': 2, // 禁止重复声明变量
    'no-regex-spaces': 2, // 禁止在正则表达式字面量中使用多个空格 /foo bar/
    'no-return-assign': [2, 'except-parens'], // return 语句中不能有赋值表达式
    'no-self-assign': 2,
    'no-self-compare': 2, // 不能比较自身
    'no-sequences': 2, // 禁止使用逗号运算符
    'no-shadow-restricted-names': 2, // 严格模式中规定的限制标识符不能作为声明时的变量名使用
    'no-spaced-func': 2, // 函数调用时 函数名与()之间不能有空格
    'no-sparse-arrays': 2, // 禁止稀疏数组， [1,,2]
    'no-this-before-super': 2, // 在调用super()之前不能使用this或super
    'no-throw-literal': 2, // 禁止抛出字面量错误 throw "error";
    'no-trailing-spaces': 2, // 一行结束后面不要有空格
    'no-undef': 2, // 有未定义的变量
    'no-undef-init': 2, // 变量初始化时不能直接给它赋值为undefined
    'no-unexpected-multiline': 2, // 避免多行表达式
    'no-unmodified-loop-condition': 2,
    'no-unneeded-ternary': [
      2,
      {
        defaultAssignment: false
      }
    ], // 禁止不必要的嵌套 var isYes = answer === 1 ? true : false;
    'no-unreachable': 2, // 不能有无法执行的代码
    'no-unsafe-finally': 2,
    'no-unused-vars': [
      2,
      {
        vars: 'all',
        args: 'none'
      }
    ], // 不能有声明后未被使用的变量或参数
    'no-useless-call': 2, // 禁止不必要的call和apply
    'no-useless-computed-key': 2,
    'no-useless-constructor': 2,
    'no-useless-escape': 0,
    'no-whitespace-before-property': 2,
    'no-with': 2, // 禁用with
    'one-var': [
      2,
      {
        initialized: 'never'
      }
    ], // 连续声明
    'operator-linebreak': [
      2,
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before'
        }
      }
    ], // 换行时运算符在行尾还是行首
    'padded-blocks': [2, 'never'], // 块语句内行首行尾是否要空行
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ], // 强制使用单引号，引号类型 `` "" ''
    semi: [2, 'never'], // 语句可以不需要分号结尾|语句强制分号结尾
    'semi-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ], // 分号前后空格
    'space-before-blocks': [2, 'always'], // 不以新行开始的块{前面要不要有空格
    // 'space-before-function-paren': [2, 'never'], // 函数定义时括号前面要不要有空格
    'space-in-parens': [2, 'never'], // 小括号里面要不要有空格
    'space-infix-ops': 2, // 中缀操作符周围要不要有空格
    'space-unary-ops': [
      2,
      {
        words: true,
        nonwords: false
      }
    ], // 一元运算符的前/后要不要加空格
    'spaced-comment': [
      2,
      'always',
      {
        markers: ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
      }
    ], // 注释风格要不要有空格
    'template-curly-spacing': [2, 'never'],

    'use-isnan': 2, // 禁止比较时使用NaN，只能用isNaN()
    'valid-typeof': 2, // 必须使用合法的typeof的值
    'wrap-iife': [2, 'any'], // 立即执行函数表达式的小括号风格
    'yield-star-spacing': [2, 'both'],
    yoda: [2, 'never'], // 禁止尤达条件
    'prefer-const': 0, // 首选const
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, // 禁止使用debugger
    'object-curly-spacing': [
      // 2,
      0, // zlh 修改-原2与prettier格式配置冲突
      'always',
      {
        objectsInObjects: false
      }
    ], // 大括号内是否允许不必要的空格
    'array-bracket-spacing': [2, 'never'] // 是否允许非空数组里面有多余的空格
  }
}
