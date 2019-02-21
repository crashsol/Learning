#设置 npm,yarn 淘宝镜像源

- 设置 npm 镜像

  ```
   npm config set registry https://registry.npm.taobao.org

   // 配置后可通过下面方式来验证是否成功
   npm config get registry)
  ```

- 使用 cnpm
  ```
  npm install -g cnpm --registry=https://registry.npm.taobao.org
  ```
- 设置 yarn
  ```
  //查看当前yarn镜像源
  yarn config get registry
  //设置镜像源
  yarn config set registry=https://registry.npm.taobao.org
  ```
