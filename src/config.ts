export const config = {
  dbSeedName: process.env.SEED_NAME || 'development',

  mongo: {
    options: {
      user: process.env.DB_USERNAME || 'roccmongo',
      pass: process.env.DB_PASSWORD || 'roccmongo'
    },
    uri: process.env.DB_URI || 'mongodb://localhost:27017/rocc'
  },
};
