function getAuthCookie (req){
    const token = req.headers.cookie ? req.headers.cookie.split(';') : ''
    return token[0].split('=')[1]
}

module.exports = {
    getAuthCookie,
}