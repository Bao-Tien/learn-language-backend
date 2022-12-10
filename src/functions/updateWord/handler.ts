import { initConnectionToDatabase, AppDataSource } from "@db/AppSource";
import { Word } from "@db/entites/Word";
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";

const lambdaFunction: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  await initConnectionToDatabase();

  const wordRepository = AppDataSource.getRepository(Word);
  const wordToUpdate = await wordRepository.findOneBy({
    id: event.body.id,
  });
  for (const [key, value] of Object.entries(event.body)) {
    wordToUpdate[key] = value;
  }
  await wordRepository.save(wordToUpdate);

  return formatJSONResponse({ wordToUpdate });
};

export const main = middyfy(lambdaFunction);
