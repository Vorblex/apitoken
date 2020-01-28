module.exports = {
  port: 8888,
  dbUrl: `mongodb+srv://${process.env.MONGO_ATLAS_CREDENTIALS}@cluster0-39xcb.mongodb.net/stardb?retryWrites=true`,
  dbOptions: { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false }
}