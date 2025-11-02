// 导入所需模块
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Todo = require('../models/Todo');
const logger = require('../config/logger');

/**
 * GET /api/get_list
 * 功能：查询所有待办事项
 * 参数：无
 * 返回：包含所有待办事项的数组
 */
router.get('/get_list', async (req, res) => {
  try {
    // 记录请求日志
    logger.info('收到获取所有待办事项的请求');
    
    // 从数据库查询所有待办事项，按创建时间倒序排列
    const todos = await Todo.find().sort({ createdAt: -1 });
    
    // 记录响应日志
    logger.info(`成功获取 ${todos.length} 条待办事项`);
    
    // 返回查询结果
    res.status(200).json({
      success: true,
      data: todos
    });
  } catch (error) {
    // 记录错误日志
    logger.error('查询待办事项时出错:', error.message);
    
    // 返回错误响应
    res.status(500).json({
      success: false,
      message: '服务器内部错误',
      error: error.message
    });
  }
});

/**
 * POST /api/add
 * 功能：添加新的待办事项
 * 参数：{
 *   "value": string // 待办事项的具体内容
 * }
 * 返回：新添加的待办事项对象，包含自动生成的唯一 id
 */
router.post('/add', 
  // 输入验证
  [
    body('value')
      .notEmpty().withMessage('待办事项内容不能为空')
      .isString().withMessage('待办事项内容必须是字符串')
      .trim()
      .isLength({ min: 1, max: 255 }).withMessage('待办事项内容长度必须在 1-255 个字符之间')
  ],
  async (req, res) => {
    try {
      // 检查输入验证结果
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // 记录验证错误日志
        logger.warn('添加待办事项时输入验证失败:', errors.array());
        
        // 返回验证错误响应
        return res.status(400).json({
          success: false,
          message: '输入验证失败',
          errors: errors.array()
        });
      }
      
      // 记录请求日志
      logger.info('收到添加待办事项的请求:', req.body);
      
      // 创建新的待办事项
      const newTodo = new Todo({
        value: req.body.value
      });
      
      // 保存到数据库
      const savedTodo = await newTodo.save();
      
      // 记录成功日志
      logger.info('成功添加待办事项:', savedTodo._id);
      
      // 返回成功响应
      res.status(201).json({
        success: true,
        data: savedTodo
      });
    } catch (error) {
      // 记录错误日志
      logger.error('添加待办事项时出错:', error.message);
      
      // 返回错误响应
      res.status(500).json({
        success: false,
        message: '服务器内部错误',
        error: error.message
      });
    }
  }
);

/**
 * POST /api/del/:id
 * 功能：根据 id 删除指定的待办事项
 * 参数：id (URL 参数)
 * 返回：删除操作的结果状态
 */
router.post('/del/:id', async (req, res) => {
  try {
    // 获取待办事项 ID
    const todoId = req.params.id;
    
    // 记录请求日志
    logger.info(`收到删除待办事项的请求，ID: ${todoId}`);
    
    // 验证 ID 格式是否正确
    if (!todoId || typeof todoId !== 'string') {
      logger.warn('无效的待办事项 ID');
      return res.status(400).json({
        success: false,
        message: '无效的待办事项 ID'
      });
    }
    
    // 根据 ID 查找并删除待办事项
    const deletedTodo = await Todo.findByIdAndDelete(todoId);
    
    // 检查是否找到并删除了待办事项
    if (!deletedTodo) {
      logger.warn(`未找到 ID 为 ${todoId} 的待办事项`);
      return res.status(404).json({
        success: false,
        message: '未找到该待办事项'
      });
    }
    
    // 记录成功日志
    logger.info(`成功删除待办事项，ID: ${todoId}`);
    
    // 返回成功响应
    res.status(200).json({
      success: true,
      message: '待办事项删除成功',
      data: {
        id: todoId
      }
    });
  } catch (error) {
    // 记录错误日志
    logger.error('删除待办事项时出错:', error.message);
    
    // 返回错误响应
    res.status(500).json({
      success: false,
      message: '服务器内部错误',
      error: error.message
    });
  }
});

// 导出路由
module.exports = router;