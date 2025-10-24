"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloLambdaStack = void 0;
const cdk = __importStar(require("aws-cdk-lib"));
const apigw = __importStar(require("aws-cdk-lib/aws-apigateway"));
const lambda = __importStar(require("aws-cdk-lib/aws-lambda"));
const path = __importStar(require("node:path"));
// import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
const s3 = __importStar(require("aws-cdk-lib/aws-s3"));
class HelloLambdaStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // const myDataTable = new dynamodb.Table(this, 'MyApplicationTable', {
        //   partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
        //   billingMode: dynamodb.BillingMode.PAY_PER_REQUEST, // Great for serverless
        //   removalPolicy: cdk.RemovalPolicy.RETAIN, // Keep my data safe!
        // });
        const myDataBucket = new s3.Bucket(this, 'my-challenge-bucket-101', {
            // Removal policy is important for persistent data!
            // RETAIN means the bucket won't be deleted if you destroy the stack.
            removalPolicy: cdk.RemovalPolicy.RETAIN,
            versioned: true,
        });
        const fn = new lambda.Function(this, 'MyFunction', {
            runtime: lambda.Runtime.NODEJS_LATEST,
            handler: 'index.handler',
            code: lambda.Code.fromAsset(path.join(__dirname, 'lambda-handler')),
            environment: {
                BUCKET_NAME: myDataBucket.bucketName,
                // TABLE_NAME: myDataTable.tableName,
            },
        });
        myDataBucket.grantReadWrite(fn);
        // myDataTable.grantReadWriteData(fn);
        const endpoint = new apigw.LambdaRestApi(this, `ApiGwEndpoint`, {
            handler: fn,
            restApiName: `HelloApi`,
        });
    }
}
exports.HelloLambdaStack = HelloLambdaStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsbG8tbGFtYmRhLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaGVsbG8tbGFtYmRhLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQW1DO0FBRW5DLGtFQUFvRDtBQUNwRCwrREFBaUQ7QUFDakQsZ0RBQWtDO0FBQ2xDLHdEQUF3RDtBQUN4RCx1REFBeUM7QUFFekMsTUFBYSxnQkFBaUIsU0FBUSxHQUFHLENBQUMsS0FBSztJQUM3QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQzlELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBRXZCLHVFQUF1RTtRQUN2RSx1RUFBdUU7UUFDdkUsK0VBQStFO1FBQy9FLG1FQUFtRTtRQUNuRSxNQUFNO1FBRU4sTUFBTSxZQUFZLEdBQUcsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSx5QkFBeUIsRUFBRTtZQUNsRSxtREFBbUQ7WUFDbkQscUVBQXFFO1lBQ3JFLGFBQWEsRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLE1BQU07WUFDdkMsU0FBUyxFQUFFLElBQUk7U0FDaEIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxFQUFFLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7WUFDakQsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYTtZQUNyQyxPQUFPLEVBQUUsZUFBZTtZQUN4QixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztZQUNuRSxXQUFXLEVBQUU7Z0JBQ1gsV0FBVyxFQUFFLFlBQVksQ0FBQyxVQUFVO2dCQUNwQyxxQ0FBcUM7YUFDdEM7U0FDRixDQUFDLENBQUM7UUFFSCxZQUFZLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLHNDQUFzQztRQUV0QyxNQUFNLFFBQVEsR0FBRyxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRTtZQUM5RCxPQUFPLEVBQUUsRUFBRTtZQUNYLFdBQVcsRUFBRSxVQUFVO1NBQ3hCLENBQUMsQ0FBQztJQUVMLENBQUM7Q0FDRjtBQXBDRCw0Q0FvQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgKiBhcyBhcGlndyBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWFwaWdhdGV3YXlcIjtcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdub2RlOnBhdGgnO1xuLy8gaW1wb3J0ICogYXMgZHluYW1vZGIgZnJvbSAnYXdzLWNkay1saWIvYXdzLWR5bmFtb2RiJztcbmltcG9ydCAqIGFzIHMzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1zMyc7XG5cbmV4cG9ydCBjbGFzcyBIZWxsb0xhbWJkYVN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcyl7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcylcblxuICAgIC8vIGNvbnN0IG15RGF0YVRhYmxlID0gbmV3IGR5bmFtb2RiLlRhYmxlKHRoaXMsICdNeUFwcGxpY2F0aW9uVGFibGUnLCB7XG4gICAgLy8gICBwYXJ0aXRpb25LZXk6IHsgbmFtZTogJ2lkJywgdHlwZTogZHluYW1vZGIuQXR0cmlidXRlVHlwZS5TVFJJTkcgfSxcbiAgICAvLyAgIGJpbGxpbmdNb2RlOiBkeW5hbW9kYi5CaWxsaW5nTW9kZS5QQVlfUEVSX1JFUVVFU1QsIC8vIEdyZWF0IGZvciBzZXJ2ZXJsZXNzXG4gICAgLy8gICByZW1vdmFsUG9saWN5OiBjZGsuUmVtb3ZhbFBvbGljeS5SRVRBSU4sIC8vIEtlZXAgbXkgZGF0YSBzYWZlIVxuICAgIC8vIH0pO1xuXG4gICAgY29uc3QgbXlEYXRhQnVja2V0ID0gbmV3IHMzLkJ1Y2tldCh0aGlzLCAnbXktY2hhbGxlbmdlLWJ1Y2tldC0xMDEnLCB7XG4gICAgICAvLyBSZW1vdmFsIHBvbGljeSBpcyBpbXBvcnRhbnQgZm9yIHBlcnNpc3RlbnQgZGF0YSFcbiAgICAgIC8vIFJFVEFJTiBtZWFucyB0aGUgYnVja2V0IHdvbid0IGJlIGRlbGV0ZWQgaWYgeW91IGRlc3Ryb3kgdGhlIHN0YWNrLlxuICAgICAgcmVtb3ZhbFBvbGljeTogY2RrLlJlbW92YWxQb2xpY3kuUkVUQUlOLCBcbiAgICAgIHZlcnNpb25lZDogdHJ1ZSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGZuID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCAnTXlGdW5jdGlvbicsIHtcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU19MQVRFU1QsXG4gICAgICBoYW5kbGVyOiAnaW5kZXguaGFuZGxlcicsXG4gICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQocGF0aC5qb2luKF9fZGlybmFtZSwgJ2xhbWJkYS1oYW5kbGVyJykpLFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgQlVDS0VUX05BTUU6IG15RGF0YUJ1Y2tldC5idWNrZXROYW1lLFxuICAgICAgICAvLyBUQUJMRV9OQU1FOiBteURhdGFUYWJsZS50YWJsZU5hbWUsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgbXlEYXRhQnVja2V0LmdyYW50UmVhZFdyaXRlKGZuKTtcbiAgICAvLyBteURhdGFUYWJsZS5ncmFudFJlYWRXcml0ZURhdGEoZm4pO1xuXG4gICAgY29uc3QgZW5kcG9pbnQgPSBuZXcgYXBpZ3cuTGFtYmRhUmVzdEFwaSh0aGlzLCBgQXBpR3dFbmRwb2ludGAsIHtcbiAgICAgIGhhbmRsZXI6IGZuLFxuICAgICAgcmVzdEFwaU5hbWU6IGBIZWxsb0FwaWAsXG4gICAgfSk7XG5cbiAgfVxufSJdfQ==