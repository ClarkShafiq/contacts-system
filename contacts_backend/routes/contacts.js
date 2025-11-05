const express = require('express');
const router = express.Router();
const db = require('../database');

// 数据验证
const validateContact = (data) => {
    if (!data.name || data.name.trim().length === 0) {
        return '姓名不能为空';
    }
    if (!data.phone || !/^1[3-9]\d{9}$/.test(data.phone)) {
        return '请输入有效的手机号码';
    }
    return null;
};

// 获取所有联系人
router.get('/', (req, res) => {
    try {
        const contacts = db.getAllContacts();
        res.json({
            success: true,
            data: contacts,
            count: contacts.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: '获取联系人失败'
        });
    }
});

// 获取单个联系人
router.get('/:id', (req, res) => {
    try {
        const contact = db.getContactById(req.params.id);
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: '联系人不存在'
            });
        }
        res.json({ success: true, data: contact });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: '获取联系人失败'
        });
    }
});

// 添加联系人
router.post('/', (req, res) => {
    try {
        const error = validateContact(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error
            });
        }

        const id = db.addContact(
            req.body.name.trim(),
            req.body.phone.trim(),
            req.body.email ? req.body.email.trim() : null
        );

        const newContact = db.getContactById(id);
        res.json({
            success: true,
            data: newContact,
            message: '联系人添加成功'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: '添加联系人失败'
        });
    }
});

// 修改联系人
router.put('/:id', (req, res) => {
    try {
        const existingContact = db.getContactById(req.params.id);
        if (!existingContact) {
            return res.status(404).json({
                success: false,
                message: '联系人不存在'
            });
        }

        const error = validateContact(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error
            });
        }

        db.updateContact(
            req.params.id,
            req.body.name.trim(),
            req.body.phone.trim(),
            req.body.email ? req.body.email.trim() : null
        );

        const updatedContact = db.getContactById(req.params.id);
        res.json({
            success: true,
            data: updatedContact,
            message: '联系人更新成功'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: '更新联系人失败'
        });
    }
});

// 删除联系人
router.delete('/:id', (req, res) => {
    try {
        const existingContact = db.getContactById(req.params.id);
        if (!existingContact) {
            return res.status(404).json({
                success: false,
                message: '联系人不存在'
            });
        }

        db.deleteContact(req.params.id);
        res.json({
            success: true,
            message: '联系人删除成功'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: '删除联系人失败'
        });
    }
});

module.exports = router;