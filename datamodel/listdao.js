const BaseDAO = require('./basedao')

module.exports = class ListDAO extends BaseDAO
{
    constructor(db)
    {
        super(db, "list")
    }

    insert(list)
    {
        return new Promise((resolve, reject) => {
            this.db.query("INSERT INTO list(shop, date, archived) VALUES($1, $2, $3) RETURNING ID", [list.shop, list.date, list.archived])
                .then(res => resolve(res.rows[0].id))
                .catch(err => reject(err))
        })
    }

    getAll()
    {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT * FROM list")
                .then(res => resolve(res.rows))
                .catch(err => reject(err))
        })
    }
}