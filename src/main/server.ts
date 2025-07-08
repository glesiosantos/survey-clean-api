import { MongoHelper } from '../infra/db/mongodb/helper/mongo_helper.ts'
import env from './config/env.ts'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app.ts')).default
    app.listen(env.port, () =>
      console.log(`Server Running at http://localhost/${env.port}`)
    )
  })
  .catch(console.error)
