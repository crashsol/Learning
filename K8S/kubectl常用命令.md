# namespaces 服务隔离 
 > 查询 kubectl get namespaces
 > 创建 kubectl create namespace netcore
 > 删除 kubectl delete namespace netcore

# services
 - 查看netcore namespace下的服务
   > kubectl get svc -n netcore
 - 删除某个服务 kube-system命名空间下的 kubernetes-dashboard 服务
   > kubectl delete service  kubernetes-dashboard -n kube-system
# deploy
 - 创建deploy
   > kubectl create -f deploy.yaml


# ClusterIP 与 NodePort

```
# ------------------- Dashboard Service ------------------- #

kind: Service
apiVersion: v1
metadata:
  labels:
    k8s-app: kubernetes-dashboard
  name: kubernetes-dashboard
  namespace: kube-system  
spec:
  type: NodePort
  ports:
    - port: 443
      targetPort: 8443      
      nodePort: 30065
  selector:
    k8s-app: kubernetes-dashboard

```
> NodePort模式，主要在 DashBoard Service中，**spec:type: NodePort**
ports中对外暴露 **nodePort: 30065** ,对外暴露的端口要大于:30000
对比deploy下的两个文件
如果使用NodePort模式，可以直接通过对外暴露的端口访问DashBoard,例如：localhost:30065,如果不能访问，可能是因为DashBoard默认启用Https，没有正确加载证书。