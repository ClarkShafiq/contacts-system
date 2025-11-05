const Database = require('better-sqlite3');
const path = require('path');

class ContactsDB {
    constructor() {
        const dbPath = path.join(__dirname, 'contacts.db');
        this.db = new Database(dbPath);
        this.createTable();
        console.log('✅ 数据库初始化完成');
    }

    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS contacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                phone TEXT NOT NULL,
                email TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `;
        this.db.exec(sql);
    }

    // 获取所有联系人
    getAllContacts() {
        const stmt = this.db.prepare('SELECT * FROM contacts ORDER BY created_at DESC');
        return stmt.all();
    }

    // 根据ID获取联系人
    getContactById(id) {
        const stmt = this.db.prepare('SELECT * FROM contacts WHERE id = ?');
        return stmt.get(id);
    }

    // 添加联系人
    addContact(name, phone, email) {
        const stmt = this.db.prepare('INSERT INTO contacts (name, phone, email) VALUES (?, ?, ?)');
        const result = stmt.run(name, phone, email);
        return result.lastInsertRowid;
    }

    // 更新联系人
    updateContact(id, name, phone, email) {
        const stmt = this.db.prepare(`
            UPDATE contacts SET name = ?, phone = ?, email = ? WHERE id = ?
        `);
        const result = stmt.run(name, phone, email, id);
        return result.changes;
    }

    // 删除联系人
    deleteContact(id) {
        const stmt = this.db.prepare('DELETE FROM contacts WHERE id = ?');
        const result = stmt.run(id);
        return result.changes;
    }
}

module.exports = new ContactsDB();