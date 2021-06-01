const pg = require('pg')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const ItemService = require("./services/item")
const ListService = require("./services/list")
const UserAccountService = require("./services/useraccount")
const ShareService = require("./services/share")
const RoleService = require("./services/role")

const app = express()
app.use(bodyParser.urlencoded({ extended: false })) // URLEncoded form data
app.use(bodyParser.json()) // application/json
app.use(cors())
app.use(morgan('dev')); // toutes les requêtes HTTP dans le log du serveur

const connectionString = "postgres://user1:default@localhost/base1"
const db = new pg.Pool({ connectionString: connectionString })

const itemService = new ItemService(db)
const listService = new ListService(db)
const userAccountService = new UserAccountService(db)
const shareService = new ShareService(db)
const roleService = new RoleService(db)
const jwt = require('./jwt')(userAccountService)
const dirName = __dirname

require('./api/list')(app, listService, itemService, shareService, userAccountService, jwt)
require('./api/item')(app, itemService, listService, shareService, jwt)
require('./api/useraccount')(app, userAccountService, roleService, dirName, jwt)
require('./api/share')(app, shareService, jwt)
require('./api/role')(app, roleService, jwt)
require('./datamodel/seeder')(userAccountService, itemService, listService, shareService, roleService)
    .then(_ => app.listen(3333))


