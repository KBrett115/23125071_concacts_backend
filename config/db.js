// 导入 mongoose 和 logger 模块
const mongoose = require('mongoose');
const logger = require('./logger');

// 数据库连接配置
const connectDB = async () => {
  try {
    // 连接数据库
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    logger.info('MongoDB 数据库连接成功');
  } catch (error) {
    // 记录连接错误
    logger.error('MongoDB 数据库连接失败:', error.message);
    
    // 连接失败时退出进程
    process.exit(1);
  }
};

// 断开数据库连接
const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    logger.info('MongoDB 数据库连接已断开');
  } catch (error) {
    logger.error('断开 MongoDB 数据库连接时出错:', error.message);
  }
};

// 导出数据库连接函数
module.exports = {
  connectDB,
  disconnectDB
};