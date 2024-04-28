# 使用官方 Node.js 基础镜像
FROM node:18.17.0

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY ./app/package*.json ./

# 安装项目依赖项
RUN npm install

# 复制项目文件到工作目录
COPY ./app .

# 构建前端和后端项目
RUN npm run build

# 暴露端口
EXPOSE 3000 3030

# 运行命令
CMD ["npm", "start"]
