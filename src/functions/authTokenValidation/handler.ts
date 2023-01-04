import jwt from 'jsonwebtoken'
import { IAuthData } from 'src/interfaces/AuthData'

// https://aws.amazon.com/blogs/mobile/appsync-lambda-auth/
// https://www.npmjs.com/package/jsonwebtoken

interface IAuthEvent {
  authorizationToken: string
  requestContext: {
    apiId: string
    accountId: string
    requestId: string
    queryString: string
    operationName: string
    variables: {}
  }
}

exports.main = async (event: IAuthEvent, context: any, callback: (...params: any) => any) => {
  const { authorizationToken } = event

  try {
    const userInfo: IAuthData = jwt.verify(authorizationToken, process.env.JWT_SECRET)
    console.log('Auth success: ', userInfo)

    const IAMPolicy = {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:invoke',
            Effect: 'Allow',
            Resource: '*',
          },
        ],
      },
      context: {
        authData: JSON.stringify(userInfo),
      }, // In Lambda execution fn: this.event.requestContext.authorizer.authData,
    }
    callback(null, IAMPolicy)
  } catch (error) {
    console.log('Auth failed!')
    callback('Unauthorized')
  }
}
