const fetch = require('node-fetch')
const graphql = require('graphql-request')

async function login(req,res) {
    const params = req.body
    const user = params.email
    const password = params.password
    const buff = Buffer.from(user + ":" + password, 'utf-8')
    const base64 = buff.toString('base64')
    try{
        const response = await fetch('https://tgtvnnh7hg.execute-api.us-east-1.amazonaws.com/prod/users/token', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${base64}`,
            },
        })
        const body = await response.json()
        res.cookie('token',body.token, { maxAge: 900000, sameSite : 'none', secure: true, httpOnly: true })
        return res.status(200).send({ token : body.token })
    }catch{
        console.error(error)
        return res.status(404).send(error)
    }

}

module.exports = {
    login,
}