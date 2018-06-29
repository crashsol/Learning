# 在vs code 中使用 Eslint 格式化文件
![效果图](https://github.com/crashsol/Learning/blob/master/images/1.png)


## 步骤
- 安装ESLint 插件
- 安装并配置完成 ESLint 后，我们继续回到 VSCode 进行扩展设置，依次点击 文件 > 首选项 > 设置 打开 VSCode 配置文件,添加如下配置
```

 "eslint.autoFixOnSave": true,
    "eslint.validate": [
        "javascript",
        "javascriptreact",      
        "html", 
        {
            "language": "vue",
            "autoFix": true
        } ,
        {
            "language": "html",
            "autoFix": true
        }

    ],    
    "vetur.format.defaultFormatter.html": "js-beautify-html"

```
-  安装vetur插件，个人配置中添加 "vetur.format.defaultFormatter.html": "js-beautify-html" ，使用 alt+shift+f 格式化 **.vue** 中的 html


