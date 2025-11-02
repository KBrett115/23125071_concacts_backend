// 导入 mongoose 模块
const mongoose = require('mongoose');

// 定义 Todo Schema
const todoSchema = new mongoose.Schema({
  // 待办事项的内容
  value: {
    type: String,
    required: true, // 值为必填
    trim: true, // 自动去除首尾空格
    minlength: 1, // 最小长度为1
    maxlength: 255 // 最大长度为255
  },
  // 创建时间，默认为当前时间
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 创建 Todo 模型
const Todo = mongoose.model('Todo', todoSchema, 'list'); // 使用 'list' 集合

// 导出模型
module.exports = Todo;