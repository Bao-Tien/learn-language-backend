import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONSuccessResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";
import S3 from "aws-sdk/clients/s3";
import { v4 as uuidv4 } from "uuid";

const s3 = new S3();

const lambdaFunction: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const Key = `${uuidv4()}.jpg`;

  const s3Params = {
    Bucket: "learn-language-backend-dev-imagedoan2bucket-13smmgrkxyg9o",
    Key: "images/" + Key,
    Expires: 300,
    ContentType: event.body.contentType,
  };

  // Get signed URL from S3
  const uploadUrl = s3.getSignedUrl("putObject", s3Params);

  return formatJSONSuccessResponse({
    uploadUrl: uploadUrl,
    imageUrl:
      "https://learn-language-backend-dev-imagedoan2bucket-13smmgrkxyg9o.s3.ap-southeast-1.amazonaws.com/" +
      "images/" +
      Key,
  });
};

export const main = middyfy(lambdaFunction);
