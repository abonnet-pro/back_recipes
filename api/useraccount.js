module.exports = (app, svc, jwt) => {
    app.post('/useraccount/authenticate', (req, res) => {
        const { login, password } = req.body
        if ((login === undefined) || (password === undefined)) {
            res.status(400).end()
            return
        }
        svc.validatePassword(login, password)
            .then(authenticated => {
                if (!authenticated) {
                    res.status(401).end()
                    return
                }
                res.json({'token': jwt.generateJWT(login)})
            })
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })

    app.post('/useraccount/create', async (req, res) => {
        const useraccount = req.body
        console.log(useraccount)
        if(!svc.isValid(useraccount))
        {
            return res.status(400).end()
        }
        if(! await svc.isLoginValid(useraccount.login))
        {
            return res.status(406).end()
        }
        svc.insert(useraccount.displayname, useraccount.login, useraccount.password)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })

    app.get("/useraccount/:login", jwt.validateJWT, async (req, res) => {
        try
        {
            const userList = await svc.dao.getLikeLogin(req.params.login)
            if(userList === undefined)
            {
                res.status(404).end()
            }
            return res.json(userList)
        }
        catch (e)
        {
            console.log(e.toString())
            res.status(400).end()
        }
    })
}