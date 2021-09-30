const fetch = require('node-fetch')
const graphql = require('graphql-request')

async function login(req,res) {
    const params = req.body
    console.log('body',params)
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
        res.cookie(response.headers.get('set-cookie'))
        return res.status(200).send('ok')
    }catch{
        return res.status(500).send('error')
    }

}

module.exports = {
    login,
}