export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27107/survey_db',
  port: process.env.PORT || 5050
}
