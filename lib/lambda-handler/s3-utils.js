const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3")

/**
 * Write data to S3
 *
 * @param {string} Bucket bucket name
 * @param {string} Key file name
 * @param {string} Body data
 */
async function writeData(Bucket, Key, Body) {
  const s3Client = new S3Client({})
  const command = new PutObjectCommand({ Bucket, Key, Body, ContentType: 'text/html' })

  try {
    await s3Client.send(command)
  } catch (err) {
    console.error('Error writing file', err)
  }
}

/**
 * Read data from S3
 *
 * @param {string} Bucket bucket name
 * @param {string} Key file name
 * @returns {string} data
 */
async function readData(Bucket, Key) {
  const s3Client = new S3Client({})
  const command = new GetObjectCommand({ Bucket, Key })

  try {
    const response = await s3Client.send(command)
    return await response.Body?.transformToString();
  } catch (err) {
    console.error('Error reading file', err)
  }
}

exports.writeData = writeData
exports.readData = readData
