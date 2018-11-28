### 镜像拉取策略设置  imagePullPolicy
  - Always       #总是从镜像仓库拉取
  - IfNotPresent #如果本地存在镜像就优先使用本地镜像。
  - Never        #直接不再去拉取镜像了，使用本地的；如果本地不存在就报异常了

