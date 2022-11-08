import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";
import { Lambda } from "aws-sdk";

const lambda = new Lambda();

const lambdaFunction: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const videoUrl = event.body.videoUrl;
  const txtData = await lambda
    .invoke({
      FunctionName: "python-youtube-dev-youtubeGetVideoCaption",
      InvocationType: "RequestResponse",
      LogType: "None",
      Payload: JSON.stringify({ videoUrl }),
    })
    .promise();

  const jsonData = JSON.parse(txtData.Payload.toString());

  return formatJSONResponse(jsonData);
};

export const main = middyfy(lambdaFunction);