const BaseDAO = require('./basedao')

module.exports = class ItemDAO extends BaseDAO
{
    constructor(db)
    {
        super(db, "item")
    }

    insert(item)
    {
        return new Promise((resolve, reject) => {
            this.db.query("INSERT INTO item(idList, label, quantity, checked) VALUES($1, $2, $3, $4) RETURNING ID", [item.idList, item.label, item.quantity, item.checked])
                .then(res => resolve(res.rows[0].id))
                .catch(err => reject(err))
        })
    }

    getAll()
    {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT * FROM item")
                .then(res => resolve(res.rows))
                .catch(err => reject(err))
        })
    }
}