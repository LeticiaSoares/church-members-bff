const fetch = require('node-fetch')
const graphql = require('graphql-request')

async function getMembers(req,res) {
    try{
        const params = req.query
        const token = req.headers.cookie ? req.headers.cookie.split(';') : ''
        const accessToken = token[0].split('=')[1]
        let queryName = '';
        queryName = `,name:"${params.name}"`
        const query = `
            {
                member(active:true${queryName}){
                    id
                    person{
                        firstName
                        lastName
                        birthDate
                    }
                }
            }
            `;
        const response  =  await fetch('https://tgtvnnh7hg.execute-api.us-east-1.amazonaws.com/prod/members/search', {
            method: 'POST',
            body: query,
            headers: {
                'X-Auth-Token': `${accessToken}`,
            },
        })
        const data = await response.json()
        if(response.status == 200){
            return res.status(200).send(data);
        }else{
            return res.status(404).send();
        }

    }catch (error){
        console.error('Search Error')
        return res.status(500).send(error)
    }
}

module.exports = {
    getMembers,
}