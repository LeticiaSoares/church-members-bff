import awsServerlessExpress from  'aws-serverless-express'
import app from './src/index'

const server = awsServerlessExpress.createServer(app)
module.exports.universal = (event, context) => awsServerlessExpress.proxy(server, event, context);