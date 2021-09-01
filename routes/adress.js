const fetch = require('node-fetch')

async function getUfs(req,res){
    try{
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        const data = await response.json()
        return res.status(200).send(data)
    }catch (e){
        return res.status(500).send({message : "Error Caling API",error : e })
    }
}

module.exports = {
    getUfs
}