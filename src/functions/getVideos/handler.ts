import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";
import { Lambda } from "aws-sdk";

const lambda = new Lambda();

const lambdaFunction: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const searchKeyInput = event.body.text;
  const strData = await lambda
    .invoke({
      FunctionName: "python-youtube-dev-youtubeGetVideos",
      InvocationType: "RequestResponse",
      LogType: "None",
      Payload: JSON.stringify({ searchKeyInput }),
    })
    .promise();

  const jsonData = JSON.parse(strData.Payload.toString());

  return formatJSONResponse(jsonData);
};

export const main = middyfy(lambdaFunction);
