// 导入 winston 日志模块
const winston = require('winston');

// 创建日志记录器
const logger = winston.createLogger({
  // 设置日志级别
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  // 日志格式
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf(info => {
      return `[${info.timestamp}] [${info.level.toUpperCase()}] ${info.message}`;
    })
  ),
  // 日志输出目标
  transports: [
    // 控制台输出
    new winston.transports.Console({
      format: winston.format.colorize({
        all: true
      })
    }),
    // 文件输出 - 所有日志
    new winston.transports.File({
      filename: 'logs/app.log',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    // 文件输出 - 错误日志
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5242880,
      maxFiles: 5
    })
  ]
});

// 创建 logs 目录（如果不存在）
const fs = require('fs');
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// 导出日志记录器
module.exports = logger;