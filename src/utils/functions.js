import { parseTime } from '@/utils'

// 通用方法
const functions = {
  formatJson(filterVal, jsonData) {
    return jsonData.map(v =>
      filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      })
    )
  },
  // 拆分数组（数组，长度）
  splitArray(arr, len) {
    let result = []
    for (var i = 0; i < arr.length; i += len) {
      result.push(arr.slice(i, i + len))
    }
    return result
  },

  createBlankLinkElement(path, api) {
    const link = document.createElement('a')
    link.target = '_blank'
    link.href = api + path
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  },

  vagueFilter(str, cols) {
    // 全字模糊查询筛选器，查询本行数据每个字段是否有匹配的结果，有即return出本行（只针对一个查询条件）
    return result => {
      for (let i = 0; i < cols.length; i++) {
        if (!result[cols[i].prop]) {
          return false // 该列数据为空，则过滤掉
        }
        // 匹配时为true，则return true，跳出循环，否则继续匹配下一列
        let matchStr =
          result[cols[i].prop]
            .trim() // 移除头尾空格
            .toLowerCase() // 转换成小写字母
            .indexOf(str.trim().toLowerCase()) !== -1
        if (matchStr === true) {
          return true
        }
        // return (
        //   result[cols[i].prop]
        //     .trim() // 移除头尾空格
        //     .toLowerCase() // 转换成小写字母
        //     .indexOf(str.trim().toLowerCase()) !== -1
        // )
      }
    }
  },

  vagueQuery(listQuery) {
    // 根据所查字段对数据进行筛选模糊查询,every用于检测是否所有符合条件
    return row => {
      return Object.keys(listQuery).every(key => {
        if (listQuery[key] === '') {
          return true
        }
        if (row[key] !== 0 && !row[key]) {
          return false // 该行字段值为空
        }
        return row[key].toLowerCase().indexOf(listQuery[key].trim().toLowerCase()) !== -1
      })
    }
  }
}
export default functions
