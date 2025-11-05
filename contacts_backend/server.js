const express = require('express');
const cors = require('cors');
const contactRoutes = require('./routes/contacts');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 路由
app.use('/api/contacts', contactRoutes);

// 健康检查
app.get('/', (req, res) => {
    res.json({ 
        success: true, 
        message: '通讯录后端服务运行正常',
        port: PORT,
        environment: process.env.NODE_ENV || 'development'
  }）
        endpoints: {
            '获取所有联系人': 'GET /api/contacts',
            '添加联系人': 'POST /api/contacts',
            '修改联系人': 'PUT /api/contacts/:id',
            '删除联系人': 'DELETE /api/contacts/:id'
        }
    });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 后端服务器运行在端口 ${PORT}`);
  console.log(`📍 环境: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 可访问地址: http://0.0.0.0:${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('收到关闭信号，正在优雅关闭服务器...');
  process.exit(0);
});
