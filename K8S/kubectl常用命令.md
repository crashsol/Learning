# namespaces 服务隔离 
 > 查询 kubectl get namespaces
 > 创建 kubectl create namespace netcore
 > 删除 kubectl delete namespace netcore

# services
 - 查看netcore namespace下的服务
   > kubectl get svc -n netcore

# deploy
 - 创建deploy
   > kubectl create -f deploy.yaml