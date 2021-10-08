import { connect, connection, Mongoose } from 'mongoose';
import { config } from './config';
import { glob } from 'glob';
import * as path from 'path';
import { promises } from 'fs';

interface SeedFiles {
  [users: string]: string;
}

export const connectToDatabase = async (): Promise<Mongoose> => {
  const mongooseConnection = connect(config.mongo.uri, config.mongo.options);
  connection.on('error', (err: any) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
  });
  return mongooseConnection;
};

export const dropCollections = async (): Promise<boolean[]> => {
  const db: any = connection.db;
  return db
    .listCollections()
    .toArray()
    .then((collections: any[]) =>
      collections.map((collection) => db.dropCollection(collection.name))
    )
    .then((promises: Promise<boolean>[]) => Promise.all(promises));
};

export const pingDatabase = async (): Promise<boolean> => {
  const db: any = connection.db;
  return db
    .admin()
    .ping()
    .then((res: any) => !!res && res?.ok === 1);
};

export const seedDatabase = async (directory: string): Promise<any[]> => {
  return dropCollections()
    .then(() => listSeedFiles(directory))
    .then(seedFiles => {
      let promises: Promise<any>[] = [];
      if (seedFiles['users']) {
        promises.push(seedUsers(seedFiles['users']));
      }
      return Promise.all(promises);
    });
};

const seedUsers = async (seedFile: string): Promise<any> => {
  return promises.readFile(seedFile, 'utf8')
    .then(data => JSON.parse(data))
    .then(users => console.log(users));

  // const dataObject = JSON.parse(fs.readFileSync(seddFile));
  // return Promise.resolve(undefined);
}

const listSeedFiles = async (directory: string): Promise<SeedFiles> => {
  return new Promise((resolve, reject) => {
    glob(directory + '/*.json', { ignore: 'nodir' }, function (err, files) {
      if (err) {
        reject(err);
      } else {
        // TODO consider throwing an error if an unknown json file is found
        // in the directory specified
        let seedFiles: SeedFiles = {};
        files.forEach(file => {
          let key = path.basename(file, '.json');
          seedFiles[key] = file;
        });
        resolve(seedFiles);
      }
    });
  });
};

// const seedDatabase = async (): Promise<any> => {
//   console.log(`Initializing db with seed: ${config.dbSeedName}`);

//   let promises = [];
//   let promise;

//   promise = UserModel.create({})  // seeds.users
//     .then(() => console.log('Finished populating users'))
//     .catch(err => console.log('Error populating users', err));
//   promises.push(promise);

//   // .then(() => (seeds.apps ? App.create(seeds.apps).then(() => console.log('finished populating apps')) : null))
//   // .catch(err => console.log('error populating apps', err));
//   // promises.push(promise);

//   return Promise.all(promises);
// }
