## 导出表格
---
### 参数
```
     exportData: {
        header: ['用户名', '邮箱', '电话'],
        filter: ['userName', 'email', 'phoneNumber'],
        list: [],
        filename: '用户列表'
      }
 ```

1. api (string)获取当前列表所有数据行
2. data (object)下载配置参数
       包含：表头字段filter（string）、表头中文header(array)、行数据list(array)、下载文件名称filename(string)
    
3. flag (boolean)标志，当正在下载的时候按钮会显示loading图标

```
handleDownload('/api/identity/users', this.exportData, this.downloadLoading)
```