const fetch = require('node-fetch')
const graphql = require('graphql-request')

async function getMembers(req,res) {
    const params = req.query
    const token = req.headers.cookie.split('=')
    const accessToken = token[1]
    let queryName = '';
    queryName = `,name:"${params.name}"`
    const query = `
		{
			member(active:true${queryName}){
				id
				person{
					firstName
					lastName
				}
			}
		}
        `;

    fetch('https://tgtvnnh7hg.execute-api.us-east-1.amazonaws.com/prod/members/search', {
        method: 'POST',
        body: query,
        headers: {
            'X-Auth-Token': `${accessToken}`,
        },
    })
    .then(res => res.text())
    .then(body => {
        return res.status(200).send(body);
    })
    .catch(error => {
        console.error(error)
        return res.status(404).send(error)
    });
}

module.exports = {
    getMembers,
}