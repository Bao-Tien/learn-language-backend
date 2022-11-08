import type { AWS } from "@serverless/typescript";

import hello from "@functions/hello";
import getVideos from "@functions/getVideos";
import getVideoCaption from "@functions/getVideoCaption";
import getVideoInfo from "@functions/getVideoInfo";

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
  functions: { hello, getVideos, getVideoCaption, getVideoInfo },
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
};

module.exports = serverlessConfiguration;
