import { Express } from 'express'
import { bodyParser } from '../middlewares/body_parser.ts'
import { cors } from '../middlewares/cors.ts'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
}
