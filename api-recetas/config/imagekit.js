import * as dotenv from 'dotenv'
import Imagekit from 'imagekit'

dotenv.config()

const imagekitConfig = new Imagekit({
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
  urlEndpoint: process.env.IK_URL_ENDPOINT,
})

export default imagekitConfig