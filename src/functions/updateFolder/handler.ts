import { initConnectionToDatabase, AppDataSource } from "@db/AppSource";
import { Folder } from "@db/entites/Folder";
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";

const lambdaFunction: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  await initConnectionToDatabase(); //can thiet ko

  const folderRepository = AppDataSource.getRepository(Folder);
  const folderToUpdate = await folderRepository.findOneBy({
    id: event.body.id,
  });
  folderToUpdate.name = event.body.name;
  await folderRepository.save(folderToUpdate);

  return formatJSONResponse({ folderToUpdate }); //can thiet ko
};

export const main = middyfy(lambdaFunction);
