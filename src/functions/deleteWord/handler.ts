import { initConnectionToDatabase, AppDataSource } from "@db/AppSource";
import { Word } from "@db/entites/Word";
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONSuccessResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";

const lambdaFunction: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  await initConnectionToDatabase();

  const wordRepository = AppDataSource.getRepository(Word);
  const wordToDelete = await wordRepository.findOneBy({
    id: event.body.wordId,
  });
  if (wordToDelete) {
    await wordRepository.remove(wordToDelete);
    return formatJSONSuccessResponse({ result: wordToDelete });
  } else {
    return formatJSONSuccessResponse({ result: "Can't find folder" });
  }
};

export const main = middyfy(lambdaFunction);
