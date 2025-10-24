const { writeData, readData } = require('./s3-utils')

// constants
const FILE_NAME = 'dynamic-hello-world.html'
const INITIAL_CONTENT = `Hello World! 
<span class="blink-text">As retro as it gets!</span>
but smiley is my all time favorite!<span class="large-smiley"> :-) </span>
`
const STYLE = `
    @keyframes blink {
      0% { opacity: 1; }
      50% { opacity: 0; }
      100% { opacity: 1; }
    }
    .blink-text {
      animation: blink 1s linear infinite;
      border: 12px solid blue;
      margin: 20px;
      padding: 30px;
      width: 300px;
    }
    .large-smiley {
      font-size: 92px;
      margin: 0px;
      color: orange;
      font-weight: bold;
    }
`

/**
 * Save string to S3
 * 
 * @param {string} bucketName 
 * @param {string} fileName 
 * @param {string} content 
 * @returns {body: string, headers: Record<string, string>, statusCode: number}
 */
const saveString = async (bucketName, content) => {
  await writeData(bucketName, FILE_NAME, content)
  return {
    body: '<h2>Data stored successfully. <a href="/prod/">Go back</a></h2>',
    headers: { 'Content-Type': 'text/html' },
    statusCode: 200
  }
}

/**
 * Get HTML body with dynamic string from S3
 *
 * @param {string} bucketName
 * @param {string} fileName
 * @param {string} initialContent
 * @returns {body: string, headers: Record<string, string>, statusCode: number}
 */
const getHtmlBody = async (bucketName) => {
  const dynamicString = await readData(bucketName, FILE_NAME) ?? INITIAL_CONTENT
  const body = `<!DOCTYPE html>
<html>
<head>
    <title>Challenge by Nico R.</title>
    <style>${STYLE}</style>
</head>
<body>
  <h1>The saved string is ${dynamicString}</h1>
</body>
</html>`
  return {
    body,
    headers: { 'Content-Type': 'text/html' },
    statusCode: 200
  }
}

exports.saveString = saveString
exports.getHtmlBody = getHtmlBody
