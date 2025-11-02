# Todo List API 后端服务

这是一个基于 Node.js 和 Express 框架开发的 Todo List 后端 API 服务，提供了查询、添加和删除待办事项的功能。

## 技术栈

- **Node.js** - JavaScript 运行时环境
- **Express** - Web 应用框架
- **MongoDB** - 数据库
- **Mongoose** - MongoDB ODM 工具
- **Winston** - 日志记录工具
- **Express-validator** - 请求验证工具
- **Cors** - 跨域资源共享
- **Dotenv** - 环境变量管理

## API 接口文档

### 1. 查询所有待办事项

- **接口名**: GET /api/get_list
- **功能**: 从数据库的'list'集合中查询并返回所有待办事项
- **参数**: 无
- **返回**: 包含所有待办事项的数组

**示例响应**: 
```json
{
  "success": true,
  "data": [
    {
      "_id": "60d5ec49d1c2c34e3c1a7b5c",
      "value": "学习 Node.js",
      "createdAt": "2023-07-10T12:30:00.000Z"
    },
    // 更多待办事项...
  ]
}
```

### 2. 添加待办事项

- **接口名**: POST /api/add
- **功能**: 向'list'集合中添加新的待办事项
- **参数**: 
  ```json
  {
    "value": "待办事项的具体内容"
  }
  ```
- **返回**: 新添加的待办事项对象，包含自动生成的唯一 id

**示例响应**: 
```json
{
  "success": true,
  "data": {
    "_id": "60d5ec49d1c2c34e3c1a7b5d",
    "value": "学习 MongoDB",
    "createdAt": "2023-07-10T12:35:00.000Z"
  }
}
```

### 3. 删除待办事项

- **接口名**: POST /api/del/:id
- **功能**: 根据 id 删除指定的待办事项
- **参数**: id (URL 参数)
- **返回**: 删除操作的结果状态

**示例响应**: 
```json
{
  "success": true,
  "message": "待办事项删除成功",
  "data": {
    "id": "60d5ec49d1c2c34e3c1a7b5d"
  }
}
```

## 项目结构

```
├── app.js                # 项目主入口文件
├── .env                  # 环境变量配置文件
├── .gitignore            # Git 忽略文件配置
├── models/               # 数据模型目录
│   └── Todo.js           # 待办事项模型
├── routes/               # 路由控制器目录
│   └── todo.js           # Todo API 路由
├── config/               # 配置文件目录
│   ├── db.js             # 数据库连接配置
│   └── logger.js         # 日志配置
├── package.json          # 项目配置和依赖
└── README_TODO.md        # 项目说明文档
```

## 环境变量配置

在项目根目录创建 `.env` 文件，并配置以下环境变量：

```env
# 数据库连接配置
MONGO_URI=mongodb://root:jnrncl5q@test-db-mongodb.ns-bar97a0f.svc:27017/todoList?authSource=admin

# 服务器配置
PORT=3000

# 环境配置
NODE_ENV=development
```

## 安装和启动

1. **安装依赖**
   ```bash
   npm install
   ```

2. **启动服务**
   ```bash
   npm start
   ```
   
   开发环境下可以使用：
   ```bash
   npm run dev
   ```

3. **访问 API**
   服务启动后，可以通过 http://localhost:3000 访问

## 错误处理

所有 API 都实现了完善的错误处理机制，包括：

- 请求参数验证
- 数据库操作错误处理
- 服务器内部错误处理
- 404 资源不存在处理

## 日志记录

项目使用 Winston 实现了全面的日志记录功能，包括：

- 请求和响应日志
- 错误日志
- 数据库连接日志
- 服务器启动日志

日志文件保存在 `logs/` 目录下。

## 开发说明

- 使用 async/await 语法处理异步操作
- 遵循 RESTful API 设计原则
- 实现了输入验证和错误处理
- 添加了基本的日志记录功能