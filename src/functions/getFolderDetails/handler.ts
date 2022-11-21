import { AppDataSource, initConnectionToDatabase } from "@db/AppSource";
import { Folder } from "@db/entites/Folder";
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";

const lambdaFunction: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  await initConnectionToDatabase();
  try {
    const data = await Folder.findOne({
      where: {
        id: event.body.folderId,
      },
      relations: {
        words: true,
      },
    });

    // SELECT * FROM folder LEFT JOIN word WHERE id2 = 1
    return formatJSONResponse({ data }); // data: data
  } catch (error) {
    return formatJSONResponse({ error });
  }
};

export const main = middyfy(lambdaFunction);
