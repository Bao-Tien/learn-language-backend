import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway'
import { formatJSONSuccessResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import schema from './schema'
import { S3, Polly } from 'aws-sdk'
import { PutObjectRequest } from 'aws-sdk/clients/s3'
import sha256 from 'crypto-js/sha256'

const BUCKET_NAME = 'learn-language-backend-dev-imagedoan2bucket-13smmgrkxyg9o'
const polly = new Polly() // Create Speech (Audio file) from Text
const s3 = new S3({
  params: {
    Bucket: BUCKET_NAME,
  },
})

const lambdaFunction: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const pollyParams: Polly.SynthesizeSpeechInput = {
    OutputFormat: 'mp3',
    Text: event.body.text,
    TextType: 'text',
    VoiceId: 'Joanna',
    SampleRate: '22050',
    LanguageCode: event.body.language,
  }

  const FILE_LOCATION = 'audios/' + sha256(JSON.stringify(pollyParams)) + '.mp3'

  let isAudioExistingInS3 = false
  try {
    const existingObject = await s3
      .getObject({
        Bucket: BUCKET_NAME,
        Key: FILE_LOCATION,
      })
      .promise()
    if (existingObject) isAudioExistingInS3 = true
  } catch (error) {
    isAudioExistingInS3 = false
  }

  if (isAudioExistingInS3 == false) {
    const convertTextToSpeechResult: Polly.SynthesizeSpeechOutput = await polly.synthesizeSpeech(pollyParams).promise()
    const s3Params: PutObjectRequest = {
      Bucket: BUCKET_NAME,
      Key: FILE_LOCATION,
      ContentType: 'audio/mpeg',
      Body: convertTextToSpeechResult.AudioStream,
      ACL: 'public-read',
    }
    await s3.putObject(s3Params).promise()
  }

  return formatJSONSuccessResponse({
    audioUrl: 'https://learn-language-backend-dev-imagedoan2bucket-13smmgrkxyg9o.s3.ap-southeast-1.amazonaws.com/' + FILE_LOCATION,
  })
}

export const main = middyfy(lambdaFunction)
