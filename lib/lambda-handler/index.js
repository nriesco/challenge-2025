const { saveString, getHtmlBody } = require('./handler-utils')

// handler
exports.handler = async (event) => {
  // decide the action to be executed
  const { httpMethod, queryStringParameters, body } = event

  if (httpMethod === 'POST' && body) {
    // store data
    return await saveString(process.env.BUCKET_NAME, body)
  } else if (httpMethod === 'GET' && queryStringParameters !== null) {
    // store data
    return await saveString(process.env.BUCKET_NAME, queryStringParameters.string)
  } else if (httpMethod === 'GET') {
    // retrieve data
    return getHtmlBody(process.env.BUCKET_NAME)
  }
}
