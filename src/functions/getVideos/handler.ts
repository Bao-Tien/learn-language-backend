import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import youtubeData from './response.json'


const lambdaFunction: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
  const data = youtubeData;
  return formatJSONResponse(data);
};

export const main = middyfy(lambdaFunction);
