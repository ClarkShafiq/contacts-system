// API 基础地址
const API_BASE_URL = 'https://contacts-system.onrender.com/api';

// DOM 元素
const contactForm = document.getElementById('contactForm');
const contactsTable = document.getElementById('contactsTable');
const contactsBody = document.getElementById('contactsBody');
const loading = document.getElementById('loading');
const emptyMessage = document.getElementById('emptyMessage');
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const closeModal = document.querySelector('.close');

// 页面加载时获取联系人列表
document.addEventListener('DOMContentLoaded', loadContacts);

// 添加联系人表单提交
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const contactData = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email') || null
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showMessage('联系人添加成功！', 'success');
            contactForm.reset();
            loadContacts(); // 重新加载列表
        } else {
            showMessage(result.message, 'error');
        }
    } catch (error) {
        showMessage('网络错误，请稍后重试', 'error');
        console.error('添加联系人错误:', error);
    }
});

// 加载联系人列表
async function loadContacts() {
    try {
        loading.style.display = 'block';
        contactsTable.style.display = 'none';
        emptyMessage.style.display = 'none';
        
        const response = await fetch(`${API_BASE_URL}/contacts`);
        const result = await response.json();
        
        if (result.success) {
            displayContacts(result.data);
        } else {
            showMessage('加载联系人失败', 'error');
        }
    } catch (error) {
        showMessage('网络错误，请稍后重试', 'error');
        console.error('加载联系人错误:', error);
    } finally {
        loading.style.display = 'none';
    }
}

// 显示联系人列表
function displayContacts(contacts) {
    contactsBody.innerHTML = '';
    
    if (contacts.length === 0) {
        emptyMessage.style.display = 'block';
        return;
    }
    
    contactsTable.style.display = 'table';
    
    contacts.forEach(contact => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${contact.id}</td>
            <td>${contact.name}</td>
            <td>${contact.phone}</td>
            <td>${contact.email || '-'}</td>
            <td>
                <button class="edit-btn" onclick="openEditModal(${contact.id})">编辑</button>
                <button class="delete-btn" onclick="deleteContact(${contact.id})">删除</button>
            </td>
        `;
        
        contactsBody.appendChild(row);
    });
}

// 打开编辑模态框
async function openEditModal(contactId) {
    try {
        const response = await fetch(`${API_BASE_URL}/contacts/${contactId}`);
        const result = await response.json();
        
        if (result.success) {
            const contact = result.data;
            document.getElementById('editId').value = contact.id;
            document.getElementById('editName').value = contact.name;
            document.getElementById('editPhone').value = contact.phone;
            document.getElementById('editEmail').value = contact.email || '';
            
            editModal.style.display = 'block';
        } else {
            showMessage('加载联系人信息失败', 'error');
        }
    } catch (error) {
        showMessage('网络错误，请稍后重试', 'error');
        console.error('打开编辑模态框错误:', error);
    }
}

// 编辑联系人表单提交
editForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const contactId = document.getElementById('editId').value;
    const contactData = {
        name: document.getElementById('editName').value,
        phone: document.getElementById('editPhone').value,
        email: document.getElementById('editEmail').value || null
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/contacts/${contactId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showMessage('联系人更新成功！', 'success');
            editModal.style.display = 'none';
            loadContacts(); // 重新加载列表
        } else {
            showMessage(result.message, 'error');
        }
    } catch (error) {
        showMessage('网络错误，请稍后重试', 'error');
        console.error('更新联系人错误:', error);
    }
});

// 删除联系人
async function deleteContact(contactId) {
    if (!confirm('确定要删除这个联系人吗？')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/contacts/${contactId}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
            showMessage('联系人删除成功！', 'success');
            loadContacts(); // 重新加载列表
        } else {
            showMessage(result.message, 'error');
        }
    } catch (error) {
        showMessage('网络错误，请稍后重试', 'error');
        console.error('删除联系人错误:', error);
    }
}

// 关闭模态框
closeModal.addEventListener('click', () => {
    editModal.style.display = 'none';
});

// 点击模态框外部关闭
window.addEventListener('click', (e) => {
    if (e.target === editModal) {
        editModal.style.display = 'none';
    }
});

// 显示消息
function showMessage(message, type) {
    // 移除旧消息
    const oldMessage = document.querySelector('.success-message, .error-message');
    if (oldMessage) {
        oldMessage.remove();
    }
    
    // 创建新消息
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.textContent = message;
    
    // 插入到页面顶部
    const container = document.querySelector('.container');
    container.insertBefore(messageDiv, container.firstChild);
    
    // 3秒后自动消失
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}
