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

  const word = new Word();
  word.front = event.body.front;
  word.back = event.body.back;
  word.folderId = event.body.folderId;
  word.frontImageUrl = event.body.frontImageUrl ?? ""; // A
  word.backImageUrl = event.body.backImageUrl ?? ""; // B

  const wordRepository = AppDataSource.getRepository(Word);
  await wordRepository.save(word);

  return formatJSONSuccessResponse({ word });
};

export const main = middyfy(lambdaFunction);
