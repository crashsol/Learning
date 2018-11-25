# NetCore创建Dockerfile,在项目中创建Dockerfile，并添加以下内容
```
# 使用Runtime 作为镜像的基础镜像
FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80
# 构建
FROM microsoft/dotnet:2.1-sdk as build
# 设置构建的工作目录
WORKDIR /src
# 将当前文件在的内容拷贝到容器中的/src目录中
COPY . . 
# 还原文件
RUN dotnet restore
# build
RUN dotnet build -c Release -o /app

FROM build as publish 
RUN dotnet publish -c Release -o /app
#最终构建，使用runtime镜像，工作目录为app、
FROM base as final
WORKDIR /app
#复制 publish中间镜像中的/app 目录文件到 当前的/app中
COPY --from=publish /app  .
ENTRYPOINT [ "dotnet","k8s-demo.dll" ]
```
 - 构建镜像
 > docker build -t crashsol/k8s-demo .
 - 本地运行docker，并通过url访问测试
 > docker run -d -p 8008:80 --name=k8s-demo  crashsol/k8s-demo
