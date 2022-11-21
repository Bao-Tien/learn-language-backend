import { AppDataSource, initConnectionToDatabase } from "@db/AppSource";
import { Folder } from "@db/entites/Folder";
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";

const lambdaFunction: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async () => {
  await initConnectionToDatabase();
  const folderRepository = AppDataSource.getRepository(Folder);
  const allFolders = await folderRepository.find();
  return formatJSONResponse({ allFolders });
};

export const main = middyfy(lambdaFunction);
