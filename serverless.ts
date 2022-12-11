import type { AWS } from "@serverless/typescript";

import hello from "@functions/hello";
import getVideos from "@functions/getVideos";
import getVideoCaption from "@functions/getVideoCaption";
import getVideoInfo from "@functions/getVideoInfo";
import getFolders from "@functions/getFolders";
import getFolderDetails from "@functions/getFolderDetails";
import createFolder from "@functions/createFolder";
import updateFolder from "@functions/updateFolder";
import deleteFolder from "@functions/deleteFolder";
import createWord from "@functions/createWord";
import deleteWord from "@functions/deleteWord";
import updateWord from "@functions/updateWord";
import getUploadUrl from "@functions/getUploadUrl";
import textToSpeech from "@functions/textToSpeech";

const serverlessConfiguration: AWS = {
  service: "learn-language-backend",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-offline"],
  provider: {
    name: "aws",
    region: "ap-southeast-1",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: ["*"],
            Resource: `*`,
          },
        ],
      },
    },
  },
  // import the function via paths
  // Khai bao Lambda
  functions: {
    hello,
    getVideos,
    getVideoCaption,
    getVideoInfo,
    getFolders,
    getFolderDetails,
    createFolder,
    updateFolder,
    deleteFolder,
    createWord,
    deleteWord,
    updateWord,
    getUploadUrl,
    textToSpeech,
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      ImageDoAn2Bucket: {
        Type: "AWS::S3::Bucket",
        Properties: {
          CorsConfiguration: {
            CorsRules: [
              {
                AllowedOrigins: ["*"],
                AllowedHeaders: ["*"],
                AllowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
                MaxAge: 3000,
              },
            ],
          },
          PublicAccessBlockConfiguration: {
            BlockPublicAcls: false,
            BlockPublicPolicy: false,
            IgnorePublicAcls: false,
            RestrictPublicBuckets: false,
          },
        },
      },
      ImageDoAn2BucketBucketPolicy: {
        Type: "AWS::S3::BucketPolicy",
        Properties: {
          Bucket: { Ref: "ImageDoAn2Bucket" },
          PolicyDocument: {
            Version: "2012-10-17",
            Statement: [
              {
                Effect: "Allow",
                Principal: "*",
                Action: ["s3:GetObject"],
                Resource: {
                  "Fn::Join": [
                    "",
                    ["arn:aws:s3:::", { Ref: "ImageDoAn2Bucket" }, "/*"],
                  ],
                },
              },
            ],
          },
        },
      },
    },
    Outputs: {
      AttachmentsBucketName: {
        Value: {
          Ref: "ImageDoAn2Bucket",
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
