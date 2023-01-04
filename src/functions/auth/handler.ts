import { initConnectionToDatabase } from '@db/AppSource'
import { formatJSONErrorResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway'
import { formatJSONSuccessResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import schema from './schema'
import { User } from '@db/entites/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const lambdaFunction: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  await initConnectionToDatabase()

  const { action, username, password } = event.body

  switch (action) {
    case 'signup': {
      //
      const existingUser = await User.findOne({
        where: { username: username },
      })

      if (existingUser) {
        return formatJSONErrorResponse({
          message: 'Existing username, please choose another one',
        })
      }

      const salt = bcrypt.genSaltSync(10)
      const hashedPassword = bcrypt.hashSync(password, salt)

      const user = new User()
      user.username = username
      user.password = hashedPassword
      await user.save()

      return formatJSONSuccessResponse({
        message: 'Signup successfully!',
        username,
      })
    }
    case 'signin': {
      const existingUser = await User.findOne({
        where: { username: username },
      })

      if (!existingUser) {
        return formatJSONErrorResponse({
          message: 'User is not existing in our system, please signup!',
        })
      }

      const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)

      if (isPasswordCorrect) {
        const { id, username, firstName, lastName } = existingUser
        const token = jwt.sign({ id, username, firstName, lastName }, process.env.JWT_SECRET, {
          expiresIn: Number(process.env.JWT_EXPIRED_IN ?? 3600),
        })
        return formatJSONSuccessResponse({
          message: 'Signin successfully!',
          userData: { id, username, firstName, lastName, token },
        })
      } else {
        return formatJSONErrorResponse({
          message: 'Your password is incorrect, please try again!',
        })
      }
    }
    default: {
      return formatJSONErrorResponse({ message: 'Invalid action' })
    }
  }
}

export const main = middyfy(lambdaFunction)
