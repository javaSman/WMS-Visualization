import { parseTime } from '@/utils'
import axios from '@/axios'
// export function handleDownload (header, filter, list, filename) {
export function handleDownload(api, data, flag) {
  let _this = data
  let list
  let listQuery = {
    Filter: '',
    Sorting: '',
    SkipCount: 999,
    MaxResultCount: 0
  }
  axios.gets(api, listQuery).then(response => {
    list = response.items
    if (list.length) {
      flag = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = _this.header
        const filterVal = _this.filter
        const data = formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: _this.filename
        })
        flag = false
      })
    } else {
      this.$message({
        message: '当前表格为空',
        type: 'warning'
      })
    }
  })
  return
}

function formatJson(filterVal, jsonData) {
  console.log(jsonData)
  return jsonData.map(v =>
    filterVal.map(j => {
      if (j === 'timestamp') {
        return parseTime(v[j])
      } else {
        return v[j]
      }
    })
  )
}

// function getList(api) {
//   let listQuery = {
//     Filter: '',
//     Sorting: '',
//     SkipCount: 0,
//     MaxResultCount: 9999
//   }
//   this.$axios.gets(api, listQuery).then(response => {
//     this.list = response.items
//   })
// }
