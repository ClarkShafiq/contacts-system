const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 模拟联系人数据
let contacts = [
  { id: 1, name: '张三', phone: '13800138000', email: 'zhangsan@example.com' },
  { id: 2, name: '李四', phone: '13900139000', email: 'lisi@example.com' }
];

// 健康检查
app.get('/', (req, res) => {
<<<<<<< HEAD
  res.json({ 
    success: true, 
    message: '通讯录后端服务运行正常',
    timestamp: new Date().toISOString()
  });
});

// 获取所有联系人
app.get('/api/contacts', (req, res) => {
  res.json({
    success: true,
    data: contacts,
    count: contacts.length
  });
});

// 根据ID获取联系人
app.get('/api/contacts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const contact = contacts.find(c => c.id === id);
  
  if (!contact) {
    return res.status(404).json({
      success: false,
      message: '联系人不存在'
    });
  }
  
  res.json({
    success: true,
    data: contact
  });
});

// 添加联系人
app.post('/api/contacts', (req, res) => {
  const { name, phone, email } = req.body;
  
  if (!name || !phone) {
    return res.status(400).json({
      success: false,
      message: '姓名和电话为必填项'
    });
  }
  
  const newContact = {
    id: contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 1,
    name,
    phone,
    email: email || ''
  };
  
  contacts.push(newContact);
  
  res.status(201).json({
    success: true,
    message: '联系人添加成功',
    data: newContact
  });
});

// 更新联系人
app.put('/api/contacts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, phone, email } = req.body;
  const contactIndex = contacts.findIndex(c => c.id === id);
  
  if (contactIndex === -1) {
    return res.status(404).json({
      success: false,
      message: '联系人不存在'
    });
  }
  
  contacts[contactIndex] = {
    ...contacts[contactIndex],
    name: name || contacts[contactIndex].name,
    phone: phone || contacts[contactIndex].phone,
    email: email || contacts[contactIndex].email
  };
  
  res.json({
    success: true,
    message: '联系人更新成功',
    data: contacts[contactIndex]
  });
});

// 删除联系人
app.delete('/api/contacts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const contactIndex = contacts.findIndex(c => c.id === id);
  
  if (contactIndex === -1) {
    return res.status(404).json({
      success: false,
      message: '联系人不存在'
    });
  }
  
  contacts.splice(contactIndex, 1);
  
  res.json({
    success: true,
    message: '联系人删除成功'
  });
});

// 启动服务器
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 服务器运行在端口: ${PORT}`);
  console.log(`📍 环境: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
=======
    res.json({ 
        success: true, 
        message: '通讯录后端服务运行正常',
        port: PORT,
        environment: process.env.NODE_ENV || 'development'
  })
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
>>>>>>> 1946fcc871e94b985c52d29f20ceb5934053ff53
