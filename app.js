// 导入所需模块
require('dotenv').config(); // 加载环境变量
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const logger = require('./config/logger');
const todoRoutes = require('./routes/todo');

// 创建 Express 应用
const app = express();

// 设置端口号
const PORT = process.env.PORT || 3000;

// 中间件配置
app.use(cors()); // 启用跨域请求
app.use(express.json()); // 解析 JSON 请求体
app.use(express.urlencoded({ extended: true })); // 解析 URL 编码的请求体

// 记录所有请求的日志中间件
app.use((req, res, next) => {
  logger.info(`[${req.method}] ${req.url}`);
  next();
});

// 路由配置
app.use('/api', todoRoutes); // 挂载 Todo API 路由

// 根路由
app.get('/', (req, res) => {
  res.json({
    message: 'Todo List API 服务运行中',
    version: '1.0.0',
    endpoints: {
      getList: '/api/get_list',
      addTodo: '/api/add',
      deleteTodo: '/api/del/:id'
    }
  });
});

// 404 错误处理
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: '请求的资源不存在'
  });
});

// 全局错误处理中间件
app.use((err, req, res, next) => {
  logger.error('服务器错误:', err.stack);
  res.status(500).json({
    success: false,
    message: '服务器内部错误',
    error: process.env.NODE_ENV === 'development' ? err.message : '请联系管理员'
  });
});

// 启动服务器
const startServer = async () => {
  try {
    // 连接数据库
    await connectDB();
    
    // 启动 Express 服务器
    app.listen(PORT, () => {
      logger.info(`服务器已启动，监听端口 ${PORT}`);
      logger.info(`访问 http://localhost:${PORT} 查看 API 状态`);
    });
  } catch (error) {
    logger.error('启动服务器失败:', error.message);
    process.exit(1);
  }
};

// 启动服务器
startServer();

// 处理进程终止信号
process.on('SIGINT', async () => {
  logger.info('服务器正在关闭...');
  process.exit(0);
});