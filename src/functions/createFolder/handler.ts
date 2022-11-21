import { initConnectionToDatabase, AppDataSource } from "@db/AppSource";
import { Folder } from "@db/entites/Folder";
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";

const lambdaFunction: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  await initConnectionToDatabase();

  const folder = new Folder();
  folder.name = event.body.name;

  const folderRepository = AppDataSource.getRepository(Folder);
  await folderRepository.save(folder);

  return formatJSONResponse({ folder });
};

export const main = middyfy(lambdaFunction);
