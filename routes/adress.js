const fetch = require('node-fetch')

async function getUfs(req,res){
    try{
        const response = await fetch(`${process.env.IBGE_API}/localidades/estados`)
        const data = await response.json()
        return res.status(200).send(data)
    }catch (e){
        return res.status(500).send({message : "Error Caling API",error : e })
    }
}

async function getCities(req,res){
    try{
        const params = req.query
        const response = await fetch(`${process.env.IBGE_API}/localidades/estados/${params.uf}/municipios`)
        const data = await response.json()
        console.log('data',data)
        return res.status(200).send(data)
    }catch (e){
        return res.status(500).send({message : "Error Caling API",error : e })
    }
}

module.exports = {
    getUfs,
    getCities
}