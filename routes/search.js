const fetch = require('node-fetch')
const cookie = require('../utils/cookies')

async function getMembers(req,res) {
    try{
        const params = req.query
        const accessToken = cookie.getAuthCookie(req)
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

async function getMemberById(req,res){
    const param = req.params
    const accessToken = cookie.getAuthCookie(req)
    try{
        const response = await fetch(
            `https://tgtvnnh7hg.execute-api.us-east-1.amazonaws.com/prod/members/${param?.id}`,
        {
            headers: {
                'X-Auth-Token': `${accessToken}`,
            }
        }
        )
        console.log('response',response)
        const data = await response.json()
        console.log('data',data)
        if(response.status == 200){
            return res.status(200).send(data);
        }else{
            return res.status(404).send();
        }
        return res.status(200).send(response);
    }catch (error){
        console.error('getMemberById',error)
        return res.status(500).send(error)
    }
}

module.exports = {
    getMembers,
    getMemberById,
}