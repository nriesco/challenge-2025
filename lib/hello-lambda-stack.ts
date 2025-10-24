import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as apigw from "aws-cdk-lib/aws-apigateway"
import * as lambda from "aws-cdk-lib/aws-lambda"
import * as path from 'node:path'
import * as s3 from 'aws-cdk-lib/aws-s3'

export class HelloLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps){
    super(scope, id, props)

    // set a bucket with retention policy
    const bucket = new s3.Bucket(this, 'my-challenge-bucket-101', {
      removalPolicy: cdk.RemovalPolicy.RETAIN
    })

    const handler = new lambda.Function(this, 'MyLambdaChallenge', {
      runtime: lambda.Runtime.NODEJS_LATEST,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, 'lambda-handler')),
      // set environment variable/s
      environment: {
        BUCKET_NAME: bucket.bucketName
      }
    })

    // this was needed
    bucket.grantReadWrite(handler)

    new apigw.LambdaRestApi(this, 'ApiGwEndpoint', {
      handler,
      restApiName: 'ChallengeApi'
    })

  }
}