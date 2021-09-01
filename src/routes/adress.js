import fetch from 'node-fetch'

const getUfs = async (req,res) =>{
    try{
        console.log('aqui')
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        console.log('response',response)
        const data = await response.json()
        return res.status(200).send(data)
    }catch (e){
        return res.status(500).send({message : "Error Caling API",error : e })
    }
}

export default getUfs