import { initConnectionToDatabase, AppDataSource } from '@db/AppSource'
import { Folder } from '@db/entites/Folder'
import { formatJSONErrorResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway'
import { formatJSONSuccessResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import { IAuthData } from 'src/interfaces/AuthData'
import schema from './schema'

const lambdaFunction: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  await initConnectionToDatabase()

  const strAuthData = event.requestContext?.authorizer?.authData

  if (strAuthData) {
    const authData: IAuthData = JSON.parse(strAuthData)
    const folder = new Folder()
    folder.name = event.body.name
    folder.userId = authData.id
    await folder.save()

    return formatJSONSuccessResponse({ folder })
  } else {
    return formatJSONErrorResponse({ message: 'Please sign-in before using this feature' })
  }
}

export const main = middyfy(lambdaFunction)
